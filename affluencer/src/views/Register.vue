<template>
	<v-row justify="center" class="text-center pa-10">
		<v-col sm="8" md="6" lg="4">
			<v-card v-if="chooseRegistration" elevation="5">
				<v-row justify="center" class="text-center pa-5">
					<v-col cols="10">
						<span class="text-h4">Scegli il profilo</span>
					</v-col>
					<v-col cols="5">
						<v-btn @click.native="setClientRegistration" color="primary">Cliente</v-btn>
					</v-col>
					<v-col cols="5">
						<v-btn @click.native="setStoreRegistration" color="primary">Negozio</v-btn>
					</v-col>
				</v-row>
			</v-card>
			<registerClient v-else-if="clientRegistration"/>
			<registerStore v-else-if="storeRegistration"/>
		</v-col>
	</v-row>
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