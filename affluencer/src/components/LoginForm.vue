<template>
	<div id="loginForm">
		<h1>Accedi</h1>
		<form @submit.prevent="handleSubmit" novalidate>
			<div class="form-item">
				<label for="email">Email</label>
				<input type="email" v-model="user.email" id="email" name="email" :class="{'is-invalid':$v.user.email.$error}">
				<div v-if="$v.user.email.$error" class="invalid-feedback">
					<span v-if="!$v.user.email.required">L'email è obbligatoria</span>
					<span v-if="!$v.user.email.email">L'email non è valida</span>
				</div>
			</div>
			<div class="form-item">
				<label for="password">Password</label>
				<input type="password" v-model="user.password" id="password" name="password" :class="{'is-invalid': $v.user.password.$error}">
				<div v-if="$v.user.password.$error" class="invalid-feedback">
					<span v-if="!$v.user.password.required">La password è obbligatoria</span>
				</div>
			</div>
			<div class="form-item">
			<button class="form-button">Accedi</button>
			</div>
			<div class="form-item">
				<span>Non sei registrato?</span>
				<router-link to="/register" class="form-button">Registrati</router-link>
			</div>
		</form>
	</div>
</template>

<script>
	import {required, email} from "vuelidate/lib/validators"
	
	export default {
		name: 'loginForm',
		
		data: function() {
      return {
        user: {
					name: '',
					password: ''
				}
      }
    },
		
		validations: {
			user: {
				email: {required, email},
				password: {required}
			}
		},
		
		methods: {
      handleSubmit: function(e) {
        this.$v.$touch()
        if (this.$v.$invalid) return
        alert("SUCCESS")
      }
    }
	}
</script>

<style>
	@import '../styles/loginForm.css'
</style>