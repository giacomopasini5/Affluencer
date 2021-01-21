<template>
  <div id="register">
    REGISTER
  </div>
</template>

<script>
	import {required, email, minLength, sameAs} from "vuelidate/lib/validators"
	
	export default {
		name: 'register',
		
		validations: {
			client: {
				name: {required, minLength: minLength(4)},
				city: {required},
				email: {required, email},
				password: {required, minLength: minLength(6)},
        confirmPassword: {required, sameAsPassword: sameAs('password')}
			},
			
			store: {
				name: {required, minLength: minLength(4)},
				address: {required},
				city: {required},
				email: {required, email},
				password: {required, minLength: minLength(6)},
        confirmPassword: {required, sameAsPassword: sameAs('password')}
			}
		}
</script>