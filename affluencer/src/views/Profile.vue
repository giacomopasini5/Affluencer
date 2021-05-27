<template>
  <div id="profile">
		<userInfo :name="user.name" :city="user.city"/>
		<favoriteStoresList :favoriteStores="user.favoriteStores"/>
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
				user: ''
			}
		},
		
		mounted: function() {
			this.axios.get('/clients/' + $cookies.get('userid'))
			.then((res) => {
				this.user = res.data;
			})
			.catch((error) => {
				console.log('failure');
				console.log(error);
			});
		}
	}
</script>

<style>
	@import '../styles/profile.css'
</style>