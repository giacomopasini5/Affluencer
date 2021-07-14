<template>
  <div>
    <v-card-title class="justify-center">
      <strong>{{ storeInfo.name }}</strong>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="isClient()"
            icon
            large
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
    </v-card-title>

    <v-card-subtitle class="text-center">
      {{ storeInfo.address }}, {{ storeInfo.city }}
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
        Apertura: {{ storeInfo.openTime }} <br />
        Chiusura: {{ storeInfo.closeTime }} <br />
      </div>

      <v-progress-linear
        rounded
        :color="getColor(storeInfo.peopleInside, storeInfo.capacity)"
        height="25"
        :value="getPercentage(storeInfo.peopleInside, storeInfo.capacity)"
      >
        <strong>Affluenza: {{ storeInfo.peopleInside }}</strong>
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
              :to="storeInfo.storeRoute"
            >
              PAGINA
            </v-btn>
          </template>
          <span>Pagina negozio</span>
        </v-tooltip>

        <v-dialog v-model="dialogSign" max-width="400px">
          <template v-slot:activator="{ on: dialogSign, attrs }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-if="isClient() && isShopNear()"
                  icon
                  x-large
                  v-bind="attrs"
                  v-on="{ ...tooltip, ...dialogSign }"
                >
                  <v-icon color="red">mdi-sticker-alert</v-icon>
                </v-btn>
              </template>
              <span>Segnala</span>
            </v-tooltip>
          </template>
          <storeSignalDialog
            v-on:close-dialog="closeDialog()"
            :storeSign="storeInfo"
          />
        </v-dialog>

        <v-dialog v-model="dialogRes" max-width="400px">
          <template v-slot:activator="{ on: dialogRes, attrs }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-if="isClient()"
                  icon
                  x-large
                  v-bind="attrs"
                  v-on="{ ...tooltip, ...dialogRes }"
                >
                  <v-icon color="blue">mdi-notebook-plus</v-icon>
                </v-btn>
              </template>
              <span>Prenota</span>
            </v-tooltip>
          </template>
          <storeReservationsDialog
            v-on:close-dialog="closeDialog()"
            :storeRes="storeInfo"
          />
        </v-dialog>
      </v-card-actions>
    </v-card-text>
  </div>
</template>

<script>
import storeReservationsDialog from "@/components/StoreReservationsDialog.vue";
import storeSignalDialog from "@/components/StoreSignalDialog.vue";
import geometryutil from "leaflet-geometryutil";

export default {
  name: "storePopupCard",
  props: ["storePopup", "userLocation"],

  components: {
    storeReservationsDialog,
    storeSignalDialog,
    geometryutil,
  },

  data: function() {
    return {
      storeInfo: "",
      isFavorite: false,
      averageScore: 0,
      storeRes: "",

      dialogRes: false,
      dialogSign: false,
    };
  },

  mounted: function() {
    this.getShopData();
    this.getReviewsAvg();

    if (this.isClient() || this.isStore()) {
      if (this.isClient()) {
        this.initializeFavorite();
      }

      setInterval(
        function() {
          this.getSensorData();
          this.getReviewsAvg();
          if (this.isClient()) {
            this.initializeFavorite();
          }
        }.bind(this),
        30000
      );
    }
  },

  methods: {
    closeDialog: function() {
      this.dialogSign = false;
      this.dialogRes = false;
    },

    isShopNear: function() {
      var length = geometryutil.length([
        this.userLocation,
        this.storePopup.value,
      ]);
      //console.log(this.storePopup.text + " | distanza: " + length);

      return length < 150; // 150 metri
    },

    getShopData: async function() {
      try {
        var sensor = await this.axios.get(
          "/shops/" + this.storePopup.id + "/info"
        );
      } catch (error) {
        console.log("failure: GET Shops");
        console.log(error);
      }

      this.storeInfo = new Object({
        id: sensor.data._id,
        name: sensor.data.name,
        openTime: sensor.data.openTime,
        closeTime: sensor.data.closeTime,
        capacity: sensor.data.capacity,
        storeRoute: "/store/" + sensor.data._id,
        address: sensor.data.address,
        city: sensor.data.city,
        peopleInside:
          sensor.data.lastSensorActivity.length != 0
            ? sensor.data.lastSensorActivity[0].people_inside
            : "?",
      });
    },

    getSensorData: async function() {
      try {
        var req = await this.axios.get("/sensors/last", {
          params: { shop_id: this.storePopup.id },
        });
      } catch (error) {
        console.log("failure: GET Last Sensor");
        console.log(error);
      }

      this.storeInfo.peopleInside = req.data.people_inside || "?";
    },

    getPercentage: function(affluence, capacity) {
      if (affluence == "?") return 0;
      else return (affluence * 100) / capacity;
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
      } catch (error) {
        console.log("failure: GET Clients");
        console.log(error);
      }

      for (var store of favorites.data) {
        if (store.shop_id == this.storePopup.id) this.isFavorite = true;
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
          console.log("failure: GET Favorite");
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
          console.log("failure: DELETE Favorite");
          console.log(error);
        }
      }
    },

    getReviewsAvg: async function() {
      var tmp = 0;
      try {
        var reviews = await this.axios.get("/reviews", {
          params: { shop_id: this.storePopup.id },
        });

        //console.log(reviews);
      } catch (error) {
        console.log("failure: GET Reviews");
        console.log(error);
      }
      for (var review of reviews.data) {
        tmp += review.score;
      }
      this.averageScore = tmp / reviews.data.length;
      //console.log(averageScore);
    },
  },
};
</script>
