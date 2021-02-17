<template>
	<div id="storeInfo">
		<h1 class="store-title">Nome</h1>
		<div class="sideInfo">
			<div id="description">
				<span class="store-info">Indirizzo</span>
				<span class="store-info">Città</span>
				<span class="store-info">Apre alle </span>
				<span class="store-info">Chiude alle </span>
				<span class="store-info">Capienza: </span>
			</div>
			<div id="signalCustomers">
				<label for="currentCustomers" class="store-info">Segnala affluenza</label>
				<input type="number" v-model="store.currentCustomers" id="currentCustomers" name="currentCustomers" class="store-input">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'storeInfo',
		
		data: function() {
      return {
        store: {
					currentCustomers: ''
				}
			}
		}
	}
</script>

<style>
	@import '../styles/store.css'
</style>