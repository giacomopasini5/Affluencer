<template>
	<v-row justify="center" class="text-center pa-5">
		<v-col>
			<v-row v-if="$store.state.config.settings" justify="center" class="mt-5">
				<v-col cols="8" class="pa-2">
					<v-text-field v-model="storeSettings.name" label="Nome" hide-details="auto" outlined dense></v-text-field>
				</v-col>
				<v-col cols="8" class="pa-2">
					<v-text-field type="email" v-model="storeSettings.email" label="Email" hide-details="auto" outlined dense :error="$v.storeSettings.email.$error"
					:rules="!$v.storeSettings.email.$error ? [] : [$v.storeSettings.email.email || 'L\'email non è valida']"></v-text-field>
				</v-col>
				<v-col cols="8" class="pa-2">
					<v-text-field v-model="storeSettings.address" label="Indirizzo" hide-details="auto" outlined dense></v-text-field>
				</v-col>
				<v-col cols="8" class="pa-2">
					<v-text-field v-model="storeSettings.city" label="Città" hide-details="auto" outlined dense></v-text-field>
				</v-col>
				<v-row justify="center" class="ma-0">
					<v-col cols="4" class="pa-2">
						<v-text-field type="time" v-model="storeSettings.openTime" label="Apertura" hide-details="auto" outlined dense></v-text-field>
					</v-col>
					<v-col cols="4" class="pa-2">
						<v-text-field type="time" v-model="storeSettings.closeTime" label="Chiusura" hide-details="auto" outlined dense></v-text-field>
					</v-col>
				</v-row>
				<v-col cols="8" class="pa-2">
					<v-text-field type="number" v-model="storeSettings.capacity" label="Capienza" hide-details="auto" outlined dense :error="$v.storeSettings.capacity.$error"
					:rules="!$v.storeSettings.capacity.$error ? [] : [$v.storeSettings.capacity.minValue || 'La capienza deve essere maggiore di 0']"></v-text-field>
				</v-col>
				<v-col cols="8" class="pa-2">
					<v-btn @click="applySettings" color="primary">Salva</v-btn>
				</v-col>
			</v-row>
			<v-row v-else justify="center" class="text-md-left">
				<v-col cols="10" class="pa-1">
					<span class="text-body-1">{{ storeData.address }}</span>
				</v-col>
				<v-col cols="10" class="pa-1">
					<span class="text-body-1">{{ storeData.city }}</span>
				</v-col>
				<v-col cols="10" class="pa-1">
					<span class="text-body-1">Apre alle {{ storeData.openTime }}</span>
				</v-col>
				<v-col cols="10" class="pa-1">
					<span class="text-body-1">Chiude alle {{ storeData.closeTime }}</span>
				</v-col>
				<v-col cols="10" class="pa-1">
					<span class="text-body-1">Capienza: {{ storeData.capacity }}</span>
				</v-col>
				<v-col cols="10" class="pa-1">
					<span class="text-body-1">Affluenza: {{ storeData.influx }}</span>
				</v-col>
			</v-row>
			<v-row v-if="isClient()" justify="center" class="mt-5">
				<v-col cols="5" md="7">
					<v-text-field type="number" v-model="customers_inside" label="N.° all'interno" hide-details="auto" outlined dense :error="$v.customers_inside.$error"
					:rules="!$v.customers_inside.$error ? [] : [$v.customers_inside.minValue || 'L\'affluenza deve essere maggiore di 0']"></v-text-field>
				</v-col>
				<v-col cols="2">
					<v-btn @click="signalCustomers" :disabled="customersSignaled" icon>
						<v-icon color="primary">mdi-send</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row v-if="isClient()" justify="center">
				<v-col cols="5" md="7">
					<v-text-field type="number" v-model="customers_queue" label="N.° in coda" hide-details="auto" outlined dense :error="$v.customers_queue.$error"
					:rules="!$v.customers_queue.$error ? [] : [$v.customers_queue.minValue || 'L\'affluenza deve essere maggiore di 0']"></v-text-field>
				</v-col>
				<v-col cols="2">
					<v-btn @click="signalCustomers" :disabled="customersSignaled" icon>
						<v-icon color="primary">mdi-send</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
	import {minValue, email} from 'vuelidate/lib/validators'
	
	export default {
		name: 'storeInfo',
		
		props: ['storeData'],
		
		data: function() {
			return {
				storeSettings: {
					name: this.storeData.name,
					email: this.storeData.email,
					address: this.storeData.address,
					city: this.storeData.city,
					openTime: this.storeData.openTime,
					closeTime: this.storeData.closeTime,
					capacity: this.storeData.capacity
				},
				customers_inside: '',
				customers_queue: '',
				customersSignaled: false
			}
		},
		
		created: function() {
			this.$store.watch((state) => {return this.$store.state.config.settings},
			() => {this.syncSettings(this.storeSettings, this.storeData)});
		},
		
		methods: {
			applySettings: async function() {
				this.$v.$touch();
				if(this.$v.$invalid) return;
				
				this.formatSettings(this.storeSettings, this.storeData);
				try {
					var res = await this.axios.put('/shops/' + this.$route.params.id, this.storeSettings);
					this.saveSettings(this.storeSettings, this.storeData);
					this.$store.commit('disableSettings');
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			signalCustomers: async function() {
				this.$v.$touch();
				if(this.$v.$invalid) return;
				
				if(this.currentCustomers != '')
					try {
						var res = await this.axios.post('/communications/', {
							shop_id: mongoose.Types.ObjectId,
							client_id: mongoose.Types.ObjectId,
							people_inside: Number,
							people_queue: Number
						});
						this.customersSignaled = true;
					} catch(error) {
						console.log('failure');
						console.log(error);
					}
			}
		},
		
		validations: {
			storeSettings: {
				email: {email},
				capacity: {minValue: minValue(1)}
			},
			customers_inside: {minValue: minValue(1)},
			customers_queue: {minValue: minValue(1)}
		}
	}
</script>