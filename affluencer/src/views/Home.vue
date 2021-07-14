<template>
  <div id="home">
    <l-map
      class="pa-4"
      :zoom="zoom"
      ref="myMap"
      :options="{ zoomControl: false }"
      style="z-index: 0;"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        :options="{ maxZoom: 18, minZoom: 6 }"
      />

      <!-- top left toolbar with search -->
      <v-toolbar
        v-if="!isStore()"
        floating
        dark
        color="primary"
        style="z-index: 8888;"
        rounded
      >
        <v-autocomplete
          :items="markers"
          v-model="selected"
          class="mx-4"
          dense
          hide-no-data
          hide-details
          label="Seleziona..."
          solo-inverted
          @change="centerMarker(selected, 18, false)"
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
                @change="addAllMarkers(true)"
              ></v-checkbox>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar>

      <!-- store markers -->
      <l-marker
        v-for="item in markers"
        :key="item.id"
        ref="item"
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
          <storePopupCard :storePopup="item" :userLocation="userLocation" />
        </l-popup>
      </l-marker>

      <!-- user location marker -->
      <l-marker
        v-if="!isStore()"
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

import geometryutil from "leaflet-geometryutil";

import storePopupCard from "@/components/StorePopupCard.vue";
import categoryMarkerData from "@/assets/category_marker_icons.json";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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
    geometryutil,
  },

  data: function() {
    return {
      zoom: 14,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      userLocation: latLng(44.415184453889836, 12.2021695153397),
      defaultLocation: latLng(44.415184453889836, 12.2021695153397),
      markers: [],
      selectedCategories: [],
      storeDialog: false,
      storePopup: "",
      selected: "",
      mCategoryData: categoryMarkerData,
    };
  },

  mounted: function() {
    this.initCategories();
    this.centerMarker(this.defaultLocation, 14, false);

    if (this.isStore()) {
      this.addShopMarker();
    } else {
      //this.getUserPosition(); //DEMO CON GPS
      this.addAllMarkers(false);

      setInterval(
        function() {
          //this.getUserPosition(); // DEMO CON GPS
          this.addAllMarkers(true);
        }.bind(this),
        1000
      );
    }
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
      var map = this.$refs.myMap.mapObject;
      var px = map.project(latLng); // find the pixel location on the map where the popup anchor is
      if (popup) {
        px.y -= 250;
      }
      if (zoom != false) {
        map.setView(map.unproject(px), zoom, { animate: true }); // set view and zoom to new center
      } else {
        map.panTo(map.unproject(px), { animate: true }); // set pan to new center
      }
    },

    // Add markers to map
    addAllMarkers: async function(clear) {
      try {
        var storeList = await this.axios.get("/shops");

        if (clear) {
          this.markers = [];
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
            }
          }
        }
      } catch (error) {
        console.log("failure: GET Shops");
        console.log(error);
      }
    },

    addShopMarker: async function() {
      try {
        var res = await this.axios.get(
          "/shops/" + $cookies.get("userid") + "/info"
        );
        this.userLocation = res.data.location.coordinates;

        this.markers.push({
          id: res.data._id,
          text: res.data.name,
          value: latLng(res.data.location.coordinates),
          category: res.data.category,
        });
      } catch (error) {
        console.log("failure: GET Shop Info");
        console.log(error);
      }
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
