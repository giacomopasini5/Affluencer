<template>
  <div id="home">
    <l-map
      :zoom="zoom"
      :center="userLocation"
      ref="myMap"
      :options="{ zoomControl: false }"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        :options="{ maxZoom: 18, minZoom: 6 }"
      />

      <!-- top left toolbar with search -->
      <v-toolbar
        floating
        dark
        color="primary"
        style="z-index: 9999;"
        class="ma-7"
      >
        <v-autocomplete
          :items="markersSearch"
          v-model="selected"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Inserisci il nome del negozio..."
          solo-inverted
          @change="centerMarker(selected, true, false)"
        ></v-autocomplete>
        <v-btn icon @click="centerMarker(userLocation, false, false)">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>

        <!-- Menu categories filter TODO-->
        <v-menu :close-on-content-click="false" offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon dark v-bind="attrs" v-on="on">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>Legenda</v-card-title>
            <v-list v-for="checkbox in mIconsData" :key="checkbox.id">
              <v-checkbox
                :label="checkbox.name"
                :color="'#' + checkbox.color"
                input-value="1"
                class="mx-4 my-n2"
              ></v-checkbox>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar>

      <!-- store markers -->
      <l-marker
        v-for="item in markers"
        :key="item.id"
        :lat-lng="item.latlng"
        @click="centerMarker(item.latlng, false, true)"
      >
        <l-icon
          :icon-url="getCategoriesMarkerIcon(item.category)"
          :iconSize="[40, 59]"
          :iconAnchor="[20, 59]"
          :popupAnchor="[0, -59]"
          :tooltipAnchor="[20, -35]"
        />

        <l-tooltip>{{ item.name }}: {{ item.peopleInside }}</l-tooltip>

        <l-popup :options="{ autoPan: false }">
          <storePopupCard :storeData="item" />

          <v-btn color="primary" dark>
            MORE
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
        </l-popup>
      </l-marker>

      <!-- user location marker -->
      <l-marker
        :lat-lng="userLocation"
        @click="centerMarker(userLocation, false, false)"
      >
        <l-icon
          :icon-url="getCategoriesMarkerIcon('posizione')"
          :iconSize="[30, 30]"
          :iconAnchor="[15, 15]"
          :tooltipAnchor="[15, 0]"
        />
        <l-tooltip>You</l-tooltip>
      </l-marker>
    </l-map>

    <!-- fab notifications -->
    <v-btn
      fab
      fixed
      bottom
      right
      x-large
      color="primary"
      style="z-index: 9999; margin-bottom:150px"
    >
      <v-icon large>mdi-bell</v-icon>
    </v-btn>

    <!-- fab favourite -->
    <v-btn
      fab
      fixed
      bottom
      right
      x-large
      color="primary"
      style="z-index: 9999; margin-bottom:50px"
    >
      <v-icon large>mdi-star</v-icon>
    </v-btn>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  LIcon,
} from "vue2-leaflet";
import { latLng, icon } from "leaflet";

import storePopupCard from "@/components/StorePopupCard.vue";
import markerIconsData from "@/assets/marker_icons.json";

export default {
  name: "home",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LIcon,
    storePopupCard,
  },

  data() {
    return {
      zoom: 14,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      userLocation: latLng(44.422452145133896, 12.20347570657797),
      markers: [],
      markersSearch: [],
      storeDialog: false,
      storeData: "",
      selected: "",
      mIconsData: markerIconsData,
    };
  },

  mounted() {
    // Default open popup
    this.getUserPosition();
    this.addMarkers();
  },

  /*watch: {
    selected(newValue, oldValue) {
      console.log("watching..");
      console.log(newValue);
      console.log(oldValue);
    },
  },*/

  methods: {
    // get icon from name
    getCategoriesMarkerIcon(iconName) {
      var symbol = "ff6565";
      var color = "cloud";
      var strokeColor = "000000";
      var type = "awesome";

      for (var icon of markerIconsData) {
        if (iconName == icon.id) {
          symbol = icon.symbol;
          color = icon.color;
          strokeColor = icon.strokecolor;
          type = icon.type;
        }
      }

      return (
        "https://api.geoapify.com/v1/icon/?type=" +
        type +
        "&color=%23" +
        color +
        "&size=xx-large&icon=" +
        symbol +
        "&iconType=awesome&textSize=small&strokeColor=%23" +
        strokeColor +
        "&shadowColor=%23512424&noWhiteCircle&scaleFactor=2&apiKey=e8873d9bad1940369371492948fb43e2"
      );
    },

    // center marker
    centerMarker(latLng, zoom, popup) {
      //this.$refs.myMap.mapObject.panTo(latLng);
      var map = this.$refs.myMap.mapObject;
      var px = map.project(latLng); // find the pixel location on the map where the popup anchor is
      if (popup) {
        px.y -= 400 / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      }
      if (zoom) {
        map.setView(map.unproject(px), 18, { animate: true }); // set view and zoom to new center
      } else {
        map.panTo(map.unproject(px), { animate: true }); // set pan to new center
      }
    },

    // Add markers to map
    async addMarkers() {
      try {
        var storeList = await this.axios.get("/shops/");
        //var sensorData = await this.axios.get("/sensors/");
        //console.log(sensorData);

        for (var store of storeList.data) {
          var people = 15; //sensorData.data;

          this.markers.push({
            id: store._id,
            name: store.name,
            latlng: latLng(store.location.coordinates),
            openTime: store.openTime, //da spostare
            closeTime: store.closeTime, //da spostare
            capacity: store.capacity, //da spostare
            peopleInside: this.getSensorData(store._id),
            category: store.category,
          });

          this.markersSearch.push({
            text: store.name,
            value: latLng(store.location.coordinates),
          });
        }
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    // get data from one sensor
    getSensorData(storeId) {
      return 10;
    },

    // Get user location if available
    async getUserPosition() {
      // check if API is supported
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition((pos) => {
          // set user location
          this.userLocation = latLng(pos.coords.latitude, pos.coords.longitude);
        });
      }
    },
  },
};
</script>

<style>
@import "../styles/home.css";
</style>
