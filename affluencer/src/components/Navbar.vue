<template>
	<nav>
		<div id="name">
			<router-link to="/">Affluencer</router-link>
		</div>
		<ul class="nav-links">
			<li v-for="list in navLinks" :key="list.key">
				<a v-if="list.dropdown === false" :href="list.link">{{ list.name }}</a>
				<div class="dropdown-link" v-else>
					<a :href="list.link">
						{{ list.name }}
						<span>&#x2193;</span>
					</a>
					<ul class="dropdown-menu">
						<li v-for="item in list.dropdownLinks" :key="item.key">
							<a :href="item.link">{{ item.name }}</a>
						</li>
					</ul>
				</div>
			</li>
		</ul>
		<div @click="openMobileNav()" id="burger">
			<div class="line1"></div>
			<div class="line2"></div>
			<div class="line3"></div>
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
			const nav = document.querySelector('.nav-links')
			const navLinks = document.querySelectorAll('.nav-links li')
			
			nav.classList.toggle('nav-active')
			
			burger.classList.toggle('toggle')
			
			navLinks.forEach((link, index) => {
        if (link.style.animation || link.style.webkitAnimation) {
            link.style.animation = ''
            link.style.webkitAnimation = ''
        } else {
            link.style.webkitAnimation = `navLinkFade 0.5s ease forwards ${
            index / 7
          }s`
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7}s`
        }
			})
		},
		
		openDropdownNav() {
			const dropdownLink = document.querySelectorAll('.dropdown-link')
			
			dropdownLink.forEach((dropdown) => {
        dropdown.addEventListener('mouseover', () => {
          dropdown.children[1].style.display = 'block'
        })
        dropdown.addEventListener('mouseleave', () => {
          dropdown.children[1].style.display = 'none'
        })
			})
		}
	},
	
	mounted() {}
}
</script>
