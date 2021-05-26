<template>
  <div id="profile">
		<userInfo :name="user.name" :city="user.city"/>
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
				user: {
					favoriteStores: [],
					name: '',
					city: ''
				}
			}
		},
		
		mounted: function() {
			this.axios.all([
				this.axios.get('/clients/' + $cookies.get('userid')),
				this.axios.get('/clients/' + $cookies.get('userid') + '/favorite_shops')
			])
			.then((client, stores) => {
				this.user.name = client.data.name;
				this.user.city = client.data.city;
				for(store in stores)
					this.user.favoriteStores.push(store.data.shop_name);
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