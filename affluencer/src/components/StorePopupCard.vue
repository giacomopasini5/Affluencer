<template>
  <v-card elevation="0">
    <v-card-title class="justify-center">
      {{ storeData.name }}
    </v-card-title>

    <v-card-text>
      <v-row class="mx-0">
        <v-rating 
          :value="2.5"
          color="amber"
          dense
          half-increments
          readonly
          size="20"
        ></v-rating>
      </v-row>

      <div class="my-4 text-subtitle-1">
        Open: {{ storeData.openTime }} <br />
        Close: {{ storeData.closeTime }} <br />
      </div>

      <v-progress-linear
        rounded
        color="green"
        height="25"
        :value="storeData.peopleInside"
      >
        <strong>{{ storeData.peopleInside }}</strong>
      </v-progress-linear>
    </v-card-text>
    
  </v-card>
</template>

<script>
export default {
  name: "storePopupCard",
  props: ["storeData"],
};
</script>

<style>
@import "../styles/home.css";
</style>
