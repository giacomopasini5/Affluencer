import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "leaflet/dist/leaflet.css"

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(Vuelidate);

axios.defaults.baseURL = 'http://localhost:3000/api';
Vue.use(VueAxios, axios);

Vue.mixin({
	data: function() {
		return {
			logged: true
		}
	},
	
	methods: {
		login: function() {
			$cookies.set("user", "admin")
			logged = true
		},
			
		logout: function() {
			$cookies.remove("user")
			logged = false
		}
	}
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
