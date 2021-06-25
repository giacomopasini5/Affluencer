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
					<span v-if="checkTime()" class="text-body-1 green--text">Aperto</span>
					<span v-else class="text-body-1 red--text">Chiuso</span>
				</v-col>
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
					<v-text-field type="number" v-model="customersInside" label="N.° all'interno" hide-details="auto" outlined dense :error="$v.customersInside.$error"
					:rules="!$v.customersInside.$error ? [] : [$v.customersInside.minValue || 'L\'affluenza deve essere maggiore di 0']"></v-text-field>
				</v-col>
				<v-col cols="2">
					<v-btn @click="signalCustomers" :disabled="customersInsideSignaled" icon>
						<v-icon color="primary">mdi-send</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row v-if="isClient()" justify="center">
				<v-col cols="5" md="7">
					<v-text-field type="number" v-model="customersQueue" label="N.° in coda" hide-details="auto" outlined dense :error="$v.customersQueue.$error"
					:rules="!$v.customersQueue.$error ? [] : [$v.customersQueue.minValue || 'L\'affluenza deve essere maggiore di 0']"></v-text-field>
				</v-col>
				<v-col cols="2">
					<v-btn @click="signalCustomers" :disabled="customersQueueSignaled" icon>
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
				customersInside: '',
				customersQueue: '',
				customersInsideSignaled: false,
				customersQueueSignaled: false
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
				
				try {
					var res = await this.axios.post('/communications/', {
						shop_id: this.$route.params.id,
						client_id: $cookies.get('userid'),
						people_inside: this.customersInside,
						people_queue: this.customersQueue
					});
					if(this.customersInside != '') this.customersInsideSignaled = true;
					if(this.customersQueue != '') this.customersQueueSignaled = true;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			checkTime: function() {
				var now = new Date();
				var ot = this.storeData.openTime.split(':');
				var ct = this.storeData.closeTime.split(':');
				var openTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ot[0], ot[1]);
				var closeTime= new Date(now.getFullYear(), now.getMonth(), now.getDate(), ct[0], ct[1]);
				return (now > openTime && now < closeTime);
			}
		},
		
		validations: {
			storeSettings: {
				email: {email},
				capacity: {minValue: minValue(1)}
			},
			customersInside: {minValue: minValue(1)},
			customersQueue: {minValue: minValue(1)}
		}
	}
</script>