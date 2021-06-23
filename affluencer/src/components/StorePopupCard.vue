<template>
  <v-card elevation="0">
    <v-card-title class="justify-center">
      {{ storeName }}
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{ address }}, {{ city }}
    </v-card-subtitle>

    <v-card-text class="text-center">
      <v-rating
        :value="2.5"
        color="amber"
        dense
        half-increments
        readonly
        size="25"
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
            <v-btn color="grey" icon x-large v-bind="attrs" v-on="on">
              <v-icon> mdi-star </v-icon>
            </v-btn>
          </template>
          <span>Aggiungi a Preferiti</span>
        </v-tooltip>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "storePopupCard",
  props: ["storeData"],
  data() {
    return {
      favVisible: true,
      signVisibile: true,
      storeName: "",
      address: "",
      city: "",
      openTime: "",
      closeTime: "",
      capacity: 0,
      peopleInside: 0,
      storeRoute: "",
    };
  },

  mounted() {
    this.getShopData(this.storeData.id);

    setInterval(
      function() {
        this.getShopData(this.storeData.id);
      }.bind(this),
      30000
    );
  },

  methods: {
    getShopData: async function(storeId) {
      try {
        var sensor = await this.axios.get("/shops/" + storeId + "/info");

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

    addToFavourite: function(storeId) {},
  },
};
</script>

<style>
@import "../styles/home.css";
</style>
