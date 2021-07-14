<template>
	<v-row v-if="hasChartData" justify="center" class="pa-5">
		<v-col cols="12">
			<dayHistogram :chart-data="dayHistogramData"/>
		</v-col>
		<v-col cols="12" md="6">
			<affluenceLineChart :chart-data="affluenceLineChartData"/>
		</v-col>
		<v-col cols="12" md="6">
			<reservationsHistogram :chart-data="reservationsHistogramData"/>
		</v-col>
	</v-row>
</template>

<script>
	import dayHistogram from '@/components/DayHistogram.vue'
	import reservationsHistogram from '@/components/ReservationsHistogram.vue'
	import affluenceLineChart from '@/components/AffluenceLineChart.vue'
	
	export default {
		name: 'storeStats',
		
		components: {
			dayHistogram,
			reservationsHistogram,
			affluenceLineChart
		},
		
		data: function() {
			return {
				dayHistogramData: {
					labels: ['00', '01', '02', '03', '04', '05', '06', '07',
						'08', '09', '10', '11', '12', '13', '14', '15',
						'16', '17', '18', '19', '20', '21', '22', '23'],
					datasets: [
						{
							label: 'Interno (' + this.$moment().format('DD/MM') + ')',
							backgroundColor: 'rgba(255, 0, 0, 0.8)',
							borderColor: 'rgba(255, 0, 0, 0.8)',
							data: [0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0]
						},
						{
							label: 'In coda (' + this.$moment().format('DD/MM') + ')',
							backgroundColor: 'rgba(0, 0, 255, 0.8)',
							borderColor: 'rgba(0, 0, 255, 0.8)',
							data: [0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0]
						}
					]
				},
				reservationsHistogramData: {
					labels: ['00', '01', '02', '03', '04', '05', '06', '07',
						'08', '09', '10', '11', '12', '13', '14', '15',
						'16', '17', '18', '19', '20', '21', '22', '23'],
					datasets: [
						{
							label: 'Prenotazioni (> ' + this.$moment().startOf('h').add(1, 'h').format('DD/MM HH:mm') + ')',
							backgroundColor: 'rgba(255, 0, 0, 0.8)',
							borderColor: 'rgba(255, 0, 0, 0.8)',
							data: [0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0,
								0, 0, 0, 0, 0, 0, 0, 0]
						}
					]
				},
				affluenceLineChartData: {
					labels: [],
					datasets: [
						{
							label: 'Affluenza (' + this.$moment().startOf('w').subtract(1, 'w').format('ddd DD/MM') + ' - ' +
								this.$moment().startOf('w').subtract(1, 'd').format('ddd DD/MM') + ')',
							backgroundColor: 'rgba(255, 0, 0, 0.8)',
							borderColor: 'rgba(255, 0, 0, 0.8)',
							fill: false,
							data: [0, 0, 0, 0, 0, 0, 0]
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
				this.initializeReservationsHistogramData();
				this.initializeAffluenceLineChartData();
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
				var dayDataInside = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
					[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
					[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
				var dayDataOutside = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
					[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
					[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
				var now = this.$moment();
				
				for(var sensor of this.sensorData) {
					var date = this.$moment(sensor.timestamp);
					var index = date.hours();
					if(date.isSame(now, 'd'))
						dayDataInside[index] = [dayDataInside[index][0] + sensor.people_inside, dayDataInside[index][1] + 1];
				}
				
				for(var signal of this.signaledData) {
					var date = this.$moment(signal.timestamp);
					var index = date.hours();
					if(date.isSame(now, 'd')) {
						dayDataInside[index] = [dayDataInside[index][0] + signal.people_inside, dayDataInside[index][1] + 1];
						dayDataOutside[index] = [dayDataOutside[index][0] + signal.people_queue, dayDataOutside[index][1] + 1];
					}
				}
				
				for(var i = 0; i < dayDataInside.length; i++)
					if(dayDataInside[i][1] != 0) {
						var avg = Math.floor(dayDataInside[i][0] / dayDataInside[i][1]);
						this.dayHistogramData.datasets[0].data[i] = avg;
					}
				
				for(var n = 0; n < dayDataOutside.length; n++)
					if(dayDataOutside[n][1] != 0) {
						var avg = Math.floor(dayDataOutside[n][0] / dayDataOutside[n][1]);
						this.dayHistogramData.datasets[1].data[n] = avg;
					}
			},
			
			initializeReservationsHistogramData: function() {
				var nextHour = this.$moment().add(1, 'h');
				var endOfDay = this.$moment().endOf('d');
				
				for(var reservation of this.reservationsData) {
					var date = this.$moment(reservation.date);
					var index = date.hours();
					if(date.isBetween(nextHour, endOfDay))
						this.reservationsHistogramData.datasets[0].data[index] = this.reservationsHistogramData.datasets[0].data[index] + reservation.people;
				}
			},
			
			initializeAffluenceLineChartData: function() {
				var affluenceData = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
				var thisWeek = this.$moment().startOf('w');
				var lastWeek = this.$moment().startOf('w').subtract(1, 'w');
				
				for(var m = this.$moment(lastWeek); m.isBefore(thisWeek); m.add(1, 'd'))
					this.affluenceLineChartData.labels.push(m.format('DD/MM'));
				
				for(var sensor of this.sensorData) {
					var date = this.$moment(sensor.timestamp);
					var index = date.weekday();
					if(date.isBetween(lastWeek, thisWeek))
						affluenceData[index] = [affluenceData[index][0] + sensor.people_inside, affluenceData[index][1] + 1];
				}
				
				for(var signal of this.signaledData) {
					var date = this.$moment(signal.timestamp);
					var index = date.weekday();
					if(date.isBetween(lastWeek, thisWeek))
						affluenceData[index] = [affluenceData[index][0] + signal.people_inside, affluenceData[index][1] + 1];
				}
				
				for(var i = 0; i < affluenceData.length; i++)
					if(affluenceData[i][1] != 0) {
						var avg = Math.floor(affluenceData[i][0] / affluenceData[i][1]);
						this.affluenceLineChartData.datasets[0].data[i] = avg;
					}
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