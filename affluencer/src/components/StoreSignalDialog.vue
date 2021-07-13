<template>
  <v-card>
    <div>
      <v-card-title class="justify-center">
        <strong> {{ storeSign.name }} </strong>
      </v-card-title>

      <v-card-text>
        <strong>Persone all'interno</strong>
        <v-slider
          v-model="customersInside"
          class="my-8 mx-2"
          min="0"
          max="50"
          thumb-label="always"
          tick-size="4"
          width="10"
        ></v-slider>
        <strong>Persone in coda:</strong>
        <v-slider
          v-model="customersQueue"
          class="my-8 mx-2"
          min="0"
          max="50"
          thumb-label="always"
          tick-size="4"
          width="10"
        ></v-slider>

        <v-card-actions class="justify-space-between mt-2">
          <v-btn @click="signalCustomers()" color="green darken-1" text>
            Segnala
          </v-btn>
          <v-btn v-on:click="$emit('close-dialog')" color="red darken-1" text>
            Annulla
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "storeSignalDialog",
  props: ["storeSign"],

  data: function() {
    return {
      minTime: "",
      time: "",
      customersInside: "",
      customersQueue: "",
    };
  },
  created() {
    setInterval(function() {}.bind(this), 30000);
  },

  mounted: function() {},

  methods: {
    signalCustomers: async function() {
      try {
        var res = await this.axios.post("/communications/", {
          shop_id: this.storeSign.id,
          client_id: $cookies.get("userid"),
          people_inside: this.customersInside,
          people_queue: this.customersQueue,
        });
        this.generateNotification(
          this.storeSign.id,
          this.customersInside,
          this.customersQueue
        );

        this.customersInside = "";
        this.customersQueue = "";

        this.$emit("close-dialog");
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    generateNotification: async function(id, inside, queue) {
      try {
        var res = await this.axios.post("/notifications/", {
          user_id: id,
          text:
            "Nuova segnalazione, persone all'interno: " +
            inside +
            " | coda: " +
            queue,
          url: "/",
          read: false,
        });

        //console.log("creata notifica");
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
