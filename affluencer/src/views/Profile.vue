<template>
	<v-row v-if="hasUserData" justify="center" class="text-center pa-10">
		<v-col md="10" lg="8">
			<v-card elevation="5" outlined>
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
			}
		}
	}
</script>