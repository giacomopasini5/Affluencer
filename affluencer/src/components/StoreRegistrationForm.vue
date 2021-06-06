<template>
	<v-card :loading="registerStoreLoading" elevation="5">
		<v-row justify="center" class="text-center pa-5">
			<v-col cols="10">
				<h1>Registrazione Negozio</h1>
			</v-col>
			<v-col cols="10">
				<form @submit.prevent="handleSubmit" novalidate>
					<v-row justify="center">
						<v-col cols="10">
							<v-text-field v-model="store.name" label="Nome" hide-details="auto" outlined dense :error="$v.store.name.$error"
							:rules="!$v.store.name.$error ? [] : [$v.store.name.required || 'Il nome è obbligatorio']"></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-text-field v-model="store.address" label="Indirizzo" hide-details="auto" outlined dense :error="$v.store.address.$error"
							:rules="!$v.store.address.$error ? [] : [$v.store.address.required || 'L\'indirizzo è obbligatorio']"></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-text-field v-model="store.city" label="Città" hide-details="auto" outlined dense :error="$v.store.city.$error"
							:rules="!$v.store.city.$error ? [] : [$v.store.city.required || 'La città è obbligatoria']"></v-text-field>
						</v-col>
						<v-col cols="5">
							<v-text-field type="time" v-model="store.openTime" label="Apertura" hide-details="auto" outlined dense :error="$v.store.openTime.$error"
							:rules="!$v.store.openTime.$error ? [] : [$v.store.openTime.required || 'L\'orario di apertura è obbligatorio']"></v-text-field>
						</v-col>
						<v-col cols="5">
							<v-text-field type="time" v-model="store.closeTime" label="Chiusura" hide-details="auto" outlined dense :error="$v.store.closeTime.$error"
							:rules="!$v.store.closeTime.$error ? [] : [$v.store.closeTime.required || 'L\'orario di chiusura è obbligatorio']"></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-text-field type="number" v-model="store.capacity" label="Capienza" hide-details="auto" outlined dense :error="$v.store.capacity.$error"
							:rules="!$v.store.capacity.$error ? [] : [$v.store.capacity.required || 'La capienza è obbligatoria', $v.store.capacity.minValue || 'La capienza deve essere maggiore di 0']"></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-text-field type="email" v-model="store.email" label="Email" hide-details="auto" outlined dense :error="$v.store.email.$error"
							:rules="!$v.store.email.$error ? [] : [$v.store.email.required || 'L\'email è obbligatoria', $v.store.email.email || 'L\'email non è valida']"></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-text-field type="password" v-model="store.password" label="Password" hide-details="auto" outlined dense :error="$v.store.password.$error"
							:rules="!$v.store.password.$error ? [] : [$v.store.password.required || 'La password è obbligatoria', $v.store.password.minLength || 'La password deve essere di almeno 6 caratteri']"></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-text-field type="password" v-model="store.confirmPassword" label="Conferma Password" hide-details="auto" outlined dense :error="$v.store.confirmPassword.$error"
							:rules="!$v.store.confirmPassword.$error ? [] : [$v.store.confirmPassword.required || 'La conferma password è obbligatoria', $v.store.confirmPassword.sameAsPassword || 'Le password devono corrispondere']"></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-btn type="submit" color="primary" :disabled="registerStoreLoading">Registrati</v-btn>
						</v-col>
					</v-row>
				</form>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
	import {required, minValue, email, minLength, sameAs} from "vuelidate/lib/validators"
	
	export default {
		name: 'registerStore',
		
		data: function() {
			return {
				store: {
					name: '',
					address: '',
					city: '',
					openTime: '',
					closeTime: '',
					capacity: '',
					email: '',
					password: '',
					confirmPassword: ''
				},
				registerStoreLoading: false
			}
		},
		
		validations: {
			store: {
				name: {required},
				address: {required},
				city: {required},
				openTime: {required},
				closeTime: {required},
				capacity: {required, minValue: minValue(1)},
				email: {required, email},
				password: {required, minLength: minLength(6)},
				confirmPassword: {required, sameAsPassword: sameAs('password')}
			}
		},
		
		methods: {
			handleSubmit: function(e) {
				this.$v.$touch();
				if (this.$v.$invalid) return;
				
				this.registerStoreLoading = true;
				this.axios.post('/shops', this.store)
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