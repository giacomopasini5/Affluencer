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
			const userId = $cookies.get("userid");
			this.axios.get('/clients/' + userId + '/favorite_shops', { params: { id: userId } })
			.then((res) => {
				console.log(res.data); //array vuoto anche se dovrebbero essere 3 shops
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