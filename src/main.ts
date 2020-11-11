import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/router'
import store from './store/store'
import storage from './utils/storage'
import http from './utils/http'

import { Layout, Form, Tabs, Button, Alert, Input, Icon, Dropdown, Menu, message, Card, Row, Col, Select, Table,
         Drawer, Modal, Popover, Radio, Spin, Checkbox, Dropdown} from 'ant-design-vue'

import 'ant-design-vue/lib/layout/style'
import 'ant-design-vue/lib/form/style'
import 'ant-design-vue/lib/tabs/style'
import 'ant-design-vue/lib/button/style'
import 'ant-design-vue/lib/alert/style'
import 'ant-design-vue/lib/input/style'
import 'ant-design-vue/lib/icon/style'
import 'ant-design-vue/lib/message/style'
import 'ant-design-vue/lib/dropdown/style'
import 'ant-design-vue/lib/menu/style'
import 'ant-design-vue/lib/card/style'
import 'ant-design-vue/lib/row/style'
import 'ant-design-vue/lib/col/style'
import 'ant-design-vue/lib/select/style'
import 'ant-design-vue/lib/table/style'
import 'ant-design-vue/lib/drawer/style'
import 'ant-design-vue/lib/modal/style'
import 'ant-design-vue/lib/popover/style'
import 'ant-design-vue/lib/radio/style'
import 'ant-design-vue/lib/spin/style'
import 'ant-design-vue/lib/checkbox/style'
import 'ant-design-vue/lib/dropdown/style'

import './directive/docTitleDirective'

Vue.use(Layout)
Vue.use(Form)
Vue.use(Tabs)
Vue.use(Button)
Vue.use(Alert)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Table)
Vue.use(Drawer)
Vue.use(Modal)
Vue.use(Popover)
Vue.use(Radio)
Vue.use(Spin)
Vue.use(Checkbox)
Vue.use(Dropdown)

Vue.prototype.$http = http;
Vue.prototype.$ls = storage.ls;
Vue.prototype.$ss = storage.ss;
Vue.prototype.$message = message;

message.config({
  duration: 2,
  top: `60px`,
  maxCount: 1
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
