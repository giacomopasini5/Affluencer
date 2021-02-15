<template>
  <div id="profile">
		<userInfo/>
    <favoriteStoresList :favoriteStores="favoriteStores"/>
  </div>
</template>

<script>
	import userInfo from '@/components/UserInfo.vue'
	import favoriteStoresList from '@/components/FavoriteStoresList.vue'
	
	export default {
		name: 'profile',
		
		components: {
			userInfo,
			favoriteStoresList
		},
		
		data: function() {
			return {
				favoriteStores: [
					{
						id: '1',
						name: 'prova 1'
					},
					{
						id: '2',
						name: 'prova 2'
					},
					{
						id: '3',
						name: 'prova 3'
					}
				],
				ciao: 'sto'
			}
		}/*,
		
		mounted: function() {
			this.axios.get('/shops').then(resp => {
				favoriteStores = resp.data
			})
		}*/
	}
</script>

<style>
	@import '../styles/profile.css'
</style>