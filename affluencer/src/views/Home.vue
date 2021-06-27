<template>
  <div id="home">
    <l-map
      :center="userLocation"
      :zoom="zoom"
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
        rounded
      >
        <v-autocomplete
          :items="markers"
          v-model="selected"
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Seleziona..."
          solo-inverted
          @change="centerMarker(selected, 16, false)"
        ></v-autocomplete>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click="centerMarker(userLocation, 16, false)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-crosshairs-gps</v-icon>
            </v-btn>
          </template>
          <span>Centra posizione</span>
        </v-tooltip>

        <!--<v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-badge
              bordered
              color="red"
              content="10"
              overlap
              style="z-index: 9999;"
            >
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-bell</v-icon>
              </v-btn>
            </v-badge>
          </template>
          <span>Notifiche</span>
        </v-tooltip>-->

        <!-- Menu categories filter TODO-->
        <v-menu :close-on-content-click="false" offset-x>
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn icon dark v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
              </template>
              <span>Filtro categorie</span>
            </v-tooltip>
          </template>

          <v-card>
            <v-card-title>Legenda</v-card-title>
            <v-list v-for="checkbox in mCategoryData" :key="checkbox.id">
              <v-checkbox
                v-model="selectedCategories"
                :label="checkbox.name"
                :value="checkbox.id"
                :color="'#' + checkbox.color"
                class="mx-4 my-n2"
                @change="addMarkers(true)"
              ></v-checkbox>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar>

      <!-- store markers -->
      <l-marker
        v-for="item in markers"
        :key="item.id"
        :lat-lng="item.value"
        @click="centerMarker(item.value, false, true)"
      >
        <l-icon
          :icon-url="getCategoriesMarkerIcon(item.category)"
          :iconSize="[40, 59]"
          :iconAnchor="[20, 59]"
          :popupAnchor="[0, -59]"
          :tooltipAnchor="[20, -35]"
        />

        <l-tooltip>{{ item.text }}</l-tooltip>

        <l-popup :options="{ autoPan: false }">
          <storePopupCard :storePopup="item" />
        </l-popup>
      </l-marker>

      <!-- user location marker -->
      <l-marker
        :lat-lng="userLocation"
        @click="centerMarker(userLocation, false, false)"
      >
        <l-icon
          icon-url="https://api.geoapify.com/v1/icon/?type=circle&color=%232151ff&size=xx-large&icon=child&iconType=awesome&textSize=small&strokeColor=%23000000&shadowColor=%23512424&noWhiteCircle&scaleFactor=2&apiKey=3dbb1a68d2234e5aaf1143bd2e8e8c67"
          :iconSize="[20, 20]"
          :iconAnchor="[15, 15]"
          :tooltipAnchor="[15, 0]"
        />
        <l-tooltip>Tu sei qui</l-tooltip>
      </l-marker>
    </l-map>

    <!-- fab notifications -->
    <!--<v-btn
      fab
      fixed
      bottom
      right
      x-large
      color="primary"
      style="z-index: 9999; margin-bottom:150px"
    >
      <v-icon large>mdi-bell</v-icon>
    </v-btn>-->

    <!-- fab favourite 
    <v-btn
      fab
      fixed
      bottom
      right
      x-large
      color="primary"
      class= "ma-5"
      style="z-index: 9999;"
    >
      <v-icon large>mdi-star</v-icon>
    </v-btn>-->
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
import categoryMarkerData from "@/assets/category_marker_icons.json";

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

  data: function() {
    return {
      zoom: 14,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      userLocation: latLng(44.422452145133896, 12.20347570657797),
      markers: [],
      markersSearch: [],
      selectedCategories: [],
      storeDialog: false,
      storePopup: "",
      selected: "",
      mCategoryData: categoryMarkerData,
    };
  },

  mounted: function() {
    this.getUserPosition();
    this.initCategories();
    this.addMarkers(false);

    setInterval(
      function() {
        this.getUserPosition();
        this.addMarkers(true);
      }.bind(this),
      60000
    );
  },

  methods: {
    // get icon from name
    getCategoriesMarkerIcon: function(iconName) {
      var symbol = "ff6565";
      var color = "cloud";
      var strokeColor = "000000";
      var type = "awesome";

      for (var icon of categoryMarkerData) {
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
        "&shadowColor=%23512424&noWhiteCircle&scaleFactor=2&apiKey=3dbb1a68d2234e5aaf1143bd2e8e8c67"
      );
    },

    // center marker
    centerMarker: function(latLng, zoom, popup) {
      //this.$refs.myMap.mapObject.panTo(latLng);
      var map = this.$refs.myMap.mapObject;
      var px = map.project(latLng); // find the pixel location on the map where the popup anchor is
      if (popup) {
        px.y -= 600 / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      }
      if (zoom != false) {
        map.setView(map.unproject(px), zoom, { animate: true }); // set view and zoom to new center
      } else {
        map.panTo(map.unproject(px), { animate: true }); // set pan to new center
      }
    },

    // Add markers to map
    addMarkers: async function(clear) {
      try {
        var storeList = await this.axios.get("/shops");

        if (clear) {
          this.markers = [];
          //this.markersSearch = [];
        }

        for (var store of storeList.data) {
          for (var category of this.selectedCategories) {
            if (category == store.category) {
              this.markers.push({
                id: store._id,
                text: store.name,
                value: latLng(store.location.coordinates),
                category: store.category,
              });

              /*this.markersSearch.push({
                text: store.name,
                value: latLng(store.location.coordinates),
              });*/
            }
          }
        }
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    // get data from one sensor
    getSensorData: async function(storeId) {
      try {
        var sensorData = await this.axios.get("/shops/" + storeId + "/info");

        console.log(sensorData.data);

        for (var sensor in sensorData.data) {
        }
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
      return sensorData;
    },

    // Get user location if available
    getUserPosition: async function() {
      // check if API is supported
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition((pos) => {
          // set user location
          this.userLocation = latLng(pos.coords.latitude, pos.coords.longitude);
        });
      }
    },

    initCategories: function() {
      for (var category of categoryMarkerData) {
        this.selectedCategories.push(category.id);
      }
    },
  },
};
</script>

<style>
@import "../styles/home.css";
</style>
