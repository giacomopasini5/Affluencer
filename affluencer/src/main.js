import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store.js'
import "leaflet/dist/leaflet.css"

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(Vuelidate);

axios.defaults.baseURL = 'http://localhost:3000/api';
Vue.use(VueAxios, axios);

Vue.mixin({
	computed: {
		isOwner: function() {
			return this.$store.state.isLogged ? $cookies.get('userid') == this.$route.params.id : false;
		}
	},
	
	methods: {
		login: function(userid, username, usertype) {
			$cookies.set('userid', userid);
			$cookies.set('username', username);
			$cookies.set('usertype', usertype);
			this.$store.commit('login');
			window.location.href = '/';
		},

		logout: function() {
			$cookies.remove('userid');
			$cookies.remove('username');
			$cookies.remove('usertype');
			this.$store.commit('logout');
			window.location.href = '/';
		}
	}
});

new Vue({
	router,
	store,
	render: function(h) { return h(App) }
}).$mount('#app');
