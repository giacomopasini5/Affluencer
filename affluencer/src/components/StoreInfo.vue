<template>
	<div id="storeInfo">
		<h1 class="store-title">{{ name }}</h1>
		<div v-if="!isOwner && isClient()">
			<button v-if="isFavorite" @click="removeFavorite()" class="favorite-button">&#11088</button>
			<button v-else @click="setFavorite()" class="favorite-button">&#9734</button>
		</div>
		<div class="sideInfo">
			<div id="description">
				<span class="store-info">{{ address }}</span>
				<span class="store-info">{{ city }}</span>
				<span class="store-info">Apre alle {{ openTime }}</span>
				<span class="store-info">Chiude alle {{ closeTime }}</span>
				<span class="store-info">Capienza: {{ capacity }} </span>
				<span class="store-info">Affluenza: {{ influx }} </span>
			</div>
			<div v-if="!isOwner" id="signalCustomers">
				<label for="currentCustomers" class="store-info">Segnala affluenza</label>
				<input type="number" v-model="currentCustomers" id="currentCustomers" name="currentCustomers" class="store-input">
				<button @click="signalCustomers()" class="store-button">Invia</button>
			</div>
			<div v-else id="settingsButton">
				<button @click="openSettings()" class="store-button">Impostazioni</button>
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
				isFavorite: false,
				currentCustomers: '',
				settings: false
			}
		},
		
		updated() {
			this.axios.get('/clients/' + $cookies.get('userid') + '/favorite_shops')
			.then((res) => {
				for(var store of res.data)
					if(store.shop_id == this.$route.params.id)
						this.isFavorite = true;
					else
						this.isFavorite = false;
			})
			.catch((error) => {
				console.log('failure');
				console.log(error);
			});
		},
		
		methods: {
			setFavorite: function() {
				this.axios.post('/clients/' + $cookies.get('userid') + '/favorite_shops', {
					shop_id: this.$route.params.id,
					shop_name: this.name
				})
				.then((res) => {
					this.$router.go();
				})
				.catch((error) => {
					console.log('failure');
					console.log(error);
				});
			},
			
			removeFavorite: function() {
				this.axios.delete('/clients/' + $cookies.get('userid') + '/favorite_shops/' + this.$route.params.id)
				.then((res) => {
					this.$router.go();
				})
				.catch((error) => {
					console.log('failure');
					console.log(error);
				});
			},
			
			signalCustomers: function() {
				//axios
			},
			
			openSettings: function() {
				this.settings = true;
			}
		}
	}
</script>

<style>
	@import '../styles/store.css'
</style>