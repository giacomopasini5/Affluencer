<template>
  <v-card>
    <div>
      <v-card-title class="justify-center">
        <strong> {{ storeRes.name }} </strong>
      </v-card-title>
      <v-card-subtitle class="text-center">
        Apertura: {{ storeRes.openTime }} - Chiusura: {{ storeRes.closeTime }}
      </v-card-subtitle>

      <v-card-text>
        <v-menu
          ref="menuDate"
          v-model="menuDate"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Data"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            :min="actualDate"
            no-title
            scrollable
            locale="it-IT"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menuDate = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.menuDate.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-menu
          ref="menuTime"
          v-model="menuTime"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Ora"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menuTime"
            v-model="time"
            full-width
            format="24hr"
            :min="minTime"
            :max="storeRes.closeTime"
            @click:minute="$refs.menuTime.save(time)"
          ></v-time-picker>
        </v-menu>

        <v-slider
          v-model="people"
          class="ma-6"
          label="Posti"
          min="1"
          max="10"
          thumb-label="always"
          tick-size="4"
          width="10"
        ></v-slider>

        <v-card-actions class="justify-space-between mt-2">
          <v-btn @click="postReservation()" color="green darken-1" text>
            Prenota
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
  name: "storeReservationsDialog",
  props: ["storeRes"],

  data: function() {
    return {
      minTime: "",
      time: "",
      menuDate: false,
      menuTime: false,
      people: "",

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      timestamp: "",

      actualDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      actualTime: "",
    };
  },

  mounted: function() {
    this.getNow();
    this.getRightTime();

    setInterval(
      function() {
        this.getNow();
        this.getRightTime();
      }.bind(this),
      30000
    );
  },

  methods: {
    getNow: function() {
      var today = new Date();
      this.actualDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1 < 10
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1) +
        "-" +
        today.getDate();
      this.actualTime = today.getHours() + ":" + today.getMinutes();

      var dateTime = this.actualDate + " " + this.actualTime;
      this.timestamp = dateTime;
      //console.log(this.actualDate);
    },

    /*checkAlreadyReserved: async function() {
      var res = await this.axios.get("/reservations", {
        params: {
          client_id: $cookies.get("userid"),
          shop_id: this.storeRes.id,
        },
      });
      var resDate = new Date(res.data.date);

      console.log(res.data);

      var date =
        resDate.getFullYear() +
        "-" +
        (resDate.getMonth() + 1 < 10
          ? "0" + (today.getMonth() + 1)
          : resDate.getMonth() + 1) +
        "-" +
        resDate.getDate();

      console.log(date);
      console.log(this.date);

      if (date == this.date) {
        return true;
      }
      // console.log(res.data);

      return false;
    },*/

    generateNotification: async function(date, time) {
      try {
        var res = await this.axios.post("/notifications/", {
          user_id: this.storeRes.id,
          text:
            "Nuova prenotazione: " +
            $cookies.get("username") +
            " | " +
            date +
            " " +
            time,
          url: "/",
          read: false,
        });

        console.log("creata notifica");
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    postReservation: async function() {
      var res = await this.axios.get("/reservations", {
        params: {
          client_id: $cookies.get("userid"),
          shop_id: this.storeRes.id,
        },
      });

      var alreadyExist = false;

      for (var response of res.data) {
        var resDate = new Date(response.date);

        console.log(response.date);

        var date =
          resDate.getFullYear() +
          "-" +
          (resDate.getMonth() + 1 < 10
            ? "0" + (resDate.getMonth() + 1)
            : resDate.getMonth() + 1) +
          "-" +
          resDate.getDate();

        console.log(date);
        console.log(this.date);

        if (date == this.date) {
          alreadyExist = true;
        }
      }

      if (!alreadyExist) {
        try {
          var res = await this.axios.post("/reservations", {
            shop_id: this.storeRes.id,
            client_id: $cookies.get("userid"),
            date: this.date + " " + this.time,
            people: this.people,
          });

          //console.log(this.timestamp);
        } catch (error) {
          console.log("failure");
          console.log(error);
        }
        console.log("prenotato!");

        this.generateNotification(this.date, this.time);
      }

      this.$emit("close-dialog");
    },

    getRightTime: function() {
      //console.log(this.storeRes.openTime);
      //console.log(this.actualTime);
      if (this.storeRes.openTime >= this.actualTime) {
        this.minTime = this.storeRes.openTime;
        this.time = this.storeRes.openTime;
      } else {
        this.minTime = this.actualTime;
        this.time = this.actualTime;
      }
    },
  },
};
</script>

<style></style>
