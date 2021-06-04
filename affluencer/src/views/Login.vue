<template>
	<div id="login">
		<loginForm/>
	</div>
</template>

<script>
	import loginForm from '@/components/LoginForm.vue'
	
	export default {
		name: 'login',
		
		components: {
			loginForm
		}
	}
</script>

<style>
	@import "../styles/loginForm.css";
</style>