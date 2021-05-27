<template>
  <div id="registerStore">
    <h1 class="form-title">Registrazione Negozio</h1>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-item">
				<label for="name" class="form-label">Nome</label>
				<input type="text" v-model="store.name" id="name" name="name" :class="{'is-invalid': $v.store.name.$error}">
				<div v-if="$v.store.name.$error" class="invalid-feedback">
					<span v-if="!$v.store.name.required" class="">Il nome è obbligatorio</span>
				</div>
      </div>
			<div class="form-item">
        <label for="address" class="form-label">Indirizzo</label>
        <input type="text" v-model="store.address" id="address" name="address" :class="{'is-invalid': $v.store.address.$error}">
        <div v-if="$v.store.address.$error" class="invalid-feedback">
					<span v-if="!$v.store.address.required">L'indirizzo è obbligatorio</span>
				</div>
      </div>
			<div class="form-item">
        <label for="city" class="form-label">Città</label>
        <input type="text" v-model="store.city" id="city" name="city" :class="{'is-invalid': $v.store.city.$error}">
        <div v-if="$v.store.city.$error" class="invalid-feedback">
					<span v-if="!$v.store.city.required">La città è obbligatoria</span>
				</div>
      </div>
			<div class="form-item">
        <label for="capacity" class="form-label">Capienza</label>
        <input type="number" v-model="store.capacity" id="capacity" name="capacity" :class="{'is-invalid': $v.store.capacity.$error}">
        <div v-if="$v.store.capacity.$error" class="invalid-feedback">
					<span v-if="!$v.store.capacity.required">La capienza è obbligatoria</span>
					<span v-if="!$v.store.capacity.minValue">La capienza deve essere maggiore di 0</span>
        </div>
      </div>
			<div class="form-item">
        <label for="openTime" class="form-label">Orario di apertura</label>
        <input type="time" v-model="store.openTime" id="openTime" name="openTime" :class="{'is-invalid': $v.store.openTime.$error}">
        <div v-if="$v.store.openTime.$error" class="invalid-feedback">
					<span v-if="!$v.store.openTime.required">L'orario di apertura è obbligatorio</span>
        </div>
      </div>
      <div class="form-item">
        <label for="closeTime" class="form-label">Orario di chiusura</label>
        <input type="time" v-model="store.closeTime" id="closeTime" name="closeTime" :class="{'is-invalid': $v.store.closeTime.$error}">
        <div v-if="$v.store.closeTime.$error" class="invalid-feedback">
					<span v-if="!$v.store.closeTime.required">L'orario di chiusura è obbligatorio</span>
        </div>
      </div>
      <div class="form-item">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="store.email" id="email" name="email" :class="{'is-invalid':$v.store.email.$error}">
        <div v-if="$v.store.email.$error" class="invalid-feedback">
					<span v-if="!$v.store.email.required">L'email è obbligatoria</span>
					<span v-if="!$v.store.email.email">L'email non è valida</span>
        </div>
      </div>
      <div class="form-item">
        <label for="password" class="form-label">Password</label>
        <input type="password" v-model="store.password" id="password" name="password" :class="{'is-invalid': $v.store.password.$error}">
        <div v-if="$v.store.password.$error" class="invalid-feedback">
					<span v-if="!$v.store.password.required">La password è obbligatoria</span>
					<span v-if="!$v.store.password.minLength">La password deve essere di almeno 6 caratteri</span>
        </div>
      </div>
      <div class="form-item">
        <label for="confirmPassword" class="form-label">Conferma password</label>
        <input type="password" v-model="store.confirmPassword" id="confirmPassword" name="confirmPassword" :class="{ 'is-invalid': $v.store.confirmPassword.$error}">
        <div v-if="$v.store.confirmPassword.$error" class="invalid-feedback">
          <span v-if="!$v.store.confirmPassword.required">La conferma password è obbligatoria</span>
          <span v-else-if="!$v.store.confirmPassword.sameAsPassword">Le password devono corrispondere</span>
        </div>
      </div>
      <div class="form-item">
        <button class="form-button">Registrati</button>
      </div>
    </form>
  </div>
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
					capacity: '',
					openTime: '',
					closeTime: '',
					email: '',
					password: '',
					confirmPassword: ''
				}
			}
		},
		
		validations: {
			store: {
				name: {required},
				address: {required},
				city: {required},
				capacity: {required, minValue: minValue(1)},
				openTime: {required},
				closeTime: {required},
				email: {required, email},
				password: {required, minLength: minLength(6)},
				confirmPassword: {required, sameAsPassword: sameAs('password')}
			}
		},
		
		methods: {
			handleSubmit: function(e) {
				this.$v.$touch()
				if (this.$v.$invalid) return
		
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

<style>
	@import '../styles/loginForm.css'
</style>