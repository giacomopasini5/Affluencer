<template>
	<div id="userInfo">
		<h1 class="profile-title">{{ userData.name }}</h1>
		<span class="profile-span">{{ userData.city }}</span>
	</div>
</template>

<script>
	export default {
		name: 'userInfo',
		
		props: ['userData']
	}
</script>

<style>
	@import '../styles/profile.css'
</style>