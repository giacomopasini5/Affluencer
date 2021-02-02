<template>
	<div id="favoriteStoresList">
		<h1>Negozi preferiti</h1>
		<ul id="favorite-stores">
			<li v-for="item in favoriteStores" :key="item.id">
				<router-link to="/store">{{ item.name }}</router-link>
				<button class="item-delete">&#10006</button>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'favoriteStoresList',
		//props: ['favoriteStores'],
		data() {
			return {
				favoriteStores: null
			}
		},
		mounted() {
			this.axios.get('/shops').then(resp => {
				this.favoriteStores = resp.data;
			});
		}
	}
</script>

<style>
	@import '../styles/profile.css'
</style>