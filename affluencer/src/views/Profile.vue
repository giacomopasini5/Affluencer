<template>
	<v-row v-if="hasUserData" justify="center" class="text-center pa-10">
		<v-col cols="10" md="8" lg="6">
			<v-card elevation="5">
				<v-btn fab fixed top right @click="$store.commit('toggleSettings')" color="primary" class="mt-12">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
				<userInfo :userData="userData"/>
				<userFavoriteStores/>
				<userReviews/>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import userInfo from '@/components/UserInfo.vue'
	import userFavoriteStores from '@/components/UserFavoriteStores.vue'
	import userReviews from '@/components/UserReviews.vue'
	
	export default {
		name: 'profile',
		
		components: {
			userInfo,
			userFavoriteStores,
			userReviews
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
			}
		}
	}
</script>