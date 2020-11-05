<template>
  <div class="aside">
    <a-menu
      mode="inline"
      :inlineCollapsed="isCollapse"
      v-model="currentRouteName"
    >
      <template v-for="menuitem in menuData">
        <a-sub-menu :key="menuitem.name">
          <template slot="title">
            <a-icon :type="menuitem.meta.icon"/>
            <span>{{menuitem.meta.title}}</span>
          </template>
          <a-menu-item :key="child.name" v-for="child in menuitem.children">
            <router-link :to="child.name">{{child.meta.title}}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
    <div class="aside-icon" @click="handlerCollapsedSidebar">
      <a-icon :type="isCollapse ? 'menu-unfold' : 'menu-fold'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import store from '@/store/store';
import { permissionGuard } from '@/utils/permissionGuard';

@Component({
  components: {}
})
export default class Sidebar extends Vue {
  isCollapse: boolean = false;
  currentRouteName: any[] = [];

  handlerCollapsedSidebar(){
    store.commit('collapse')
  }

  constructor() {
    super();
  }

  get menuData() {
    const router: any = this.$router;
    const routeList = router.options.routes;
    let list: any[] = [];
    routeList.forEach((item: any) => {
      if (item.meta && item.meta.title !== "登录页" && permissionGuard(item.meta.routerGuard)) list.push(item);
    });
    const menu = this.menuPermission(list);
    return menu;
  }

  get getIsCollapse(){
    return store.state.isCollapse
  }

  @Watch('getIsCollapse')
  watchIsCollapse(val: boolean){
    this.isCollapse = val;
  }

  menuPermission(menuList:any[]){
    const result: any[] = [];
    menuList.forEach((item:any) => {
      if(item.children && item.children.length){
        item.children = this.menuPermission(item.children)
      }else{
        item.children = []
      }
      result.push(item)
    })
    return result;
  }

  mounted() {
    this.currentRouteName = [this.$route.name];
  }

  @Watch("$route")
  private watchRouteName(newVal: any, oldVal: any) {
    console.log(newVal, oldVal)
    this.currentRouteName = [newVal.name];
  }

}
</script>

<style lang="less">
  @import '../../assets/css/sidebar.less';
</style>
