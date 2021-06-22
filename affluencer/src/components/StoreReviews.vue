<template>
	<v-card v-if="!$store.state.config.settings" flat class="text-left mr-md-10 mt-2">
		<v-list class="pa-0">
			<v-list-group v-if="isClient()" v-model="writeReview">
				<template v-slot:activator>
					<v-list-item-title>Scrivi una recensione</v-list-item-title>
				</template>
				<v-card outlined class="mt-2">
					<v-textarea v-model="storeReview.text" label="Recensione" rows="1" hide-details="auto" outlined dense auto-grow clearable class="ma-5"></v-textarea>
					<v-card-actions>
						<v-btn @click="postReview" icon>
							<v-icon color="primary">mdi-send</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-list-group>
			<v-card v-if="reviews.length" outlined class="mt-2">
				<v-card-text>{{ latestReview.text }}</v-card-text>
			</v-card>
			<v-list-group v-if="reviews.length" class="mt-2">
				<template v-slot:activator>
					<v-list-item-title>Mostra più recensioni</v-list-item-title>
				</template>
				<v-card v-for="review in otherReviews" :key="review._id" outlined class="mt-2">
					<v-card-text>{{ review.text }}</v-card-text>
				</v-card>
			</v-list-group>
		</v-list>
	</v-card>
</template>

<script>
	export default {
		name: 'storeReviews',
		
		data: function() {
			return {
				reviews: '',
				writeReview: false,
				latestReview: '',
				otherReviews: '',
				storeReview: {
					text: '',
					score: ''
				}
			}
		},
		
		created: function() {
			this.initializeReviews();
		},
		
		methods: {
			initializeReviews: async function() {
				try {
					var res = await this.axios.get('/reviews', { shop_id: this.$route.params.id });
					this.reviews = res.data;
					this.formatReviews();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			formatReviews: function() {
				this.latestReview = this.reviews[0];
				this.otherReviews = this.reviews;
				this.otherReviews.shift();
			},
			
			postReview: async function() {
				/*try {
					var res = await this.axios.post('/reviews', {
						client_id: ,
						shop_id: this.$route.params.id,
						text: this.storeReview.text,
						score: this.storeReview.score
					});
					this.writeReview = false;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}*/
			}
		}
	}
</script>