<template>
  <div class="aside">
    <a-menu
      :mode="isCollapse ? 'vertical' : 'inline'"
      :inlineCollapsed="isCollapse"
      :defaultSelectedKeys="currentRouteName"
      :selectedKeys="currentRouteName"
      :openKeys="expandedKey"
      @openChange="handleOpenChange"
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
import * as _ from 'lodash'

@Component({
  components: {}
})
export default class Sidebar extends Vue {
  isCollapse: boolean = false;
  currentRouteName: any[] = [];
  expandedKey:any[] = [];//展开的菜单，默认都展开
  rootSubmenuKeys:any[] = [];

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
    let col = store.state.isCollapse;
    this.isCollapse = col
    return col
  }

  @Watch('getIsCollapse')
  watchIsCollapse(newVal: any, oldVal: any){
    if(newVal === true){
      this.expandedKey = []
    }else{
      this.initOpenMenus()
    }
  }

  handlerCollapsedSidebar(){
    store.commit('collapse')
  }

  handleOpenChange(openKeys: any) {
    // openKeys是数组
    // 点击已展开的菜单时，是空数组
    // 点击未展开的菜单时，是[当前展开菜单的key，点击菜单的key]
    const latestOpenKey = openKeys.find((key:any) => this.expandedKey.indexOf(key) === -1)
    if(this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.expandedKey = openKeys;
    }else{
      this.expandedKey = latestOpenKey ? [latestOpenKey] : [];
    }
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
    const roots = _.filter(this.menuData, (item:any) => item.children != null);
    this.rootSubmenuKeys = _.map(roots, 'name');
    this.initOpenMenus()
  }

  initOpenMenus(){
    const name = this.$route.name;
    const openKey = this.parentMenuName(name);
    this.handleOpenChange([openKey])
  }

  parentMenuName(name:any):string{
    const menuList = this.menuData;
    const childList = _.map(menuList, (item:any) => {
      return _.map(item.children, (citem:any) => {
        citem.parentName = item.name;
        return citem
      })
    })
    const list = _.flatten(childList)
    const menu = _.find(list, (o:any) => o.name === name)
    return menu.parentName
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
