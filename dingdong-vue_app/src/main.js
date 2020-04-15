import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../src/assets/style/global.css"  // 引入全局的css样式
import "../src/common/rem.js"   // 移动端适配rem.js文件
import "../src/pluginunit/vant.js"  // 按需导入 vant 组件
import VConsole from 'vconsole'

Vue.config.productionTip = false

const vConsole = new VConsole(); 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
