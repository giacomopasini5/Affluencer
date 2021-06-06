<template>
	<v-row v-if="hasUserData" justify="center" class="text-center pa-10">
		<v-col sm="10" md="8" lg="6">
			<v-card elevation="5">
				<v-btn fab absolute top right @click="toggleSettings" color="primary" class="mt-10">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
				<userInfo :userData="userData"/>
				<favoriteStoresList :favoriteStores="userData.favorite_shops"/>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import userInfo from '@/components/UserInfo.vue'
	import favoriteStoresList from '@/components/FavoriteStoresList.vue'
	
	export default {
		name: 'profile',
		
		components: {
			userInfo,
			favoriteStoresList
		},
		
		data: function() {
			return {
				userData: '',
				hasUserData: false
			}
		},
		
		created: function() {
			this.initializeProfile();
			this.$store.commit('disableSettings');
		},
		
		methods: {
			initializeProfile: async function() {
				try {
					var res = await this.axios.get('/clients/' + $cookies.get('userid'));
					this.userData = res.data;
					this.hasUserData = true;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			toggleSettings: function() {
				this.$store.state.config.settings ? this.$store.commit('disableSettings') : this.$store.commit('enableSettings');
			}
		}
	}
</script>