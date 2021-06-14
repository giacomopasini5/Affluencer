<template>
	<v-card v-if="!$store.state.config.settings" outlined class="text-left mr-10">
		<v-card v-if="isOwner" outlined class="ma-5">
			<v-card-title>Scrivi un annuncio</v-card-title>
			<v-text-field label="Titolo" hide-details="auto" outlined dense class="ma-5"></v-text-field>
			<v-textarea v-model="announcementText" label="Annuncio" rows="1" hide-details="auto" outlined dense auto-grow clearable class="ma-5"></v-textarea>
			<v-card-actions>
				<v-btn @click="" icon>
					<v-icon color="primary">mdi-send</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
		<v-card outlined class="ma-5">
			<v-card-title>{{ latestPost.title }}</v-card-title>
			<v-card-subtitle>{{ latestPost.datetime }}</v-card-subtitle>
			<v-card-text>{{ latestPost.text }}</v-card-text>
			<v-card-actions v-if="isOwner">
				<v-btn @click="removeAnnouncement(latestPost)" icon>
					<v-icon color="red">mdi-delete</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
		<v-list outlined class="pa-0 ma-5">
			<v-list-group>
				<template v-slot:activator>
					<v-list-item-title>Mostra più annunci</v-list-item-title>
				</template>
				<v-card v-for="post in otherPosts" :key="post.datetime" outlined class="ma-5 text-left">
					<v-card-title>{{ post.title }}</v-card-title>
					<v-card-subtitle>{{ post.datetime }}</v-card-subtitle>
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
				latestPost: '',
				otherPosts: '',
				announcementText: ''
			}
		},
		
		created: function() {
			this.initializeAnnouncements();
		},
		
		methods: {
			initializeAnnouncements: function() {
				this.latestPost = this.announcements[0];
				this.otherPosts = this.announcements;
				this.otherPosts.shift();
			},
			
			removeAnnouncement: async function(post) {
				try {
					var res = await this.axios.delete('/shops/' + this.$route.params.id + '/posts/' + post.datetime);
					var index = this.announcements.indexOf(post);
					this.announcements.splice(index, 1);
					this.initializeAnnouncements();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>