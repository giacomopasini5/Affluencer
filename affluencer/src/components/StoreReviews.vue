<template>
	<v-card flat class="text-left mr-md-10 mt-2">
		<v-card-title v-if="isClient() || (isOwner && latestReview)">Recensioni</v-card-title>
		<v-list class="pa-0">
			<v-list-group v-if="isClient()" v-model="reviewPosted">
				<template v-slot:activator>
					<v-list-item-title>Scrivi una recensione</v-list-item-title>
				</template>
				<v-card outlined class="mt-2">
					<v-text-field v-model="storeReview.title" label="Titolo" hide-details="auto" outlined dense class="ma-5" :error="$v.storeReview.title.$error"
					:rules="!$v.storeReview.title.$error ? [] : [$v.storeReview.title.required || 'Il titolo è obbligatorio']"></v-text-field>
					<v-textarea v-model="storeReview.text" label="Recensione" hide-details="auto" outlined dense auto-grow clearable class="ma-5" :error="$v.storeReview.text.$error"
					:rules="!$v.storeReview.text.$error ? [] : [$v.storeReview.text.required || 'Il testo è obbligatorio']"></v-textarea>
					<v-card-actions>
						<v-input hide-details="auto" :error="$v.storeReview.score.$error"
						:rules="!$v.storeReview.score.$error ? [] : [$v.storeReview.score.minValue || 'Il voto è obbligatorio']">
							<v-rating v-model="storeReview.score" hover clearable color="yellow"/>
						</v-input>
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
				<v-card v-if="latestReview.comment" flat class="text-right">
					<v-card-title class="justify-end">Il titolare ha risposto</v-card-title>
					<v-card-text>{{ latestReview.comment }}</v-card-text>
					<v-card-actions v-if="$store.state.config.settings">
						<v-spacer></v-spacer>
						<v-btn @click="removeComment(latestReview._id)" icon>
							<v-icon color="red">mdi-delete</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
				<v-card v-else-if="isOwner && !$store.state.config.settings" flat>
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
					<v-card v-if="review.comment" flat class="text-right">
						<v-card-title class="justify-end">Il titolare ha risposto</v-card-title>
						<v-card-text>{{ review.comment }}</v-card-text>
						<v-card-actions v-if="$store.state.config.settings">
							<v-spacer></v-spacer>
							<v-btn @click="removeComment(review._id)" icon>
								<v-icon color="red">mdi-delete</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
					<v-card v-else-if="isOwner && !$store.state.config.settings" flat>
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
	import {required, minValue} from 'vuelidate/lib/validators'
	
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
				this.$v.$touch();
        		if (this.$v.$invalid) return;
				
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
				this.$v.$touch();
        		if (this.$v.$invalid) return;
				
				try {
					var res = await this.axios.put('/reviews/' + reviewId, { comment: this.storeComment });
					this.initializeReviews();
					this.storeComment = '';
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			removeComment: async function(reviewId) {
				try {
					var res = await this.axios.put('/reviews/' + reviewId, { comment: '' });
					this.initializeReviews();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		},
		
		validations: {
			storeReview: {
				title: {required},
				text: {required},
				score: {minValue: minValue(1)}
			}
		}
	}
</script>