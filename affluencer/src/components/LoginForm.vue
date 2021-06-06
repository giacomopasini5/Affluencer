<template>
	<v-card :loading="loginLoading "elevation="5">
		<v-row justify="center" class="text-center pa-5">
			<v-col cols="10">
				<h1>Accedi</h1>
			</v-col>
			<v-col cols="10">
				<form @submit.prevent="handleSubmit" novalidate>
					<v-row justify="center">
						<v-col cols="10">
							<v-text-field type="email" v-model="user.email" label="Email" hide-details="auto" outlined dense :error="$v.user.email.$error"
							:rules="!$v.user.email.$error ? [] : [$v.user.email.required || 'L\'email è obbligatoria', $v.user.email.email || 'L\'email non è valida']"></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-text-field type="password" v-model="user.password" label="Password" hide-details="auto" outlined dense :error="$v.user.password.$error"
							:rules="!$v.user.password.$error ? [] : [$v.user.password.required || 'La password è obbligatoria']"></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-radio-group v-model="user.usertype" hide-details="auto" :error="$v.user.usertype.$error"
							:rules="!$v.user.usertype.$error ? [] : [$v.user.usertype.required || 'Il tipo di utente è obbligatorio']">
								<v-radio value="client" label="Cliente" class="pa-1"></v-radio>
								<v-radio value="shop" label="Negozio" class="pa-1"></v-radio>
							</v-radio-group>
						</v-col>
						<v-col cols="10">
							<v-btn type="submit" color="primary" :disabled="loginLoading">Accedi</v-btn>
						</v-col>
						<v-col cols="10">
							<h2>Non sei registrato?</h2>
						</v-col>
						<v-col cols="10">
							<v-btn to="/register" color="primary" :disabled="loginLoading">Registrati</v-btn>
						</v-col>
					</v-row>
				</form>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
	import {required, email} from "vuelidate/lib/validators"
	
	export default {
		name: 'loginForm',
		
		data: function() {
			return {
        		user: {	
					email: '',
					password: '',
					usertype: ''
				},
				loginLoading: false
      		}
    	},
		
		validations: {
			user: {
				email: {required, email},
				password: {required},
				usertype: {required}
			}
		},
		
		methods: {
			handleSubmit: function(e) {
        		this.$v.$touch();
        		if (this.$v.$invalid) return;
        		
				this.loginLoading = true;
				this.axios.post('/login', this.user)
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