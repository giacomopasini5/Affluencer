<script>
	import {Line, mixins} from 'vue-chartjs'

	export default {
		extends: Line,
		
		mixins: [mixins.reactiveProp],
		
		data: function() {
			return {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						xAxes: [{
							gridLines: {
								display: false
							},
							ticks: {
								beginAtZero: true
							}
						}],
						yAxes: [{
							gridLines: {
								display: false
							},
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			}
		},
	  
		mounted() {
			this.renderChart(this.chartData, this.options);
		}
	}
</script>