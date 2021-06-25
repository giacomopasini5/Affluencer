<template>
  <div>
    <v-card-title class="justify-center">
      {{ storeName }}
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
          <span>Aggiungi a Preferiti</span>
        </v-tooltip>
      </v-card-actions>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "storePopupCard",
  props: ["storeData"],

  data: function() {
    return {
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
    };
  },

  mounted: function() {
    this.getShopData();
    this.getReviews();
    this.initializeFavorite();

    setInterval(
      function() {
        //this.getShopData(this.storeData.id);
        this.getSensorData();
        this.getReviews();
        this.initializeFavorite();
      }.bind(this),
      30000
    );
  },

  methods: {
    getShopData: async function() {
      try {
        var sensor = await this.axios.get(
          "/shops/" + this.storeData.id + "/info"
        );

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
        var req = await this.axios.get("/sensors/last", { params: { shop_id: storeId }});
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
        var res = await this.axios.get(
          "/clients/" + $cookies.get("userid") + "/favorite_shops"
        );
        for (var store of res.data)
          if (store.shop_id == this.storeData.id) this.isFavorite = true;
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
              shop_id: this.storeData.id,
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
              this.storeData.id
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
          params: { shop_id: this.storeData.id }
        });
        for (var review of reviews.data) {
          tmp += review.score;
        }
        this.averageScore = tmp / reviews.data.length;
        console.log(averageScore);
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },
  },
};
</script>

<style>
@import "../styles/home.css";
</style>
