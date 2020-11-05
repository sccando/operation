<template>
  <div class="spin-wrap">
    <div class="spin-content">
      <a-spin tip="加载中..." size="large"></a-spin>
    </div>
  </div>
</template>

<script lang='ts'>
  import {Vue} from 'vue-property-decorator'

  export default class Loading extends Vue{
    
  }
</script>

<style lang="less">
  .spin-wrap{
    width: 100%;
    height: 100%;
    position: absolute;
    background: transparent;
    z-index: 999;
  }
  .spin-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
