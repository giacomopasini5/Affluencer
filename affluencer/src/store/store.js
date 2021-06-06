import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const auth = {
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
}

const config = {
	state: {
		settings: false
	},
	
	mutations: {
		enableSettings(state) {
			state.settings = true;
		},
		
		disableSettings(state) {
			state.settings = false;
		},
		
		toggleSettings(state) {
			state.settings ? state.settings = false : state.settings = true;
		}
	}
}

const store = new Vuex.Store({
	modules: {
		auth,
		config
	},
	
	plugins: [createPersistedState({ paths: ['auth'] })]
});

export default store