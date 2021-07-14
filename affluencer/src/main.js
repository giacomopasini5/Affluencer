import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store.js'
import 'leaflet/dist/leaflet.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import globalMixin from './mixins/globalMixin.js'


Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(Vuelidate);
Vue.use(Vuetify);

axios.defaults.baseURL = 'http://localhost:3000/api';
Vue.use(VueAxios, axios);

Vue.mixin(globalMixin);

const moment = require('moment');
require('moment/locale/it');
Vue.use(require('vue-moment'), { moment });

new Vue({
	router,
	store,
	render: function(h) { return h(App) },
	vuetify: new Vuetify({
		icons: {
			iconfont: 'mdi'
		}
	}),
}).$mount('#app');
