<template>
  <v-row v-if="reservations.length" justify="center" class="text-left pa-5">
    <v-col cols="10">
      <v-card flat>
        <v-card-title>Prenotazioni</v-card-title>
        <v-list outlined class="pa-0">
          <v-list-item
            v-for="reservation in reservations"
            :key="reservation._id"
            router
            :to="
              $store.state.config.settings ? '' : /store/ + reservation.shop_id
            "
          >
            <v-list-item-avatar>
              <v-icon color="primary">mdi-notebook</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-if="isClient()">
                {{ reservation.shop_name }}
              </v-list-item-title>
              <v-list-item-title v-if="isStore()">
                {{ reservation.client_name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ reservation.date | moment("DD/MM/YYYY HH:mm") }} - Persone:
                {{ reservation.people }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="$store.state.config.settings">
              <v-btn @click="removeReservation(reservation)" icon>
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
  name: "userReservations",

  data: function() {
    return {
      reservations: "",
    };
  },

  mounted: function() {
    this.initializeReservations();
  },

  methods: {
    initializeReservations: async function() {
      try {
        if (this.isClient()) {
          var res = await this.axios.get("/reservations", {
            params: { client_id: $cookies.get("userid") },
          });
        }

        if (this.isStore()) {
          var res = await this.axios.get("/reservations", {
            params: { shop_id: $cookies.get("userid") },
          });
        }

        this.reservations = res.data.reverse();
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    generateNotification: async function(id, name) {
      try {
        var res = await this.axios.post("/notifications/", {
          user_id: id,
          text: "Prenotazione rimossa da: " + name,
          url: "/",
          read: false,
        });

        console.log("creata notifica");
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    removeReservation: async function(reservation) {
      try {
        var res = await this.axios.delete("/reservations/" + reservation._id);
        this.initializeReservations();

        if (this.isClient()) {
          this.generateNotification(
            reservation.shop_id,
            reservation.client_name,
            reservation.date
          );
          console.log("notifica cliente");
        }

        if (this.isStore()) {
          this.generateNotification(
            reservation.client_id,
            reservation.shop_name,
            reservation.date
          );
          console.log("notifica store");
        }
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },
  },
};
</script>
