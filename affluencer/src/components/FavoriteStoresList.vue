<template>
	<div id="favoriteStoresList">
		<h1>Negozi preferiti</h1>
		<ul id="favorite-stores">
			<li v-for="item in favoriteStores" :key="item.shop_id">
				<router-link to="/store/item.shop_id">{{ item.name }}</router-link>
				<button class="item-delete">&#10006</button>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'favoriteStoresList',
		
		props: ['favoriteStores']
	}
</script>

<style>
	@import '../styles/profile.css'
</style>