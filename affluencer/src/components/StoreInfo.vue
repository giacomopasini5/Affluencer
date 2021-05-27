<template>
	<div id="storeInfo">
		<h1 class="store-title">{{ name }}</h1>
		<div class="sideInfo">
			<div id="description">
				<span class="store-info">{{ address }}</span>
				<span class="store-info">{{ city }}</span>
				<span class="store-info">Apre alle {{ openTime }}</span>
				<span class="store-info">Chiude alle {{ closeTime }}</span>
				<span class="store-info">Capienza: {{ capacity }} </span>
				<span class="store-info">Affluenza: {{ influx }} </span>
			</div>
			<div id="signalCustomers">
				<label for="currentCustomers" class="store-info">Segnala affluenza</label>
				<input type="number" v-model="currentCustomers" id="currentCustomers" name="currentCustomers" class="store-input">
				<button @click="signalCustomers()" class="store-button">Invia</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'storeInfo',
		
		props: [
			'name',
			'address',
			'city',
			'openTime',
			'closeTime',
			'capacity',
			'influx'
		],
		
		data: function() {
			return {
				currentCustomers: ''
			}
		}
	}
</script>

<style>
	@import '../styles/store.css'
</style>