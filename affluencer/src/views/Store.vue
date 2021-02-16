<template>
  <div id="store">
		<storeInfo/>
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
		}
	}
</script>

<style>
	@import '../styles/store.css'
</style>