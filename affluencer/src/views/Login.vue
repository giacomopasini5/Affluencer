<template>
  <div id="login">
    LOGIN
  </div>
</template>

<script>
	import {required, email} from "vuelidate/lib/validators"
	
	export default {
		name: 'login',
		
		validations: {
			user: {
				email: {required, email},
				password: {required}
			}
		}
	}
</script>