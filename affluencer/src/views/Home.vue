<template>
  <div id="home">
    <l-map
      :zoom="zoom"
      :center="center"
      ref="myMap"
      @ready="onReady()"
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
            zoom: 10,
            center: latLng(44.14797, 12.23589),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
    },

    /* mounted() {
      L.locate({setView: true, maxZoom: 18});
    } */

    methods: {
        onReady() {
          this.map = this.$refs.myMap.mapObject;

          this.map.fitWorld();
          this.map.locate({setView: true, maxZoom: 16});
        }
    }
}
</script>

<style>
    @import '../styles/home.css'
</style>