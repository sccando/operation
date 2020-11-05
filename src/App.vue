<template>
  <div id="app" :class="{'aside-collapsed':isCollapse}" v-title="title" style="height:100%;">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import store from '@/store/store'

@Component({})
export default class App extends Vue{
 appName: any;

 constructor(){
   super()
   this.appName = store.state.appName
 }

  // 获取浏览器标题
  get title(){
    let title = store.state.doctitle.title;
    return `${title} - ${this.appName}`
  }

  get isCollapse(){
    return store.state.isCollapse
  }
}
</script>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
