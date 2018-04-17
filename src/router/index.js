import Vue from 'vue'
import Router from 'vue-router'
import menu from '@/components/menu'
import upload from '@/components/upload'
import login from '@/components/login/login'
import layout from '@/components/layout/layout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    }
  ]
})
