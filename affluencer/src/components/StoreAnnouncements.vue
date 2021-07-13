<template>
	<v-card flat class="text-left mr-md-10">
		<v-card-title v-if="isOwner || (isClient() && latestPost)">Annunci</v-card-title>
		<v-list class="pa-0">
			<v-list-group v-if="isOwner && !$store.state.config.settings" v-model="announcementPosted">
				<template v-slot:activator>
					<v-list-item-title>Scrivi un annuncio</v-list-item-title>
				</template>
				<v-card outlined class="mt-2">
					<v-text-field v-model="storePost.title" label="Titolo" hide-details="auto" outlined dense class="ma-5" :error="$v.storePost.title.$error"
					:rules="!$v.storePost.title.$error ? [] : [$v.storePost.title.required || 'Il titolo è obbligatorio']"></v-text-field>
					<v-textarea v-model="storePost.text" label="Annuncio" hide-details="auto" outlined dense auto-grow clearable class="ma-5" :error="$v.storePost.text.$error"
					:rules="!$v.storePost.text.$error ? [] : [$v.storePost.text.required || 'Il testo è obbligatorio']"></v-textarea>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn @click="postAnnouncement" icon>
							<v-icon color="primary">mdi-send</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-list-group>
			<v-card v-if="latestPost" outlined class="mt-2">
				<v-card-title>{{ latestPost.title }}</v-card-title>
				<v-card-subtitle>{{ latestPost.timestamp | moment('DD/MM/YYYY HH:mm') }} - Più recente</v-card-subtitle>
				<v-card-text>{{ latestPost.text }}</v-card-text>
				<v-card-actions v-if="$store.state.config.settings">
					<v-spacer></v-spacer>
					<v-btn @click="removeAnnouncement(latestPost._id)" icon>
						<v-icon color="red">mdi-delete</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
			<v-list-group v-if="otherPosts.length" class="mt-2">
				<template v-slot:activator>
					<v-list-item-title>Mostra più annunci</v-list-item-title>
				</template>
				<v-card v-for="post in otherPosts" :key="post._id" outlined class="mt-2">
					<v-card-title>{{ post.title }}</v-card-title>
					<v-card-subtitle>{{ post.timestamp | moment('DD/MM/YYYY HH:mm') }}</v-card-subtitle>
					<v-card-text>{{ post.text }}</v-card-text>
					<v-card-actions v-if="$store.state.config.settings">
						<v-spacer></v-spacer>
						<v-btn @click="removeAnnouncement(post._id)" icon>
							<v-icon color="red">mdi-delete</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-list-group>
		</v-list>
	</v-card>
</template>

<script>
	import {required} from 'vuelidate/lib/validators'
	
	export default {
		name: 'storeAnnouncements',
		
		data: function() {
			return {
				latestPost: '',
				otherPosts: '',
				storePost: {
					title: '',
					text: ''
				},
				announcementPosted: false
			}
		},
		
		created: function() {
			this.initializeAnnouncements();
		},
		
		methods: {
			initializeAnnouncements: async function() {
				try {
					var res = await this.axios.get('/shops/' + this.$route.params.id + '/posts');
					this.latestPost = res.data[res.data.length - 1];
					this.otherPosts = res.data;
					this.otherPosts.pop();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			postAnnouncement: async function() {
				this.$v.$touch();
        		if (this.$v.$invalid) return;
				
				try {
					var res = await this.axios.post('/shops/' + this.$route.params.id + '/posts', this.storePost);
					this.initializeAnnouncements();
					this.storePost.title = '';
					this.storePost.text = '';
					this.announcementPosted = false;
					this.$v.$reset();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			removeAnnouncement: async function(postId) {
				try {
					var res = await this.axios.delete('/shops/' + this.$route.params.id + '/posts/' + postId);
					this.initializeAnnouncements();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},

			

		},
		
		validations: {
			storePost: {
				title: {required},
				text: {required}
			}
		}
	}
</script>