<template>
    <v-card elevation="0">
      <v-card-title>
        <v-icon color="blue">mdi-home</v-icon>
        Titolo
      </v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="3.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
        </v-row>

        <div class="my-4 text-subtitle-1">
          Testo
        </div>

        <div>
          Descrizione
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: "storePopupCard",
};
</script>

<style>
	@import "../styles/home.css";
</style>
