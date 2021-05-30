<template>
  <div id="profile">
		<userInfo v-if="hasUserData" :userData="userData"/>
		<favoriteStoresList v-if="hasUserData" :favoriteStores="userData.favorite_shops"/>
  </div>
</template>

<script>
	import userInfo from '@/components/UserInfo.vue'
	import favoriteStoresList from '@/components/FavoriteStoresList.vue'
	
	export default {
		name: 'profile',
		
		components: {
			userInfo,
			favoriteStoresList
		},
		
		data: function() {
			return {
				userData: '',
				hasUserData: false
			}
		},
		
		created: function() {
			this.initializeProfile();
		},
		
		methods: {
			initializeProfile: async function() {
				try {
					var res = await this.axios.get('/clients/' + $cookies.get('userid'));
					this.userData = res.data;
					this.hasUserData = true;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>

<style>
	@import '../styles/profile.css'
</style>