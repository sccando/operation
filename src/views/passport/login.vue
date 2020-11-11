<template>
  <div class="login">
    <a-form :form="loginForm" @submit="handleLoginSubmit">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="账户密码登录" key="1">
          <a-alert v-if="error" type="error" :message="error" showIcon></a-alert>
          <a-form-item v-decorator="['userName',{rules: [{ required: true, message: '请输入账户名！' }]}]">
            <a-input size="large" placeholder="请输入账户名" v-model="loginModel.username">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item v-decorator="['password',{rules: [{ required: true, message: '请输入密码！' }]}]">
            <a-input
              size="large"
              type="password"
              placeholder="请输入密码！"
              v-model="loginModel.password"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
      <a-form-item>
        <a-button
          type="primary"
          htmlType="submit"
          size="large"
          :loading="loading"
          class="ant-btn__block"
        >登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less">
.login {
  display: block;
  width: 368px;
  margin: 0 auto;

  .ant-tabs .ant-tabs-bar {
    border-bottom: 0;
    margin-bottom: 24px;
    text-align: center;
  }

  .ant-tabs-tab {
    font-size: 16px;
    line-height: 24px;
  }

  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 34px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/store";
const md5 = require("js-md5");

@Component({
})
export default class Login extends Vue {
  loginForm: any = null;
  loading: boolean = false;
  error: string = "";
  loginModel: any = {
    username: null,
    password: null
  };

  constructor() {
    super();
  }

  created() {
    this.loginForm = this.$form.createForm(this);
  }

  mounted() {
  }

  handleLoginSubmit(e: any) {
    e.preventDefault();
    this.loginForm.validateFields((err: any, values: any) => {
      if (!err) {
        let data = {
          user: {
            acc: this.loginModel.username, //登陆账号（手机号或邮箱格式）
            pwd: md5(this.loginModel.password)
              .toString()
              .toUpperCase() //32位MD5加密密码
          }
        };
        this.$http.post("pri/system/login", data).then((res:any) => {
          if(res){
            const resData = res.data;
            this.$ls('set', 'sid', resData.sid);
            this.$ls('set', 'name', resData.name);
            this.$ls('set', 'perms', resData.perms);

            this.$store.commit('getPerms', resData.perms)

            this.$router.push("/").catch(data => {
              console.log(data);
            });
          }
        });
      }
    });
  }
}
</script>
