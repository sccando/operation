<template>
  <a-dropdown>
    <a-menu slot="overlay" @click="handleCommand">
      <a-menu-item divided key="logout">
        <a-icon type="logout" />
        退出登录
      </a-menu-item>
    </a-menu>
    <button type="link" class="user-btn">{{userName}}</button>
  </a-dropdown>
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator'
import store from '@/store/store'

@Component({

})
export default class HeaderUser extends Vue {
  userName = "";
  constructor() {
    super();
    this.userName = store.state.userInfo.name;
  }

  menuCommand: any = {
    logout: this.logout
  };

  handleCommand(e: any) {
    this.menuCommand[e.key]();
  }
  // 退出登录
  logout() {
    let param = {
      sid: store.state.userInfo.sid
    };
    this.$http.post("/pri/system/logout", param).then((res:any) => {
      if(res){
        let userInfo = {
          sid: '',
          name: '',
          perms: []
        }
        store.commit('storeUser', userInfo)
        this.$router.push("/passport/login");
      }
    });
  }
}
</script>

<style lang="less" scoped>
.user-btn{
  line-height: 40px;
  border: 0;
  border-radius: 2px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  &:hover{
    background: rgba(255,255,255,.2);
  }
}
</style>

