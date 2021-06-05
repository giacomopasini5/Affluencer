<template>
	<v-row justify="center" class="text-center pa-5">
		<v-col cols="10">
			<h1>Negozi preferiti</h1>
		</v-col>
		<v-col cols="10">
			<v-row justify="center">
				<v-col cols="8">
					<v-list>
						<v-list-item v-for="shop in favoriteStores" :key="shop.shop_id">
							<v-list-item-content>
								<v-list-item-title :to="/store/ + shop.shop_id" :v-text="shop.shop_name"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
		
		
		
		
		<!--<ul>
			<li v-for="shop in favoriteStores" :key="shop.shop_id">
				<v-btn :to="/store/ + shop.shop_id" color="primary">{{ shop.shop_name }}</v-btn>
				<v-btn v-if="$store.state.config.settings" @click="removeFavorite(shop)" color="primary">D</v-btn>
			</li>
		</ul>-->
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