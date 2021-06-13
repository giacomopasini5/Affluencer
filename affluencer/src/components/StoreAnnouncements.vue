<template>
	<v-card outlined class="mr-5">
		<v-textarea v-if="isOwner && !$store.state.config.settings" v-model="announcementText" label="Scrivi un annuncio" rows="1" hide-details="auto" outlined dense auto-grow clearable class="pa-5"></v-textarea>
		
	</v-card>
</template>

<script>
	export default {
		name: 'storeAnnouncements',
		
		props: ['announcements'],
		
		data: function() {
			return {
				announcementText: ''
			}
		}
	}
</script>