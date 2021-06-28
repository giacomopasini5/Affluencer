<template>
	
</template>

<script>
	export default {
		name: 'storeStats',
		
		data: function() {
			return {
				sensorData: '',
				signaledData: '',
				reservationsData: ''
			}
		},
		
		created: function() {
			this.initializeData();
		},
		
		methods: {
			initializeData: function() {
				this.initializeSensorData();
				this.initializeSignaledData();
				this.initializeReservationsData();
			},
			
			initializeSensorData: async function() {
				try {
					var res = await this.axios.get('/sensors', { params: { shop_id: this.$route.params.id } });
					this.sensorData = res.data;
					console.log(this.sensorData);
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			initializeSignaledData: async function() {
				try {
					var res = await this.axios.get('/communications', { params: { shop_id: this.$route.params.id } });
					this.signaledData = res.data;
					console.log(this.signaledData);
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			initializeReservationsData: async function() {
				try {
					var res = await this.axios.get('/reservations', { params: { shop_id: this.$route.params.id } });
					this.reservationsData = res.data;
					console.log(this.reservationsData);
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>