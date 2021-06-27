<template>
	<v-row v-if="reservations.length" justify="center" class="text-left pa-5">
		<v-col cols="10">
			<v-card flat>
				<v-card-title>Prenotazioni</v-card-title>
				<v-list outlined class="pa-0">
					<v-list-item v-for="reservation in reservations" :key="reservation._id" router :to="$store.state.config.settings ? '' : /store/ + reservation.shop_id">
						<v-list-item-avatar>
							<v-icon color="primary">mdi-notebook</v-icon>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>{{ reservation.date | date }}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action v-if="$store.state.config.settings">
							<v-btn @click="removeReservation(reservation.shop_id)" icon>
								<v-icon color="red">mdi-delete</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name: 'userReservations',
		
		data: function() {
			return {
				reservations: ''
			}
		},
		
		created: function() {
			this.initializeReservations();
		},
		
		methods: {
			initializeReservations: async function() {
				try {
					var res = await this.axios.get('/reservations', { params: { client_id: $cookies.get('userid') } });
					this.reservations = res.data.reverse();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			},
			
			removeReservation: async function(reservationId) {
				try {
					var res = await this.axios.delete('/reservations/' + reservationId);
					this.initializeReservations();
				} catch(error) {
					console.log('failure');
					console.log(error);
				}
			}
		}
	}
</script>