<template>
  <div id="register">
		<div class="form-item" v-if="chooseRegistration">
			<span>Che tipo di profilo vuoi registrare?</span>
			<button class="form-button" @click="setClientRegistration()">Cliente</button>
			<button class="form-button" @click="setStoreRegistration()">Negozio</button>
		</div>
		<registerClient v-else-if="clientRegistration"/>
		<registerStore v-else-if="storeRegistration"/>
  </div>
</template>

<script>
	import registerClient from '@/components/ClientRegistrationForm.vue'
	import registerStore from '@/components/StoreRegistrationForm.vue'
	
	export default {
		name: 'register',
		
		components: {
			registerClient,
			registerStore
		},
		
		data: function() {
      return {
				chooseRegistration: true,
        clientRegistration: false,
				storeRegistration: false
      }
    },
		
		methods: {
			setClientRegistration: function() {
				this.chooseRegistration = false
        this.clientRegistration = true
				this.storeRegistration = false
			},
			
			setStoreRegistration: function() {
				this.chooseRegistration = false
        this.clientRegistration = false
				this.storeRegistration = true
			}
		}
	}
</script>