<template>
	<div id="userInfo">
		<h1 class="profile-title">{{ name }}</h1>
		<span class="profile-span">{{ city }}</span>
	</div>
</template>

<script>
	export default {
		name: 'userInfo',
		
		props: [
			'name',
			'city'
		]
	}
</script>

<style>
	@import '../styles/profile.css'
</style>