<template>
	<v-row justify="center" class="text-center pa-5">
		<v-col cols="10">
			<v-row v-if="$store.state.config.settings" justify="center" class="mt-5">
				<v-col cols="10" class="pa-2">
					<v-text-field v-model="userSettings.name" label="Nome" hide-details="auto" outlined dense></v-text-field>
				</v-col>
				<v-col cols="10" class="pa-2">
					<v-text-field type="email" v-model="userSettings.email" label="Email" hide-details="auto" outlined dense :error="$v.userSettings.email.$error"
					:rules="!$v.userSettings.email.$error ? [] : [$v.userSettings.email.email || 'L\'email non è valida']"></v-text-field>
				</v-col>
				<v-col cols="10" class="pa-2">
					<v-text-field v-model="userSettings.city" label="Città" hide-details="auto" outlined dense></v-text-field>
				</v-col>
				<v-col cols="10" class="pa-2">
					<v-btn @click="applySettings" color="primary">Salva</v-btn>
				</v-col>
			</v-row>
			<v-row v-else justify="center">
				<v-col cols="10">
					<span class="text-h4">{{ userData.name }}</span>
				</v-col>
				<v-col cols="10">
					<span class="text-body-1">{{ userData.city }}</span>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
	import {email} from 'vuelidate/lib/validators'
	
	export default {
		name: 'userInfo',
		
		props: ['userData'],
		
		data: function() {
			return {
				userSettings: {
					name: this.userData.name,
					email: this.userData.email,
					city: this.userData.city
				}
			}
		},
		
		created: function() {
			this.$store.watch((state) => {return this.$store.state.config.settings},
			() => {this.syncSettings(this.userSettings, this.userData)});
		},
		
		methods: {
			applySettings: async function() {
				this.$v.$touch();
				if(this.$v.$invalid) return;
				
				this.formatSettings(this.userSettings, this.userData);
				try {
					var res = await this.axios.put('/clients/' + this.$route.params.id, this.userSettings);
					this.saveSettings(this.userSettings, this.userData);
					this.$store.commit('disableSettings');
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		},
		
		validations: {
			userSettings: {
				email: {email}
			}
		}
	}
</script>