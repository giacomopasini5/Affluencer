<template>
	<div id="registerClient">
		<v-row justify="center" class="text-center pa-10">
			<v-col sm="8" md="6" lg="4">
				<v-row class="text-center pa-5">
					<v-col cols="12">
						<h1>Registrazione Cliente</h1>
					</v-col>
					<v-col cols="12">
						<form @submit.prevent="handleSubmit" novalidate>
							<v-row>
								<v-col cols="12">
									<v-text-field v-model="client.name" label="Nome" hide-details="auto" outlined :error="$v.client.name.$error"
									:rules="!$v.client.name.$error ? [] : [$v.client.name.required || 'Il nome è obbligatorio']"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field v-model="client.city" label="Città" hide-details="auto" outlined :error="$v.client.city.$error"
									:rules="!$v.client.city.$error ? [] : [$v.client.city.required || 'La città è obbligatoria']"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field type="email" v-model="client.email" label="Email" hide-details="auto" outlined :error="$v.client.email.$error"
									:rules="!$v.client.email.$error ? [] : [$v.client.email.required || 'L\'email è obbligatoria', $v.client.email.email || 'L\'email non è valida']"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field type="password" v-model="client.password" label="Password" hide-details="auto" outlined :error="$v.client.password.$error"
									:rules="!$v.client.password.$error ? [] : [$v.client.password.required || 'La password è obbligatoria', $v.client.password.minLength || 'La password deve essere di almeno 6 caratteri']"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field type="password" v-model="client.confirmPassword" label="Conferma Password" hide-details="auto" outlined :error="$v.client.confirmPassword.$error"
									:rules="!$v.client.confirmPassword.$error ? [] : [$v.client.confirmPassword.required || 'La conferma password è obbligatoria', $v.client.confirmPassword.sameAsPassword || 'Le password devono corrispondere']"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-btn type="submit" color="primary" :loading="registerClientLoading" :disabled="registerClientLoading">Registrati</v-btn>
								</v-col>
							</v-row>
						</form>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import {required, email, minLength, sameAs} from "vuelidate/lib/validators"
	
	export default {
		name: 'registerClient',
		
		data: function() {
			return {
				client: {
					name: '',
					city: '',
					email: '',
					password: '',
					confirmPassword: ''
				},
				registerClientLoading: false
			}
		},
		
		validations: {
			client: {
				name: {required},
				city: {required},
				email: {required, email},
				password: {required, minLength: minLength(6)},
				confirmPassword: {required, sameAsPassword: sameAs('password')}
			}
		},
		
		methods: {
			handleSubmit: function(e) {
				this.$v.$touch();
				if (this.$v.$invalid) return;
				
				this.registerClientLoading = true;
				this.axios.post('/clients', this.client)
				.then((res) => {
					this.login(res.data.id, res.data.username, res.data.usertype);
				})
				.catch((error) => {
					console.log('failure');
					console.log(error);
				});
			}
		}
	}
</script>