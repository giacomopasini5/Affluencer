<template>
	<div id="favoriteStoresList">
		<h1>Negozi preferiti</h1>
		<ul id="favorite-stores">
			<li v-for="item in favoriteStores" :key="item.shop_id" ref="item.shop_id">
				<router-link to="/store/item.shop_id">{{ item.shop_name }}</router-link>
				<button @click="removeFavorite(item.shop_id)" class="item-delete">&#10006</button>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'favoriteStoresList',
		
		props: ['favoriteStores'],
		
		methods: {
			removeFavorite: async function(shop_id) {
				try {
					var res = await this.axios.delete('/clients/' + $cookies.get('userid') + '/favorite_shops/' + shop_id);
					//remove from array
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