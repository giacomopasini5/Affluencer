<template>
	<v-row v-if="hasChartData" justify="center" class="pa-5">
		<v-col cols="12">
			<dayHistogram :chart-data="dayHistogramData"/>
		</v-col>
		<v-col cols="12">
			<weekHistogram :chart-data="weekHistogramData"/>
		</v-col>
	</v-row>
</template>

<script>
	import dayHistogram from '@/components/DayHistogram.vue'
	import weekHistogram from '@/components/WeekHistogram.vue'
	
	export default {
		name: 'storeStats',
		
		components: {
			dayHistogram,
			weekHistogram
		},
		
		data: function() {
			return {
				dayHistogramData: {
					labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
					datasets: [
						{
							label: 'Persone all\'interno',
							backgroundColor: 'red',
							data: []
						},
						
						{
							label: 'Persone all\'esterno',
							backgroundColor: 'blue',
							data: []
						}
					]
				},
				weekHistogramData: {
					labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
					datasets: [
						{
							label: 'Affluenza',
							backgroundColor: 'red',
							data: []
						}
					]
				},
				sensorData: '',
				signaledData: '',
				reservationsData: '',
				hasChartData: false
			}
		},
		
		created: function() {
			this.initializeData();
		},
		
		methods: {
			initializeData: async function() {
				await this.initializeSensorData();
				await this.initializeSignaledData();
				await this.initializeReservationsData();
				this.initializeDayHistogramData();
				this.initializeWeekHistogramData();
				this.hasChartData = true;
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
			},
			
			initializeDayHistogramData: function() {
				var dayData = [];
				var startOfDay = this.$moment().startOf('day');
				for(var sd of this.sensorData) {
					console.log(sd.timestamp);
					//if(this.$moment(sd.timestamp).isAfter(startOfDay))
						
				}
			},
			
			initializeWeekHistogramData: function() {
				
			},
			
			isSameDay: function(timestamp) {
				var now = new Date();
				return (now.getFullYear() == timestamp.getFullYear()
					&& now.getMonth() == timestamp.getMonth()
					&& now.getDate() == timestamp.getDate());
			}
		}
	}
</script>