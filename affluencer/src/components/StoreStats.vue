<template>
	<v-row justify="center" class="pa-5">
		<v-col cols="12">
			<weekHistogram :chart-data="this.weekHistogramData"/>
		</v-col>
		<v-col cols="12">
			
		</v-col>
	</v-row>
</template>

<script>
	import weekHistogram from '@/components/WeekHistogram.vue'
	
	export default {
		name: 'storeStats',
		
		components: {
			weekHistogram
		},
		
		data: function() {
			return {
				weekHistogramData: {
					labels: [],
					datasets: []
				},
				reservationsData: '',
				sensorData: '',
				signaledData: ''
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
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			initializeSignaledData: async function() {
				try {
					var res = await this.axios.get('/communications', { params: { shop_id: this.$route.params.id } });
					this.signaledData = res.data;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			initializeReservationsData: async function() {
				try {
					var res = await this.axios.get('/reservations', { params: { shop_id: this.$route.params.id } });
					this.reservationsData = res.data;
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>