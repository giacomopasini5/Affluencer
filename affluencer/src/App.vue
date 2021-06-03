<template>
	<v-app id="app">
		<navbar :navLinks="navLinks"/>
		<v-main>
			<v-container fluid class="pa-0">
				<router-view/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import navbar from '@/components/Navbar.vue'

	export default {
		name: 'app',
		
		components: {
			navbar
		},

		computed: {
			navLinks: function() {
				return this.$store.state.auth.isLogged ? [
					{
						name: 'Informazioni',
						link: '/info'
					},
					{
						name: 'Profilo',
						link: '/profile'
					},
					{
						name: 'Esci',
						link: '/'
					}
				] : [
					{
						name: 'Informazioni',
						link: '/info'
					},
					{
						name: 'Accedi/Registrati',
						link: '/login'
					}
				]
			}
		}
	}
</script>