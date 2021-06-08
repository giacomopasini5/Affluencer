<template>
	<v-row justify="center" class="text-center pa-5">
		<v-col>
			<v-row v-if="$store.state.config.settings" justify="center">
				<v-col cols="8">
					<v-text-field v-model="storeSettings.name" label="Nome" hide-details="auto" outlined dense></v-text-field>
				</v-col>
				<v-col cols="8">
					<v-text-field type="email" v-model="storeSettings.email" label="Email" hide-details="auto" outlined dense :error="$v.storeSettings.email.$error"
					:rules="!$v.storeSettings.email.$error ? [] : [$v.storeSettings.email.email || 'L\'email non è valida']"></v-text-field>
				</v-col>
				<v-col cols="8">
					<v-text-field v-model="storeSettings.address" label="Indirizzo" hide-details="auto" outlined dense></v-text-field>
				</v-col>
				<v-col cols="8">
					<v-text-field v-model="storeSettings.city" label="Città" hide-details="auto" outlined dense></v-text-field>
				</v-col>
				<v-row justify="center" class="ma-0">
					<v-col cols="4">
						<v-text-field type="time" v-model="storeSettings.openTime" label="Apertura" hide-details="auto" outlined dense></v-text-field>
					</v-col>
					<v-col cols="4">
						<v-text-field type="time" v-model="storeSettings.closeTime" label="Chiusura" hide-details="auto" outlined dense></v-text-field>
					</v-col>
				</v-row>
				<v-col cols="8">
					<v-text-field type="number" v-model="storeSettings.capacity" label="Capienza" hide-details="auto" outlined dense :error="$v.storeSettings.capacity.$error"
					:rules="!$v.storeSettings.capacity.$error ? [] : [$v.storeSettings.capacity.minValue || 'La capienza deve essere maggiore di 0']"></v-text-field>
				</v-col>
				<v-col cols="8">
					<v-btn @click="applySettings" color="primary">Salva</v-btn>
				</v-col>
			</v-row>
			<v-row v-else justify="center" class="text-left">
				<v-col cols="10" class="pa-2">
					<span class="text-body-1">{{ storeData.address }}</span>
				</v-col>
				<v-col cols="10" class="pa-2">
					<span class="text-body-1">{{ storeData.city }}</span>
				</v-col>
				<v-col cols="10" class="pa-2">
					<span class="text-body-1">Apre alle {{ storeData.openTime }}</span>
				</v-col>
				<v-col cols="10" class="pa-2">
					<span class="text-body-1">Chiude alle {{ storeData.closeTime }}</span>
				</v-col>
				<v-col cols="10" class="pa-2">
					<span class="text-body-1">Capienza: {{ storeData.capacity }}</span>
				</v-col>
				<v-col cols="10" class="pa-2">
					<span class="text-body-1">Affluenza: {{ storeData.influx }}</span>
				</v-col>
			</v-row>
			<v-row v-if="isClient()" justify="center">
				<v-col cols="10">
					<v-text-field type="number" v-model="currentCustomers" label="Segnala affluenza" hide-details="auto" outlined dense :error="$v.currentCustomers.$error"
					:rules="!$v.currentCustomers.$error ? [] : [$v.currentCustomers.minValue || 'L\'affluenza deve essere maggiore di 0']"></v-text-field>
				</v-col>
				<v-col cols="2">
					<v-btn @click="signalCustomers" color="primary">Invia</v-btn>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
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
				currentCustomers: ''
			}
		},
		
		methods: {
			applySettings: async function() {
				this.$v.$touch();
				if(this.$v.$invalid) return;
				
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
			},
			
			signalCustomers: function() {
				//axios
			}
		},
		
		validations: {
			storeSettings: {
				email: {email},
				capacity: {minValue: minValue(1)}
			},
			currentCustomers: {minValue: minValue(1)}
		}
	}
</script>