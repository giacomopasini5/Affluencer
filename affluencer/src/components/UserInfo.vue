<template>
	<div id="userInfo">
		<h1 class="profile-title">Nome</h1>
		<span class="profile-span">Città</span>
	</div>
</template>

<script>
	export default {
		name: 'userInfo',
		
		props: ['name', 'city']
	}
</script>

<style>
	@import '../styles/profile.css'
</style>