<template>
	<v-card v-if="!$store.state.config.settings" flat class="text-left mr-md-10 mt-2">
		<v-card-title v-if="isClient() || (isOwner && latestReview)">Recensioni</v-card-title>
		<v-list class="pa-0">
			<v-list-group v-if="isClient()" v-model="reviewPosted">
				<template v-slot:activator>
					<v-list-item-title>Scrivi una recensione</v-list-item-title>
				</template>
				<v-card outlined class="mt-2">
					<v-text-field v-model="storeReview.title" label="Titolo" hide-details="auto" outlined dense class="ma-5"></v-text-field>
					<v-textarea v-model="storeReview.text" label="Recensione" hide-details="auto" outlined dense auto-grow clearable class="ma-5"></v-textarea>
					<v-card-actions>
						<v-rating v-model="storeReview.score" hover clearable color="yellow"/>
						<v-spacer></v-spacer>
						<v-btn @click="postReview" icon>
							<v-icon color="primary">mdi-send</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-list-group>
			<v-card v-if="latestReview" outlined class="mt-2">
				<v-card-title>{{ latestReview.title }}</v-card-title>
				<v-card-subtitle>{{ latestReview.timestamp | date }} - Più recente</v-card-subtitle>
				<v-card-text>{{ latestReview.text }}</v-card-text>
				<v-card-actions>
					<v-rating :value="latestReview.score" readonly color="yellow"/>
				</v-card-actions>
				<v-card v-if="latestReview.comment" flat>
					<v-card-title>Il titolare ha risposto</v-card-title>
					<v-card-text>{{ latestReview.comment }}</v-card-text>
				</v-card>
				<v-card v-else-if="isOwner" flat>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-textarea v-model="storeComment" label="Rispondi alla recensione" rows="1" hide-details="auto" outlined dense auto-grow clearable class="ma-5"></v-textarea>	
						<v-btn @click="postComment(latestReview._id)" icon>
							<v-icon color="primary">mdi-send</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-card>
			<v-list-group v-if="otherReviews.length" class="mt-2">
				<template v-slot:activator>
					<v-list-item-title>Mostra più recensioni</v-list-item-title>
				</template>
				<v-card v-for="review in otherReviews" :key="review._id" outlined class="mt-2">
					<v-card-title>{{ review.title }}</v-card-title>
					<v-card-subtitle>{{ review.timestamp | date }}</v-card-subtitle>
					<v-card-text>{{ review.text }}</v-card-text>
					<v-card-actions>
						<v-rating :value="review.score" readonly color="yellow"/>
					</v-card-actions>
					<v-card v-if="review.comment" flat>
						<v-card-title>Il titolare ha risposto</v-card-title>
						<v-card-text>{{ review.comment }}</v-card-text>
					</v-card>
					<v-card v-else-if="isOwner" flat>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-textarea v-model="storeComment" label="Rispondi alla recensione" rows="1" hide-details="auto" outlined dense auto-grow clearable class="ma-5"></v-textarea>	
							<v-btn @click="postComment(review._id)" icon>
								<v-icon color="primary">mdi-send</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
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
				latestReview: '',
				otherReviews: '',
				storeReview: {
					title: '',
					text: '',
					score: 0
				},
				storeComment: '',
				reviewPosted: false
			}
		},
		
		created: function() {
			this.initializeReviews();
		},
		
		methods: {
			initializeReviews: async function() {
				try {
					var res = await this.axios.get('/reviews', { params: { shop_id: this.$route.params.id } });
					this.latestReview = res.data[res.data.length - 1];
					this.otherReviews = res.data;
					this.otherReviews.pop();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			postReview: async function() {
				try {
					var res = await this.axios.post('/reviews', {
						client_id: $cookies.get('userid'),
						shop_id: this.$route.params.id,
						title: this.storeReview.title,
						text: this.storeReview.text,
						score: this.storeReview.score
					});
					this.initializeReviews();
					this.storeReview.title = '';
					this.storeReview.text = '';
					this.storeReview.score = 0;
					this.reviewPosted = false;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			postComment: async function(reviewId) {
				try {
					var res = await this.axios.put('/reviews/' + reviewId, { comment: this.storeComment });
					this.initializeReviews();
					this.storeComment = '';
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>