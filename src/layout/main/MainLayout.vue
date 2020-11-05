<template>
<a-layout style="height: 100%;">
  <main-header></main-header>
  <a-layout>
    <sidebar></sidebar>
    <a-layout>
      <a-layout-content class="main-content">
        <Loading v-if="isLoading"></Loading>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</a-layout>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import store from '@/store/store'
  import MainHeader from './Header.vue'
  import Sidebar from './SideBar.vue'
  import Loading from '@/components/Loading.vue'

  @Component({
    components: {
      MainHeader,
      Sidebar,
      Loading
    }
  })
  export default class MainLayout extends Vue{
    isLoading: boolean = false;

    constructor(){
      super()
    }

    get loadingState(){
      return store.state.loading
    }

    @Watch('loadingState')
    getLoadingState(val: boolean){
      this.isLoading = val
    }
  }
</script>

<style lang="less">
.ant-layout{
  background: #fff;
}
</style>
