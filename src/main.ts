import { createApp } from 'vue'
import { createPinia } from 'pinia'

//引入清除默认样式
import '@/assets/reset.css'
import App from "@/App.vue";

const app = createApp(App)
//注册全局组件
import Top from '@/components/top/PageTop.vue'
app.component('PageTop',Top)
import Bottom from '@/components/bottom/PageBottom.vue'
app.component('PageBootm',Bottom)

//引入路由
import router from '@/router'
app.use(router)

//引入element-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//使用pinia
app.use(createPinia())

app.mount('#app')
