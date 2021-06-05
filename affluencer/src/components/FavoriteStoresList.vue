<template>
	<div id="favoriteStoresList">
		<h1>Negozi preferiti</h1>
		<ul id="favoriteShops">
			<li v-for="shop in favoriteStores" :key="shop.shop_id">
				<router-link :to="/store/ + shop.shop_id">{{ shop.shop_name }}</router-link>
				<button v-if="$store.state.config.settings" @click="removeFavorite(shop)" class="item-delete">D</button>
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