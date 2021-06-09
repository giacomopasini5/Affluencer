export default {
	computed: {
		isOwner: function() {
			return this.$store.state.auth.isLogged ? $cookies.get('userid') == this.$route.params.id : false;
		}
	},
	
	methods: {
		login: function(userid, username, usertype) {
			$cookies.set('userid', userid);
			$cookies.set('username', username);
			$cookies.set('usertype', usertype);
			this.$store.commit('login');
			if(this.$route.path == '/') this.$router.go();
			else this.$router.push('/');
		},

		logout: function() {
			$cookies.remove('userid');
			$cookies.remove('username');
			$cookies.remove('usertype');
			this.$store.commit('logout');
			if(this.$route.path == '/') this.$router.go();
			else this.$router.push('/');
		},
		
		isClient: function() {
			return $cookies.get('usertype') == 'client';
		},
		
		isStore: function() {
			return $cookies.get('usertype') == 'shop';
		},
		
		formatSettings: function(settings, data) {
			for(var key in settings)
				if(settings[key] == '')
					settings[key] = data[key];
		},
		
		saveSettings: function(settings, data) {
			for(var key in settings)
				if(settings[key] != data[key])
					data[key] = settings[key];
		},
		
		syncSettings: function(settings, data) {
			for(var key in settings)
				if(settings[key] != data[key])
					settings[key] = data[key];
		}
	}
}