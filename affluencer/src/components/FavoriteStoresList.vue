<template>
	<div id="favoriteStoresList">
		<h1>Negozi preferiti</h1>
		<ul id="favorite-stores">
			<li v-for="item in favoriteStores">
				<router-link to="/store">{{ item.name }}</router-link>
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