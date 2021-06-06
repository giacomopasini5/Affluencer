<template>
	<v-row v-if="hasStoreData" justify="center" class="text-center pa-10">
		<v-col>
			<v-card elevation="5">
				<v-btn fab absolute top right @click="$store.commit('toggleSettings')" color="primary" class="mt-10">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
				<v-btn v-if="isClient()" fab absolute top left @click="isFavorite? removeFavorite : setFavorite" color="primary" class="mt-10">
					<v-icon color="isFavorite ? yellow : white">mdi-star</v-icon>
				</v-btn>
				<v-row justify="center">
					<v-col cols="10">
						<h1>{{ storeData.name }}</h1>
					</v-col>
					<v-col cols="4">
						<storeInfo :storeData="storeData"/>
					</v-col>
					<v-col cols="8">
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
			}
		}
	}
</script>