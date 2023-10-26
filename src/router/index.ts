import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/HospitalDetails.vue'),
      children: [{
        path: 'baseInfo',
        name: 'baseInfo',
        component: () => import('../views/detailContent/HosBaseInfo.vue'),
      },
      {
        path: 'closureInfo',
        name: 'closureInfo',
        component: () => import('../views/detailContent/ClosureInfo.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('../views/detailContent/HosSearch.vue'),
      },
      {
        path: 'reserve',
        name: 'reserve',
        component: () => import('../views/detailContent/Reserve.vue'),
      },
      {
        path: 'reserveInfo',
        name: 'reserveInfo',
        component: () => import('../views/detailContent/ReserveInfo.vue'),
      }]
    },
    {
      path:'/search',
      name:'hosSearch',
      component: () => import('@/views/search/SearchPage.vue')
    }
  ],
  //控制跳转时滚动条位置（像素）
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
