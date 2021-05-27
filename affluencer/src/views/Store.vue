<template>
  <div id="store">
		<storeInfo
			:name="store.name"
			:address="store.address"
			:city="store.city"
			:openTime="store.openTime"
			:closeTime="store.closeTime"
			:capacity="store.capacity"
			:influx="store.influx"
		/>
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
				store: ''
			}
		},
		
		mounted: function() {
			this.axios.get('/shops/' + this.$route.params.id)
			.then((res) => {
				this.store = res.data;
			})
			.catch((error) => {
				console.log('failure');
				console.log(error);
			});
		}
	}
</script>

<style>
	@import '../styles/store.css'
</style>