<template>
	<div id="storeInfo">
		<h1 class="store-title">{{ storeData.name }}</h1>
		<div v-if="isClient()">
			<button v-if="isFavorite" @click="removeFavorite()" class="favorite-button">&#11088</button>
			<button v-else @click="setFavorite()" class="favorite-button">&#9734</button>
		</div>
		<div class="sideInfo">
			<div v-if="$store.state.config.settings" id="storeSettings">
				<div class="store-info">
					<input type="text" v-model="storeSettings.name" id="nameSettings" name="nameSettings" :placeholder="storeData.name" class="store-input settings-input">
				</div>
				<div class="store-info">
					<input type="email" v-model="storeSettings.email" id="emailSettings" name="emailSettings" :placeholder="storeData.email" class="store-input settings-input" :class="{'is-invalid':$v.storeSettings.email.$error}">
					<div v-if="$v.storeSettings.email.$error" class="invalid-feedback">
						<span v-if="!$v.storeSettings.email.email">L'email non è valida</span>
					</div>
				</div>
				<div class="store-info">
					<input type="text" v-model="storeSettings.address" id="addressSettings" name="addressSettings" :placeholder="storeData.address" class="store-input settings-input">
				</div>
				<div class="store-info">
					<input type="text" v-model="storeSettings.city" id="citySettings" name="citySettings" :placeholder="storeData.city" class="store-input settings-input">
				</div>
				<div class="store-info">
					<input type="time" v-model="storeSettings.openTime" id="openTimeSettings" name="openTimeSettings" class="store-input settings-input">
				</div>
				<div class="store-info">
					<input type="time" v-model="storeSettings.closeTime" id="closeTimeSettings" name="closeTimeSettings" class="store-input settings-input">
				</div>
				<div class="store-info">
					<input type="number" v-model="storeSettings.capacity" id="capacitySettings" name="capacitySettings" :placeholder="storeData.capacity" class="store-input settings-input" :class="{'is-invalid': $v.storeSettings.capacity.$error}">
					<div v-if="$v.storeSettings.capacity.$error" class="invalid-feedback">
						<span v-if="!$v.storeSettings.capacity.minValue">La capienza deve essere maggiore di 0</span>
					</div>
				</div>
				<div class="store-info">
					<button @click="applySettings()" class="store-button">Salva</button>
				</div>
			</div>
			<div v-else id="storeDescription">
				<div class="store-info">
					<span>{{ storeData.address }}</span>
				</div>
				<div class="store-info">
					<span>{{ storeData.city }}</span>
				</div>
				<div class="store-info">
					<span>Apre alle {{ storeData.openTime }}</span>
				</div>
				<div class="store-info">
					<span>Chiude alle {{ storeData.closeTime }}</span>
				</div>
				<div class="store-info">
					<span>Capienza: {{ storeData.capacity }}</span>
				</div>
				<div class="store-info">
					<span>Affluenza: {{ storeData.influx }}</span>
				</div>
				<div v-if="isOwner" class="store-info">
					<button @click="openSettings()" class="store-button">Modifica</button>
				</div>
			</div>
			<div v-if="isClient()" id="customersForm">
				<label for="currentCustomers" class="store-info">Segnala affluenza</label>
				<input type="number" v-model="currentCustomers" id="currentCustomers" name="currentCustomers" class="store-input">
				<button @click="signalCustomers()" class="store-button">Invia</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {minValue, email} from "vuelidate/lib/validators"
	
	export default {
		name: 'storeInfo',
		
		props: ['storeData'],
		
		data: function() {
			return {
				storeSettings: {
					name: '',
					email: '',
					address: '',
					city: '',
					openTime: '',
					closeTime: '',
					capacity: ''
				},
				isFavorite: false,
				currentCustomers: ''
			}
		},
		
		created: function() {
			this.initializeFavorite();
		},
		
		methods: {
			initializeFavorite: async function() {
				if(this.isClient()) {
					try {
						var res = await this.axios.get('/clients/' + $cookies.get('userid') + '/favorite_shops');
						for(var store of res.data)
							if(store.shop_id == this.$route.params.id)
								this.isFavorite = true;
					} catch(error) {
						console.log('failure');
						console.log(error);
					}
				}
			},
			
			setFavorite: async function() {
				try {
					var res = await this.axios.post('/clients/' + $cookies.get('userid') + '/favorite_shops', {
						shop_id: this.$route.params.id,
						shop_name: this.storeData.name
					});
					this.isFavorite = true;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			removeFavorite: async function() {
				try {
					var res = await this.axios.delete('/clients/' + $cookies.get('userid') + '/favorite_shops/' + this.$route.params.id);
					this.isFavorite = false;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			signalCustomers: function() {
				//axios
			},
			
			openSettings: function() {
				this.$store.commit('enableSettings');
			},
			
			applySettings: async function() {
				if(this.isOwner) {
					this.$v.$touch();
					if (this.$v.$invalid) return;
					
					for(var key in this.storeSettings)
						if(this.storeSettings[key] != '')
							this.storeData[key] = this.storeSettings[key];
					try {
						var res = await this.axios.put('/shops/' + this.$route.params.id, this.storeData);
						this.$store.commit('disableSettings');
					} catch(error) {
						console.log('failure');
						console.log(error);
					}
				}
			}
		},
		
		validations: {
			storeSettings: {
				email: {email},
				capacity: {minValue: minValue(1)}
			}
		}
	}
</script>

<style>
	@import '../styles/store.css'
</style>