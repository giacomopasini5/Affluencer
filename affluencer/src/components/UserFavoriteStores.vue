<template>
	<v-row v-if="favoriteStores.length" justify="center" class="text-left pa-5">
		<v-col cols="10">
			<v-card flat>
				<v-card-title>Negozi preferiti</v-card-title>
				<v-list outlined class="pa-0">
					<v-list-item v-for="shop in favoriteStores" :key="shop.shop_id" router :to="$store.state.config.settings ? '' : /store/ + shop.shop_id">
						<v-list-item-avatar>
							<v-icon color="yellow">mdi-star</v-icon>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>{{ shop.shop_name }}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action v-if="$store.state.config.settings">
							<v-btn @click="removeFavorite(shop.shop_id)" icon>
								<v-icon color="red">mdi-delete</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name: 'userFavoriteStores',
		
		data: function() {
			return {
				favoriteStores: ''
			}
		},
		
		created: function() {
			this.initializeFavoriteStores();
		},
		
		methods: {
			initializeFavoriteStores: async function() {
				try {
					var res = await this.axios.get('/clients/' + $cookies.get('userid') + '/favorite_shops');
					this.favoriteStores = res.data;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			removeFavorite: async function(shopId) {
				try {
					var res = await this.axios.delete('/clients/' + $cookies.get('userid') + '/favorite_shops/' + shopId);
					this.initializeFavoriteStores();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>