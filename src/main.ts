import {createApp} from 'vue'
import App from './App.vue'

// 引入normalize，将不同浏览器的样式进行统一重置
import 'normalize.css'
// 引入公共样式
import '@/assets/styles/common.less'
import {createRouter, createWebHashHistory} from "vue-router";

const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(),
  routes: []
})

app.use(router)
app.mount('#app')
