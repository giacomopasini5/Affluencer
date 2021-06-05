<template>
	<v-row justify="center" class="text-center pa-10">
		<v-col sm="8" md="6" lg="4">
			<loginForm/>
		</v-col>
	</v-row>
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