<template>
	<v-app id="app">
		<navbar :navLinks="navLinks"/>
    	<router-view/>
  	</v-app>
	<v-app>
		<v-navigation-drawer app>
			
		</v-navigation-drawer>
		
		<v-app-bar app>
			
		</v-app-bar>
		
		<v-main>
			<v-container fluid>
				<router-view/>
			</v-container>
		</v-main>

		<v-footer app>
			<!-- -->
		</v-footer>
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