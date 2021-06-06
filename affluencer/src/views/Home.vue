<template>
  <div id="home">
    <l-map
      :zoom="zoom"
      :center="[
        userLocation.lat || defaultLocation.lat,
        userLocation.lng || defaultLocation.lng,
      ]"
      ref="myMap"
      :options="{ zoomControl: false }"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        :options="{ maxZoom: 18, minZoom: 6 }"
      />

      <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.latlng">
        <l-popup>
          <v-dialog v-model="storeDialog" width="600px">
            <template v-slot:activator="{ on, attrs }">

              <storePopupCard />

              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                MORE
                <v-icon color="black">mdi-plus</v-icon>
              </v-btn>
            </template>

            <storeCard />
            
          </v-dialog>
        </l-popup>
      </l-marker>
    </l-map>

    <v-btn
      fab
      fixed
	  bottom
      right
      x-large
      color="primary"
      style="z-index: 9999; margin-bottom: 50px"
    >
      <v-icon large color="yellow">mdi-star</v-icon>
    </v-btn>
  </div>
</template>

<script>
/*  */
/* <l-map style="height: 100%"> */

/*import { latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet"; */

import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

import storeCard from "@/components/StoreCard.vue";
import storePopupCard from "@/components/StorePopupCard.vue";

// Marker icon
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
    storeCard,
    storePopupCard,
  },

  props: {
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 44.422452145133896,
        lng: 12.20347570657797,
      }),
    },
  },

  data() {
    return {
      zoom: 14,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      userLocation: {},
      markers: [],
      storeDialog: false,
    };
  },

  mounted() {
    // Default open popup

    this.getUserPosition();
    this.addMarker();
  },

  methods: {
    /*onReady() {
          var map = this.$refs.myMap.mapObject;
          map.fitWorld();
          map.locate({ enableHighAccuracy: true });
        },

        onLocationFound(ev) {
          var map = this.$refs.myMap.mapObject;
          setTimeout(() => {
            map.setView(ev.latlng, 16);
          }, 1000);
        },*/

    addMarker() {
      // ESEMPIO
      this.markers.push(
        {
          id: 1,
          latlng: L.latLng(44.4224, 12.2034),
          content: "Farmacia",
        },
        {
          id: 2,
          latlng: L.latLng(44.4055, 12.1848),
          content: "Bibilioteca",
        },
        {
          id: 3,
          latlng: L.latLng(44.4125, 12.2035),
          content: "Blockbuster",
        }
      );
    },

    async getUserPosition() {
      // check if API is supported
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition((pos) => {
          // set user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
        });
      }
    },
  },
};
</script>

<style>
	@import "../styles/home.css";
</style>
