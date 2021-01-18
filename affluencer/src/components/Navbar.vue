<template>
	<nav>
		<div id="name">
			<router-link to="/">Affluencer</router-link>
		</div>
		<ul id="nav-links">
			<li v-for="item in navLinks" :key="item.key">
				<a :href="item.link">{{ item.name }}</a>
			</li>
		</ul>
		<div @click="openMobileNav()" id="burger">
			<div id="line1"></div>
			<div id="line2"></div>
			<div id="line3"></div>
		</div>
	</nav>
</template>

<script>
export default {
  name: 'navbar',
	
	props: ['navLinks'],
	
	methods: {
		openMobileNav() {
			const burger = document.getElementById('burger')
			const nav = document.getElementById('nav-links')
			const navLinks = document.querySelectorAll('.nav-links li')
			
			nav.classList.toggle('nav-active')
			
			burger.classList.toggle('toggle')
			
			navLinks.forEach((link, index) => {
        if (link.style.animation || link.style.webkitAnimation) {
          link.style.animation = ''
          link.style.webkitAnimation = ''
        } else {
          link.style.webkitAnimation = `navLinkFade 0.5s ease forwards ${index / 7}s`
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7}s`
        }
			})
		}
	},
	
	mounted() {}
}
</script>
