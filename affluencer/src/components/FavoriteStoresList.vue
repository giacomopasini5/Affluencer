<template>
	<div id="favoriteStoresList">
		<h1>Negozi preferiti</h1>
		<ul id="favorite-stores">
			<li v-for="shop in favoriteStores" :key="shop.shop_id">
				<router-link to="{ path: '/store/' + shop.shop_id }">{{ shop.shop_name }}</router-link>
				<button @click="removeFavorite(shop)" class="item-delete">&#10006</button>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'favoriteStoresList',
		
		props: ['favoriteStores'],
		
		methods: {
			removeFavorite: async function(shop) {
				try {
					var res = await this.axios.delete('/clients/' + $cookies.get('userid') + '/favorite_shops/' + shop.shop_id);
					var index = this.favoriteStores.indexOf(shop);
					this.favoriteStores.splice(index, 1);
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