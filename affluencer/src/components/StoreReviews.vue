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
				<v-card-title>{{ latestReview.text }}</v-card-title>
				<v-card-subtitle>{{ latestReview.timestamp | date }} - Più recente</v-card-subtitle>
				<v-card-text>{{ latestReview.text }}</v-card-text>
				<v-card-actions>
					<v-rating :value="latestReview.score" readonly color="yellow"/>
				</v-card-actions>
				<v-card v-if="latestReview.comments.length">
					<v-card-title>Il titolare ha risposto</v-card-title>
					<v-card-subtitle>{{ latestReview.text }}</v-card-subtitle>
					<v-card-text>{{ latestReview.text }}</v-card-text>
				</v-card>
				<v-card v-else-if="isOwner" flat>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-textarea v-model="storeComment" label="Rispondi alla recensione" rows="1" hide-details="auto" outlined dense auto-grow clearable class="ma-5"></v-textarea>	
						<v-btn @click="postComment" icon>
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
					<v-card-title>{{ review.text }}</v-card-title>
					<v-card-subtitle>{{ review.timestamp | date }}</v-card-subtitle>
					<v-card-text>{{ review.text }}</v-card-text>
					<v-card-actions>
						<v-rating :value="review.score" readonly color="yellow"/>
					</v-card-actions>
					<v-card v-if="review.comments.length">
						<v-card-title>Il titolare ha risposto</v-card-title>
						<v-card-subtitle>{{ latestReview.text }}</v-card-subtitle>
						<v-card-text>{{ latestReview.text }}</v-card-text>
					</v-card>
					<v-card v-else-if="isOwner" flat>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-textarea v-model="storeComment" label="Rispondi alla recensione" rows="1" hide-details="auto" outlined dense auto-grow clearable class="ma-5"></v-textarea>	
							<v-btn @click="postComment" icon>
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
					var res = await this.axios.get('/reviews', { shop_id: this.$route.params.id });
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
					this.reviewPosted = false;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			postComment: async function() {
				/*try {
					var res = await this.axios.post('/reviews/' + this.$route.params.id + '/comments', {
						client_id: this.$route.params.id,
						text: this.storeComment,
					});
					this.initializeReviews();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}*/
			}
		}
	}
</script>