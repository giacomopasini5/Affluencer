<template>
  <div id="app">
		<navbar
			:navLinks="[
				{
					name: 'Informazioni',
					link: '/info'
				},
				{
					name: 'Profilo',
					link: '/profile'
				},
				{
					name: 'Accedi/Registrati',
					link: '/login'
				},
				{
					name: 'Esci',
					link: '/login'
				}
			]"
		/>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/Navbar.vue'

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style>
	@import 'styles/navbar.css'
</style>