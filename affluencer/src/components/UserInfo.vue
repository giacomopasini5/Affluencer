<template>
	<div id="userInfo">
		<h1 class="profile-title">{{ user.name }}</h1>
		<span class="profile-span">{{ user.city }}</span>
	</div>
</template>

<script>
	export default {
		name: 'userInfo',
		
		props: ['user']
	}
</script>

<style>
	@import '../styles/profile.css'
</style>