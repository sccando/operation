<template>
  <a-layout-header class="header">
    <div class="logo">
      <a>
        <img class="expanded" src="https://evavisdom-static.oss-cn-beijing.aliyuncs.com/theme/evavision_v2/global-logo.svg" style="max-height:40px;" />
        <img class="collapsed" src="https://evavisdom-static.oss-cn-beijing.aliyuncs.com/theme/evavision_v2/global-logo-small.svg"  style="max-height:30px;" />
      </a>
    </div>
    <div>
      <header-user></header-user>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import HeaderUser from './Header.User.vue'

@Component({
  components:{
    HeaderUser
  }
})
export default class MainHeader extends Vue {
  constructor(){
    super()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/header.less';
</style>


