<template>
  <div id="profile">
		<userInfo/>
    <favoriteStoresList :favoriteStores="favoriteStores"/>
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
				favoriteStores: []
			}
		},
		
		mounted: function() {
			this.axios.get('/clients/' + $cookies.get('userid') + '/favorite_shops')
			.then((res) => {
				this.favoriteStores.push(res.data.shop_name);
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