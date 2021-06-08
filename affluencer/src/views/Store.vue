<template>
	<v-row v-if="hasStoreData" justify="center" class="text-center pa-10">
		<v-col>
			<v-card elevation="5">
				<v-btn v-if="isOwner" fab absolute top right @click="$store.commit('toggleSettings')" color="primary" class="mt-10">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
				<v-btn v-if="isClient()" fab absolute top left @click="isFavorite ? removeFavorite : setFavorite" color="primary" class="mt-10">
					<v-icon color="isFavorite ? yellow : white">mdi-star</v-icon>
				</v-btn>
				<v-row justify="center">
					<v-col cols="10">
						<span class="text-h4">{{ storeData.name }}</span>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="8" md="5" lg="4">
						<storeInfo :storeData="storeData"/>
					</v-col>
					<v-col cols="10" md="7" lg="8">
						<storeStats/>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import storeInfo from '@/components/StoreInfo.vue'
	import storeStats from '@/components/StoreStats.vue'
	
	export default {
		name: 'store',
		
		components: {
			storeInfo,
			storeStats
		},
		
		data: function() {
			return {
				storeData: '',
				hasStoreData: false,
				isFavorite: false
			}
		},
		
		created: function() {
			this.initializeStore();
			this.initializeFavorite();
			this.$store.commit('disableSettings');
		},
		
		methods: {
			initializeStore: async function() {
				try {
					var res = await this.axios.get('/shops/' + this.$route.params.id);
					this.storeData = res.data;
					this.hasStoreData = true;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			initializeFavorite: async function() {
				if(this.isClient()) {
					try {
						var res = await this.axios.get('/clients/' + $cookies.get('userid') + '/favorite_shops');
						for(var store of res.data)
							if(store.shop_id == this.$route.params.id)
								this.isFavorite = true;
					} catch(error) {
						console.log('failure');
						console.log(error);
					}
				}
			},
			
			setFavorite: async function() {
				try {
					var res = await this.axios.post('/clients/' + $cookies.get('userid') + '/favorite_shops', {
						shop_id: this.$route.params.id,
						shop_name: this.storeData.name
					});
					this.isFavorite = true;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			removeFavorite: async function() {
				try {
					var res = await this.axios.delete('/clients/' + $cookies.get('userid') + '/favorite_shops/' + this.$route.params.id);
					this.isFavorite = false;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>