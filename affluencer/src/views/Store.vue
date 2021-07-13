<template>
	<v-row v-if="hasStoreData" justify="center" class="text-center pa-10">
		<v-col>
			<v-card elevation="5">
				<v-btn v-if="isOwner" fab fixed top right @click="$store.commit('toggleSettings')" color="primary" class="mt-16">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
				<v-btn v-if="isClient()" fab fixed top right @click="setFavorite" color="primary" class="mt-16">
					<v-icon v-if="isFavorite" color="yellow">mdi-star</v-icon>
					<v-icon v-else color="white">mdi-star</v-icon>
				</v-btn>
				<v-row v-if="!$store.state.config.settings" justify="center">
					<v-col cols="10" class="mt-5">
						<span class="text-h4">{{ storeData.name }}</span>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="10" md="4">
						<storeInfo :storeData="storeData"/>
					</v-col>
					<v-col cols="10" md="8">
						<storeAnnouncements/>
						<storeReviews/>
						<userReservations v-if="isStore && isOwner" />
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="10">
						<storeStats/>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import storeInfo from '@/components/StoreInfo.vue'
	import storeAnnouncements from '@/components/StoreAnnouncements.vue'
	import storeReviews from '@/components/StoreReviews.vue'
	import storeStats from '@/components/StoreStats.vue'
	import userReservations from "@/components/UserReservations.vue";

	
	export default {
		name: 'store',
		
		components: {
			storeInfo,
			storeAnnouncements,
			storeReviews,
			storeStats,
			userReservations,

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
			this.$store.commit('disableSettings');
		},
		
		methods: {
			initializeStore: async function() {
				if(this.isClient()) {
					try {
						var res = await this.axios.get('/shops/' + this.$route.params.id + '/info');
						this.storeData = res.data;
						this.hasStoreData = true;
					} catch(error) {
						console.log('failure');
						console.log(error);
					}
					this.initializeFavorite();
				} else {
					try {
						var res = await this.axios.get('/shops/' + this.$route.params.id);
						this.storeData = res.data;
						this.hasStoreData = true;
					} catch(error) {
						console.log('failure');
						console.log(error);
					}
				}
			},
			
			initializeFavorite: async function() {
				try {
					var res = await this.axios.get('/clients/' + $cookies.get('userid') + '/favorite_shops');
					for(var store of res.data)
						if(store.shop_id == this.$route.params.id)
							this.isFavorite = true;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			setFavorite: async function() {
				if(!this.isFavorite) {
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
				} else {
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
	}
</script>