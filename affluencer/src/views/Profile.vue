<template>
  <div id="profile">
		<userInfo/>
    <favoriteStoresList :favoriteStores="[1, 2, 3]"/>
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
		}
	}
</script>

<style>
	@import '../styles/profile.css'
</style>