<template>
  <v-row justify="center" class="text-center pa-5">
    <v-col cols="10">
      <span class="text-h5">Prenotazioni</span>
    </v-col>
    <v-col cols="10">
      <v-row justify="center">
        <v-col cols="10">
          <v-list outlined class="text-left pa-0">
            <v-list-item
              v-for="reservation in reservations"
              :key="reservation._id"
              router
            >
              <v-list-item-avatar>
                <v-icon color="primary">mdi-notebook</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn
                    color="primary"
                    text
                    router
                    :to="/store/ + reservation.shop_id"
                  >
                    {{ reservation.shop_id }}
                  </v-btn>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span>
                    {{ reservation.timestamp | moment("YYYY-MM-DD HH:mm") }}
                  </span>
                  <br />
                  <span>Posti: {{ reservation.people }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  @click="removeReservation(reservation._id)"
                  icon
                  style="z-index: 9999;"
                >
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "storeReservationsList",

  props: ["storeReservations"],

  data: function() {
    return {
      reservations: [],
      //isClient: false,
      isShop: false,
      itemTitle: "",
    };
  },

  created: function() {
    this.checkUserType();
    this.listReservation();
  },

  methods: {
    checkUserType: function() {
      if ($cookies.get("usertype") == "client") {
        this.isClient = true;
        this.isShop = false;
      }
      if ($cookies.get("usertype") == "shop") {
        this.isClient = false;
        this.isShop = true;
      }
    },

    listReservation: async function() {
      if (this.isClient) {
        var res = await this.axios.get("/reservations", {
          params: {
            client_id: $cookies.get("userid"),
          },
        });
      }

      if (this.isShop) {
        var res = await this.axios.get("/reservations", {
          params: {
            shop_id: $cookies.get("shopid"),
          },
        });
      }

      console.log(res.data);

      this.reservations = res.data;
    },

    removeReservation: async function(reservationId) {
      try {
        var res = await this.axios.delete("/reservations/" + reservationId);
        this.listReservation();
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },
  },
};
</script>
