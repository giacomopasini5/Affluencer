import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'

import "leaflet/dist/leaflet.css";

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(Vuelidate)

Vue.mixin({
	data: function() {
		return {
			logged: false
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
