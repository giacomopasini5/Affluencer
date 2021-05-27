<template>
	<div id="navbar">
		<nav>
			<div id="name" @click="closeMobileNav()">
				<router-link to="/">Affluencer</router-link>
			</div>
			<ul id="nav-links">
				<li v-for="item in navLinks" @click="closeMobileNav()">
					<router-link v-if="item.name == 'Esci'" @click.native="logout()" :to="item.link">{{ item.name }}</router-link>
					<router-link v-else :to="item.link">{{ item.name }}</router-link>
				</li>
			</ul>
			<div id="burger" @click="openMobileNav()">
				<div id="line1"></div>
				<div id="line2"></div>
				<div id="line3"></div>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'navbar',
		
		props: ['navLinks'],
		
		methods: {
			openMobileNav: function() {
				document.getElementById('nav-links').classList.toggle('nav-active');
				document.getElementById('burger').classList.toggle('toggle');
			},
			
			closeMobileNav: function() {
				document.getElementById('nav-links').classList.remove('nav-active');
				document.getElementById('burger').classList.remove('toggle');
			}
		}
	}
</script>

<style>
	@import '../styles/navbar.css'
</style>