import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.less'// 应用初始化css样式

import ElementUI from 'element-ui'// 引用饿了么组件
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'// 饿了么应用样式
Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
