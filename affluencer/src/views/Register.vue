<template>
	<div id="register">
		<v-row justify="center" class="text-center pa-10" v-if="chooseRegistration">
			<v-col sm="8" md="6" lg="4">
				<v-row class="form-container text-center pa-5">
					<v-col cols="12">
						<h1>Scegli il profilo</h1>
					</v-col>
					<v-col cols="6">
						<v-btn @click.native="setClientRegistration" color="primary">Cliente</v-btn>
					</v-col>
					<v-col cols="6">
						<v-btn @click.native="setStoreRegistration" color="primary">Negozio</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
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
				this.chooseRegistration = false;
				this.clientRegistration = true;
				this.storeRegistration = false;
			},
			
			setStoreRegistration: function() {
				this.chooseRegistration = false;
				this.clientRegistration = false;
				this.storeRegistration = true;
			}
		}
	}
</script>

<style>
	@import "../styles/loginForm.css";
</style>