<template>
	<div id="userInfo">
		<h1 class="profile-title">{{ userData.name }}</h1>
		
		<div class="profile-info">
			
			<span  class="profile-span">{{ userData.city }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userInfo',
		
		props: ['userData'],
		
		data: function() {
			return {
				userSettings: {
					name,
					email,
					city
				}
			}
		}
	}
</script>

<style>
	@import '../styles/profile.css'
</style>