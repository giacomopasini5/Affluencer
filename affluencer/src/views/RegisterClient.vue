<template>
  <div id="registerClient">
    <h1>Registrati</h1>
      <form @submit.prevent="handleSubmit" novalidate>
        <div class="form-item">
					<label for="name">Nome</label>
					<input type="text" v-model="client.name" id="name" name="name" :class="{'is-invalid': $v.client.name.$error}">
					<div v-if="$v.client.name.$error" class="invalid-feedback">
						<span v-if="!$v.client.name.required">Il nome è obbligatorio</span>
					</div>
        </div>
        <div class="form-item">
          <label for="city">Città</label>
          <input type="text" v-model="client.city" id="city" name="city" :class="{'is-invalid': $v.client.city.$error}">
          <div v-if="$v.client.city.$error" class="invalid-feedback">
						<span v-if="!$v.client.city.required">La città è obbligatoria</span>
					</div>
        </div>
        <div class="form-item">
          <label for="email">Email</label>
          <input type="email" v-model="client.email" id="email" name="email" :class="{'is-invalid':$v.client.email.$error}">
          <div v-if="$v.client.email.$error" class="invalid-feedback">
						<span v-if="!$v.client.email.required">L'email è obbligatoria</span>
						<span v-if="!$v.client.email.email">L'email non è valida</span>
          </div>
        </div>
        <div class="form-item">
          <label for="password">Password</label>
          <input type="password" v-model="client.password" id="password" name="password" :class="{'is-invalid': $v.client.password.$error}">
          <div v-if="$v.client.password.$error" class="invalid-feedback">
						<span v-if="!$v.client.password.required">La password è obbligatoria</span>
						<span v-if="!$v.client.password.minLength">La password deve essere di almeno 6 caratteri</span>
          </div>
        </div>
        <div class="form-item">
          <label for="confirmPassword">Conferma Password</label>
          <input type="password" v-model="client.confirmPassword" id="confirmPassword" name="confirmPassword" :class="{ 'is-invalid': $v.client.confirmPassword.$error}">
          <div v-if="$v.client.confirmPassword.$error" class="invalid-feedback">
            <span v-if="!$v.client.confirmPassword.required">La conferma password è obbligatoria</span>
            <span v-else-if="!$v.client.confirmPassword.sameAsPassword">Le password devono corrispondere</span>
          </div>
        </div>
        <div class="form-item">
          <button>Registrati</button>
        </div>
      </form>
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
				}
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
        this.$v.$touch()
        if (this.$v.$invalid) return
        alert("SUCCESS")
      }
    }
	}
</script>