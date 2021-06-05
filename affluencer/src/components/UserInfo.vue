<template>
	<div id="userInfo">
	<v-row justify="center" class="text-center pa-10">
			<v-col sm="8" md="6" lg="4">
				<v-card elevation="5" outlined>
					<v-row justify="center" class="text-center pa-5">
						<v-col cols="10">
							<h1>Accedi</h1>
						</v-col>
						<v-col cols="10">
							
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	
	
	
	
		<!--<h1 class="profile-title">{{ userData.name }}</h1>
		<div v-if="$store.state.config.settings" id="profileSettings">
			<div class="profile-info">
				<input type="text" v-model="userSettings.name" id="nameSettings" name="nameSettings" :placeholder="userData.name" class="profile-input settings-input">
			</div>
			<div class="profile-info">
				<input type="email" v-model="userSettings.email" id="emailSettings" name="emailSettings" :placeholder="userData.email" class="profile-input settings-input" :class="{'is-invalid':$v.userSettings.email.$error}">
				<div v-if="$v.userSettings.email.$error" class="invalid-feedback">
					<span v-if="!$v.userSettings.email.email">L'email non è valida</span>
				</div>
			</div>
			<div class="profile-info">
				<input type="text" v-model="userSettings.city" id="citySettings" name="citySettings" :placeholder="userData.city" class="profile-input settings-input">
			</div>
			<div class="profile-info">
				<button @click="applySettings()" class="profile-button">Salva</button>
			</div>
		</div>
		<div v-else id="profileDescription">
			<div class="profile-info">
				<span>{{ userData.city }}</span>
			</div>
			<div class="profile-info">
				<button @click="openSettings()" class="profile-button">Modifica</button>
			</div>
		</div>-->
	</div>
</template>

<script>
	import {email} from "vuelidate/lib/validators"
	
	export default {
		name: 'userInfo',
		
		props: ['userData'],
		
		data: function() {
			return {
				userSettings: {
					name: '',
					email: '',
					city: ''
				}
			}
		},
		
		created: function() {
			this.$store.commit('disableSettings');
		},
		
		methods: {
			openSettings: function() {
				this.$store.commit('enableSettings');
			},
			
			applySettings: async function() {
				this.$v.$touch();
				if(this.$v.$invalid) return;
				
				this.$store.commit('disableSettings');
				/*for(var key in this.userSettings)
					if(this.userSettings[key] != '')
						this.userData[key] = this.userSettings[key];*/
				//axios
			}
		},
		
		validations: {
			userSettings: {
				email: {email}
			}
		}
	}
</script>