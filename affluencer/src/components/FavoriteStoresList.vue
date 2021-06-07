<template>
	<v-row justify="center" class="text-center pa-5">
		<v-col cols="10">
			<span class="text-h5">Negozi preferiti</span>
		</v-col>
		<v-col cols="10">
			<v-row justify="center">
				<v-col cols="10">
					<v-list outlined class="text-left pa-0">
						<v-list-item v-for="shop in favoriteStores" :key="shop.shop_id" router :to="$store.state.config.settings ? '' : /store/ + shop.shop_id">
							<v-list-item-avatar>
								<v-icon color="yellow">mdi-star</v-icon>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title>{{ shop.shop_name }}</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action v-if="$store.state.config.settings">
								<v-btn @click="removeFavorite(shop)" icon>
									<v-icon color="red">mdi-delete</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
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