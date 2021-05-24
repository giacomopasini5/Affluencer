import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "leaflet/dist/leaflet.css"
import store from '@/views/Store.vue'
import pageNotFound from '@/views/PageNotFound.vue'

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(Vuelidate);

axios.defaults.baseURL = 'http://localhost:3000/api';
Vue.use(VueAxios, axios);
initializeRoutes();

Vue.mixin({
	methods: {
		login: function(userid, username, usertype) {
			$cookies.set("userid", userid);
			$cookies.set("username", username);
			$cookies.set("usertype", usertype);
		},

		logout: function() {
			$cookies.remove("userid");
			$cookies.remove("username");
			$cookies.remove("usertype");
		}
	}
})

function initializeRoutes() {
	axios.get('/shops')
	.then((res) => {
		for(var shop in res.data)
			router.addRoute(store, { path: '/' + shop._id, name: shop._id, component: store })
	})
	.catch((error) => {
        console.log('failure');
        console.log(error);
    })
	router.addRoute({ path: '*', name: 'pageNotFound', component: pageNotFound });
}

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
