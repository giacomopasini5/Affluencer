<template>
	<v-card v-if="!$store.state.config.settings" flat class="text-left mr-md-10">
		<v-list class="pa-0">
			<v-list-group v-if="isOwner" v-model="writePost">
				<template v-slot:activator>
					<v-list-item-title>Scrivi un annuncio</v-list-item-title>
				</template>
				<v-card outlined class="mt-2">
					<v-text-field v-model="storePost.title" label="Titolo" hide-details="auto" outlined dense class="ma-5"></v-text-field>
					<v-textarea v-model="storePost.text" label="Annuncio" hide-details="auto" outlined dense auto-grow clearable class="ma-5"></v-textarea>
					<v-card-actions>
						<v-btn @click="postAnnouncement" icon>
							<v-icon color="primary">mdi-send</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-list-group>
			<v-card v-if="announcements.length" outlined class="mt-2">
				<v-card-title>{{ latestPost.title }}</v-card-title>
				<v-card-subtitle>{{ latestPost.timestamp }}</v-card-subtitle>
				<v-card-text>{{ latestPost.text }}</v-card-text>
				<v-card-actions v-if="isOwner">
					<v-btn @click="removeAnnouncement(latestPost)" icon>
						<v-icon color="red">mdi-delete</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
			<v-list-group v-if="announcements.length" class="mt-2">
				<template v-slot:activator>
					<v-list-item-title>Mostra più annunci</v-list-item-title>
				</template>
				<v-card v-for="post in otherPosts" :key="post._id" outlined class="mt-2">
					<v-card-title>{{ post.title }}</v-card-title>
					<v-card-subtitle>{{ post.timestamp }}</v-card-subtitle>
					<v-card-text>{{ post.text }}</v-card-text>
					<v-card-actions v-if="isOwner">
						<v-btn @click="removeAnnouncement(post)" icon>
							<v-icon color="red">mdi-delete</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-list-group>
		</v-list>
	</v-card>
</template>

<script>
	export default {
		name: 'storeAnnouncements',
		
		props: ['announcements'],
		
		data: function() {
			return {
				writePost: false,
				latestPost: '',
				otherPosts: '',
				storePost: {
					title: '',
					text: ''
				}
			}
		},
		
		created: function() {
			this.formatAnnouncements();
		},
		
		methods: {
			formatAnnouncements: function() {
				this.latestPost = this.announcements[0];
				this.otherPosts = this.announcements;
				this.otherPosts.shift();
			},
			
			postAnnouncement: async function() {
				try {
					var res = await this.axios.post('/shops/' + this.$route.params.id + '/posts', this.storePost);
					this.writePost = false;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			removeAnnouncement: async function(post) {
				try {
					var res = await this.axios.delete('/shops/' + this.$route.params.id + '/posts/' + post._id);
					var index = this.announcements.indexOf(post);
					this.announcements.splice(index, 1);
					this.formatAnnouncements();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>