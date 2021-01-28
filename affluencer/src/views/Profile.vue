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
						name: 'prova',
						id: '1'
					},
					{
						name: 'prova2',
						id: '2'
					},
					{
						name: 'prova3',
						id: '3'
					}
				]
			}
		}
	}
</script>

<style>
	@import '../styles/profile.css'
</style>