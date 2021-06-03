<template>
  <div id="storeCard">
    <v-card>
      <v-img
        height="250"
        src="https://img.italiaonline.it/0WO0N000002XrrPWAS_FOTO_FARMACIA.jpg"
      ></v-img>
      <v-card-title>
        <span class="headline">Titolo</span>
      </v-card-title>
      <v-card-text> </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text>
          MORE INFO
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "storeCard",
};
</script>

<style>
	@import "../styles/home.css";
</style>
