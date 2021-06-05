<template>
	<div v-if="hasStoreData">
		<storeInfo :storeData="storeData"/>
		<storeStats/>
	</div>
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
				hasStoreData: false
			}
		},
		
		created: function() {
			this.initializeStore();
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