<template>
  <div id="home">
		<navbar :navLinks="[]"/>
  </div>
</template>

<script>
import navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    navbar
  }
}
</script>

<style>
	@import '../styles/home.css'
</style>