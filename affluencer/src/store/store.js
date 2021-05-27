import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
 
const store = new Vuex.Store({
	state: {
		isLogged: false
	},
	
	mutations: {
		login(state) {
			state.isLogged = true;
		},
		
		logout(state) {
			state.isLogged = false;
		}
	}
});

export default store