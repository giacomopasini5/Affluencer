<template>
	<nav>
		<div id="logo">
			Affluencer
			<img alt="Affluencer logo" src="../assets/images/logo.png">
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
	props: 'navLinks'
}
</script>
