<template>
  <div>
    <v-card-title class="justify-center">
      <strong>{{ storeName }}</strong>
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{ address }}, {{ city }}
    </v-card-subtitle>

    <v-card-text class="text-center">
      <v-rating
        :value="averageScore"
        color="amber"
        dense
        half-increments
        readonly
        size="30"
      ></v-rating>

      <div class="my-4 text-subtitle-1">
        Apertura: {{ openTime }} <br />
        Chiusura: {{ closeTime }} <br />
      </div>

      <v-progress-linear
        rounded
        :color="getColor(peopleInside, capacity)"
        height="25"
        :value="getPercentage(peopleInside, capacity)"
      >
        <strong>Affluenza: {{ peopleInside }}</strong>
      </v-progress-linear>

      <template v-slot:label="item" class="font-weight-medium">
        {{ item.value }}h
      </template>

      <v-card-actions class="justify-space-between mt-2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              outlined
              large
              v-bind="attrs"
              v-on="on"
              :to="storeRoute"
            >
              PAGINA
            </v-btn>
          </template>
          <span>Pagina negozio</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="isClient()"
              icon
              x-large
              v-bind="attrs"
              v-on="on"
              @click="setFavorite()"
            >
              <v-icon v-if="isFavorite" color="orange">mdi-star</v-icon>
              <v-icon v-else color="grey">mdi-star</v-icon>
            </v-btn>
          </template>
          <span>Preferiti</span>
        </v-tooltip>

        <v-dialog v-model="dialog" max-width="400px">
          <template v-slot:activator="{ on: dialog, attrs }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-if="isClient()"
                  icon
                  x-large
                  v-bind="attrs"
                  v-on="{ ...tooltip, ...dialog }"
                >
                  <v-icon color="primary">mdi-notebook-plus</v-icon>
                </v-btn>
              </template>
              <span>Prenota</span>
            </v-tooltip>
          </template>
          <storeReservationsDialog
            v-on:close-dialog="closeDialog()"
            :storeRes="storeShortInfo"
          />
        </v-dialog>
      </v-card-actions>
    </v-card-text>
  </div>
</template>

<script>
import storeReservationsDialog from "@/components/StoreReservationsDialog.vue";

export default {
  name: "storePopupCard",
  props: ["storePopup"],

  components: {
    storeReservationsDialog,
  },

  data: function() {
    return {
      storeShortInfo: "",

      storeName: "",
      address: "",
      city: "",
      openTime: "",
      closeTime: "",
      capacity: 0,
      peopleInside: 0,
      storeRoute: "",
      isFavorite: false,
      averageScore: 0,
      storeRes: "",

      dialog: false,
    };
  },

  mounted: function() {
    this.getShopData();
    this.getReviews();

    if (
      $cookies.get("usertype") == "client" ||
      $cookies.get("usertype") == "store"
    ) {
      if ($cookies.get("usertype") == "client") {
        this.initializeFavorite();
      }

      setInterval(
        function() {
          this.getSensorData();
          this.getReviews();
          if ($cookies.get("usertype") == "client") {
            this.initializeFavorite();
          }
        }.bind(this),
        30000
      );
    }
  },

  methods: {
    closeDialog: function() {
      this.dialog = false;
    },

    getShopData: async function() {
      try {
        var sensor = await this.axios.get(
          "/shops/" + this.storePopup.id + "/info"
        );

        this.storeShortInfo = new Object({
          id: sensor.data._id,
          name: sensor.data.name,
          openTime: sensor.data.openTime,
          closeTime: sensor.data.closeTime,
          capacity: sensor.data.capacity,
        });

        this.storeRoute = "/store/" + sensor.data._id;
        this.storeName = sensor.data.name;
        this.address = sensor.data.address;
        this.city = sensor.data.city;
        this.openTime = sensor.data.openTime;
        this.closeTime = sensor.data.closeTime;
        this.capacity = sensor.data.capacity;
        this.peopleInside = sensor.data.lastSensorActivity[0].people_inside;
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    getSensorData: async function() {
      try {
        var req = await this.axios.get("/sensors/last", {
          params: { shop_id: this.storePopup.id },
        });
        this.peopleInside = req.data.people_inside;
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    getPercentage: function(affluence, capacity) {
      return (affluence * 100) / capacity;
    },

    getColor: function(affluence, capacity) {
      var pecentage = this.getPercentage(affluence, capacity);
      if (pecentage > 66) {
        return "red";
      } else if (pecentage > 33) {
        return "orange";
      } else if (pecentage >= 0) {
        return "green";
      }
      return "";
    },

    initializeFavorite: async function() {
      try {
        var favorites = await this.axios.get(
          "/clients/" + $cookies.get("userid") + "/favorite_shops"
        );

        //console.log(favorites);

        for (var store of favorites.data)
          if (store.shop_id == this.storePopup.id) this.isFavorite = true;
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    setFavorite: async function() {
      if (!this.isFavorite) {
        try {
          var res = await this.axios.post(
            "/clients/" + $cookies.get("userid") + "/favorite_shops",
            {
              shop_id: this.storePopup.id,
              shop_name: this.storeName,
            }
          );
          this.isFavorite = true;
        } catch (error) {
          console.log("failure");
          console.log(error);
        }
      } else {
        try {
          var res = await this.axios.delete(
            "/clients/" +
              $cookies.get("userid") +
              "/favorite_shops/" +
              this.storePopup.id
          );
          this.isFavorite = false;
        } catch (error) {
          console.log("failure");
          console.log(error);
        }
      }
    },

    getReviews: async function() {
      var tmp = 0;
      try {
        var reviews = await this.axios.get("/reviews", {
          params: { shop_id: this.storePopup.id },
        });

        //console.log(reviews);

        for (var review of reviews.data) {
          tmp += review.score;
        }
        this.averageScore = tmp / reviews.data.length;
        //console.log(averageScore);
      } catch (error) {
        console.log("failure: no data");
        console.log(error);
      }
    },
  },
};
</script>

<style>
@import "../styles/home.css";
</style>
