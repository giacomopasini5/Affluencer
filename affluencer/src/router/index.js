import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/Home.vue'
import info from '@/views/Info.vue'
import profile from '@/views/Profile.vue'
import login from '@/views/Login.vue'
import store from '@/views/Store.vue'
import pageNotFound from '@/views/PageNotFound.vue'

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
  },
	{
    path: '/store',
    name: 'store',
    component: store
  },
	{
    path: '*',
    name: 'pageNotFound',
    component: pageNotFound
  }
]

const router = new VueRouter({
  routes
})

/*router.beforeEach((to, from, next) => {
	if ((to.name == 'profile' || to.name == 'store') && (!this.logged)) next('/login')
	else next()
})*/

export default router
