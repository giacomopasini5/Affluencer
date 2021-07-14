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
          :max="storeSign.capacity"
          thumb-label="always"
          tick-size="4"
          width="10"
        ></v-slider>
        <strong>Persone in coda:</strong>
        <v-slider
          v-model="customersQueue"
          class="my-8 mx-2"
          min="0"
          :max="storeSign.capacity"
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
    <v-snackbar v-model="snackbar" :timeout="2500" :color="snackbarColor">{{
      snackbarMessage
    }}</v-snackbar>
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
      snackbar: "",
      snackbarColor: "",
      snackbarMessage: "",
    };
  },
  created() {},

  mounted: function() {},

  methods: {
    signalCustomers: async function() {
      try {
        var res = await this.axios.get("/communications", {
          params: { shop_id: this.storeSign.id },
        });
        //console.log(res.data[1].timestamp);
      } catch (error) {
        console.log("failure: GET Communications");
        console.log(error);
      }

      var alreadySignaledToday = false;

      for (var communication of res.data) {
        if (
          this.$moment(communication.timestamp).format("YYYY-MM-DD") ==
            this.$moment().format("YYYY-MM-DD") &&
          communication.shop_id == this.storeSign.id &&
          communication.client_id == $cookies.get("userid")
        ) {
          alreadySignaledToday = true;
        }
      }

      if (!this.checkTime()) {
        this.snackbarColor = "red";
        this.snackbarMessage = "Il negozio è chiuso!";
        this.snackbar = true;
      } else {
        if (!alreadySignaledToday) {
          try {
            var res = await this.axios.post("/communications/", {
              shop_id: this.storeSign.id,
              client_id: $cookies.get("userid"),
              people_inside: this.customersInside,
              people_queue: this.customersQueue,
            });
          } catch (error) {
            console.log("failure: POST Communications");
            console.log(error);
          }

          this.postNotification(
            this.storeSign.id,
            this.customersInside,
            this.customersQueue
          );

          this.customersInside = "";
          this.customersQueue = "";
          this.$emit("close-dialog");
        } else {
          this.snackbarColor = "red";
          this.snackbarMessage = "Oggi hai già segnalato questo negozio!";
          this.snackbar = true;
        }
      }
    },

    checkTime: function() {
      var openTime = this.$moment(this.storeSign.openTime, "HH:mm");
      var closeTime = this.$moment(this.storeSign.closeTime, "HH:mm");
      return this.$moment().isBetween(openTime, closeTime);
    },

    postNotification: async function(id, inside, queue) {
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
        console.log("failure: POST Notification");
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
