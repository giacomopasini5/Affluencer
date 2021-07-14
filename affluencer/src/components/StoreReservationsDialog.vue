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
          :return-value.sync="datePicker"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="datePicker"
              label="Data"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="datePicker"
            :min="minDate"
            no-title
            scrollable
            locale="it-IT"
          >
            <v-spacer></v-spacer>

            <v-btn text color="green darken-1" @click="setDate()">
              OK
            </v-btn>

            <v-btn text color="red darken-1" @click="menuDate = false">
              ANNULLA
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-menu
          ref="menuTime"
          v-model="menuTime"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="timePicker"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="timePicker"
              label="Ora"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menuTime"
            v-model="timePicker"
            full-width
            locale="it-IT"
            format="24hr"
            :min="minTime"
            :max="maxTime"
            @click:minute="$refs.menuTime.save(timePicker)"
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
    <v-snackbar v-model="snackbar" :timeout="5000" :color="snackbarColor">{{
      snackbarMessage
    }}</v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "storeReservationsDialog",
  props: ["storeRes"],

  data: function() {
    return {
      menuDate: false,
      menuTime: false,

      timePicker: "",
      minTime: "",
      maxTime: "",
      actualTime: "",

      datePicker: "",
      minDate: "",
      maxDate: "",
      actualDate: "",

      people: "",

      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
    };
  },

  created: function() {
    // Init
    this.setClosingTime();
    this.getNow();
    this.getRightDate();
    this.getRightTime();

    setInterval(
      function() {
        this.refreshTime();
      }.bind(this),
      1000
    );
  },

  methods: {
    setDate: function() {
      this.$refs.menuDate.save(this.datePicker);
      this.getRightTime();
      this.menuDate = false;
    },

    setClosingTime: function() {
      var time = new Date();
      time.setHours(this.storeRes.closeTime.substring(0, 2));
      time.setMinutes(this.storeRes.closeTime.substring(3, 5));
      time.setSeconds(0);

      this.maxTime = this.$moment(time)
        .subtract(30, "minutes")
        .format("HH:mm");
      //console.log(this.maxTime);
    },

    getNow: function() {
      this.actualDate = this.$moment().format("YYYY-MM-DD");
      this.datePicker = this.actualDate;
      this.actualTime = this.$moment().format("HH:mm");
      this.timePicker = this.actualTime;

      /*console.log(this.actualDate);
      console.log(this.actualTime);
      console.log(this.timestamp);*/
    },

    getRightDate: function() {
      if (this.actualTime > this.maxTime) {
        this.date.setDate(this.date.getDate() + 1);
        this.datePicker = this.$moment(this.date).format("YYYY-MM-DD");

        /*console.log(this.date);
        console.log(this.dateString);
        console.log(this.actualDate);*/
      }
      this.minDate = this.datePicker;
    },

    getRightTime: function() {
      /*console.log(this.storeRes.openTime);
      console.log(this.actualTime);
      console.log(this.isSameDay());*/

      if (this.isSameDay()) {
        if (this.actualTime <= this.storeRes.openTime) {
          this.minTime = this.storeRes.openTime;
          this.timePicker = this.storeRes.openTime;
        } else {
          this.minTime = this.actualTime;
          this.timePicker = this.actualTime;
        }
      } else {
        this.minTime = this.storeRes.openTime;
        this.timePicker = this.storeRes.openTime;
      }
    },

    refreshTime: function() {
      if (this.isSameDay()) {
        if (this.timePicker < this.$moment().format("HH:mm")) {
          this.minTime = this.$moment().format("HH:mm");
          this.timePicker = this.$moment().format("HH:mm");
        }
      }
    },

    isSameDay: function() {
      var now = new Date();
      var temp = new Date(this.datePicker);
      return (
        now.getFullYear() == temp.getFullYear() &&
        now.getMonth() == temp.getMonth() &&
        now.getDate() == temp.getDate()
      );
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
        var date = this.$moment(response.date).format("YYYY-MM-DD");

        //console.log(date);

        if (date == this.datePicker) {
          alreadyExist = true;
        }
      }

      if (!alreadyExist) {
        var timestamp = new Date(this.datePicker + " " + this.timePicker);
        try {
          var res = await this.axios.post("/reservations/", {
            shop_id: this.storeRes.id,
            client_id: $cookies.get("userid"),
            date: timestamp.toString(),
            people: this.people,
          });

          //console.log(timestamp.toString());
        } catch (error) {
          console.log("failure: POST Reservations");
          console.log(error);
        }
        //console.log("prenotato!");
        this.$emit("close-dialog");
        this.postNotification(this.datePicker, this.timePicker);
      } else {
        this.snackbarColor = "red";
        this.snackbarMessage = "Hai già una prenotazione oggi!";
        this.snackbar = true;
        //console.log("Hai già una prenotazione oggi!");
      }
    },

    postNotification: async function(date, time) {
      try {
        var res = await this.axios.get("/clients/" + $cookies.get("userid"));

        console.log(res.data.name);

        var userName = res.data.name;

        res = await this.axios.post("/notifications/", {
          user_id: this.storeRes.id,
          text: "Nuova prenotazione di " + userName + " " + date,
          url: "/store/" + this.storeRes.id,
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
