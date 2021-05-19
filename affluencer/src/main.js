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
			logged: $cookies.isKey("userid")
		}
	},
	
	methods: {
		login: function(userid, username, type) {
			$cookies.set("userid", userid);
			$cookies.set("username", username);
			$cookies.set("usertype", type);
		},

		logout: function() {
			$cookies.remove("userid");
			$cookies.remove("username");
			$cookies.remove("usertype");
		}
	}
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
