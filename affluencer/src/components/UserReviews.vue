<template>
	<v-row v-if="reviews.length" justify="center" class="text-left pa-5">
		<v-col cols="10">
			<v-card flat>
				<v-card-title>Recensioni</v-card-title>
				<v-list class="pa-0">
					<v-card v-for="review in reviews" :key="review._id" outlined class="mt-2">
						<v-card-title>{{ review.title }}</v-card-title>
						<v-card-subtitle>{{ review.timestamp | date }}</v-card-subtitle>
						<v-card-text>{{ review.text }}</v-card-text>
						<v-card-actions>
							<v-rating :value="review.score" readonly color="yellow"/>
							<v-spacer></v-spacer>
							<v-btn v-if="$store.state.config.settings" @click="removeReview(review._id)" icon>
								<v-icon color="red">mdi-delete</v-icon>
							</v-btn>
						</v-card-actions>
						<v-card v-if="review.comment" flat>
							<v-card-title>Il titolare ha risposto</v-card-title>
							<v-card-text>{{ review.comment }}</v-card-text>
						</v-card>
					</v-card>
				</v-list>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name: 'userReviews',
		
		data: function() {
			return {
				reviews: ''
			}
		},
		
		created: function() {
			this.initializeReviews();
		},
		
		methods: {
			initializeReviews: async function() {
				try {
					var res = await this.axios.get('/reviews', { params: { client_id: $cookies.get('userid') } });
					this.reviews = res.data.reverse();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			removeReview: async function(reviewId) {
				try {
					var res = await this.axios.delete('/reviews/' + reviewId);
					this.initializeReviews();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>