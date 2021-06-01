<template>
  <div id="app">
		<navbar :navLinks="navLinks"/>
    <router-view/>
  </div>
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