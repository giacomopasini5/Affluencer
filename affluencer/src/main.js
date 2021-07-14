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
import colors from 'vuetify/lib/util/colors'
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

const vuetify = new Vuetify({
	icons: {
		iconfont: 'mdi'
	},
	theme: {
	  themes: {
		light: {
		  primary: colors.blue,
		  secondary: colors.grey.darken1,
		  accent: colors.shades.black,
		  error: colors.red.accent3,
		},
		dark: {
		  primary: colors.blue.darken3,
		},
	  },
	},
  /*theme: {
    themes: {
      dark: {
        primary: '#21CFF3',
        accent: '#FF4081',
        secondary: '#ffe18d',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      },
      light: {
        primary: '#1976D2',
        accent: '#e91e63',
        secondary: '#30b1dc',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      }
    }
  }*/
  })

new Vue({
	router,
	store,
	render: function(h) { return h(App) },
	vuetify/*: new Vuetify({
		icons: {
			iconfont: 'mdi'
		},
		
	})*/,
}).$mount('#app');
