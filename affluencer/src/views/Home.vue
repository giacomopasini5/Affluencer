<template>
  <div id="home">
    <l-map
      :minZoom=0
      :maxZoom=18
      ref="myMap"
      @ready="onReady"
      @locationfound="onLocationFound"
      style="height: calc(100vh - 8vh)"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
    </l-map>
  </div>
</template>

<script>
/*  */
/* <l-map style="height: 100%"> */

import { latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";  

export default {
    name: 'home',
    components: {
        LMap,
        LTileLayer
    },

    data() {
        return {
            zoom: 16,
            center: latLng(44.14797, 12.23589),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
    },

    methods: {
        onReady() {
          var map = this.$refs.myMap.mapObject;
          map.fitWorld();
          map.locate({ enableHighAccuracy: true });
        },

        onLocationFound(ev) {
          var map = this.$refs.myMap.mapObject;
          setTimeout(() => {
            map.setView(ev.latlng, 16);
          }, 1000);
        }
    }
}
</script>

<style>
    @import '../styles/home.css'
</style>