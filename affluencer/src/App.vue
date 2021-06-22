<template>
	<v-app id="app">
		<v-btn fab fixed bottom left small @click="toggleTheme" color="primary" style="z-index: 9999">
			<v-icon>mdi-theme-light-dark</v-icon>
		</v-btn>
		<navbar :navLinks="navLinks"/>
		<v-main>
			<v-container fluid class="pa-0">
				<v-slide-x-transition>
					<router-view/>
				</v-slide-x-transition>
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