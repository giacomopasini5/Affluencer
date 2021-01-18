import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/Home.vue'
import info from '@/views/Info.vue'
import profile from '@/views/Profile.vue'
import login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
	{
    path: '/info',
    name: 'info',
    component: info
  },
	{
    path: '/profile',
    name: 'profile',
    component: profile
  },
	{
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
