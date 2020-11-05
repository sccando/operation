<template>
  <div class="container">
    <div class="wrap">
      <div class="title">运营中心</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({

})
export default class PassportLayout extends Vue {
  constructor(){
    super()
  }
}
</script>

<style lang="less">
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100vh;
    background: #f0f2f5 url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }

  .wrap {
    padding: 10% 0 24px;
    flex: 1;
  }

  .title {
    position: relative;
    margin-bottom: 40px;
    height: 44px;
    line-height: 44px;
    font-size: 33px;
    color: #333;
    font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 600;
    text-align: center;
  }

</style>
