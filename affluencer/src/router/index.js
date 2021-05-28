import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/Home.vue'
import info from '@/views/Info.vue'
import profile from '@/views/Profile.vue'
import login from '@/views/Login.vue'
import register from '@/views/Register.vue'
import store from '@/views/Store.vue'
import pageNotFound from '@/views/PageNotFound.vue'
import appStore from '@/store/store.js'

Vue.use(VueRouter);

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
    path: '/register',
    name: 'register',
    component: register
  },
	{
    path: '/store/:id',
    name: 'store',
    component: store
  },
	{
    path: '*',
    name: 'pageNotFound',
    component: pageNotFound
  }
];

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
	if ((to.name == 'profile' || to.name == 'store') && (!appStore.state.isLogged)) next('/login')
	else if ((to.name == 'profile') && ($cookies.get('usertype') == 'shop')) next('/store/' + $cookies.get('userid'))
	else next();
});

export default router