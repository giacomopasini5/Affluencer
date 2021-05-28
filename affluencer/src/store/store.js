import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
 
const store = new Vuex.Store({
	state: {
		isLogged: true
	},
	
	mutations: {
		login(state) {
			state.isLogged = true;
		},
		
		logout(state) {
			state.isLogged = false;
		}
	},
	
	plugins: [createPersistedState()]
});

export default store