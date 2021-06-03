<template>
	<div id="loginForm">
		<v-row justify="center" class="text-center pa-5">
			<v-col cols="6">
				<v-row justify="center" class="text-center pa-5">
					<v-col cols="12">
						<h1>Accedi</h1>
					</v-col>
					<v-col cols="12">
						<form @submit.prevent="handleSubmit" novalidate>
							<v-row>
								<v-col cols="12">
									<v-text-field type="email" v-model="user.email" label="Email" hide-details="auto" outlined></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field type="password" v-model="user.password" label="Password" hide-details="auto" outlined></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-radio-group v-model="user.usertype" hide-details="auto">
										<v-radio value="client" label="Cliente"></v-radio>
										<v-radio value="shop" label="Negozio"></v-radio>
									</v-radio-group>
								</v-col>
								<v-col cols="12">
									<v-btn type="submit" color="primary">Accedi</v-btn>
								</v-col>
							</v-row>
						</form>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
		
		
		
		
		
		
		
		
			<!--<div class="form-item">
				<label for="email" class="form-label">Email</label>
				<input type="email" v-model="user.email" id="email" name="email" :class="{'is-invalid':$v.user.email.$error}">
				<div v-if="$v.user.email.$error" class="invalid-feedback">
					<span v-if="!$v.user.email.required">L'email è obbligatoria</span>
					<span v-if="!$v.user.email.email">L'email non è valida</span>
				</div>
			</div>
			<div class="form-item">
				<label for="password" class="form-label">Password</label>
				<input type="password" v-model="user.password" id="password" name="password" :class="{'is-invalid': $v.user.password.$error}">
				<div v-if="$v.user.password.$error" class="invalid-feedback">
					<span v-if="!$v.user.password.required">La password è obbligatoria</span>
				</div>
			</div>
			<div class="form-item">
				<input type="radio" id="usertype_client" name="usertype" value="client" v-model="user.usertype" :class="{'is-invalid':$v.user.usertype.$error}">
				<label for="usertype_client" class="form-label">Cliente</label>
				<input type="radio" id="usertype_shop" name="usertype" value="shop" v-model="user.usertype" :class="{'is-invalid':$v.user.usertype.$error}">
				<label for="usertype_shop" class="form-label">Negozio</label>
			</div>
			<div class="form-item">
				<button class="form-button">Accedi</button>
			</div>
			<div class="form-item">
				<span class="form-span">Non sei registrato?</span>
				<router-link to="/register" class="form-button">Registrati</router-link>
			</div>-->
		</v-form>
	</div>
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
				}
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