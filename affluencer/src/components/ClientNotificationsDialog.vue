<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Notifiche da leggere</span>
    </v-card-title>
    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="notification in notifications"
        :key="notification._id"
      >
        <v-list-item-avatar>
          <v-icon color="primary">mdi-bell</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ notification.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "clientNotificationsDialog",
  props: ["clientNotifications"],

  data: function() {
    return {
      notifications: [],
    };
  },
  
  created() {
    setInterval(function() {

        this.initializeNotifications();
    }.bind(this), 30000);
  },

  mounted: function() {
    this.initializeNotifications();
  },

  methods: {
    initializeNotifications: async function() {
      try {
        var res = await this.axios.get("/notifications/", {
          params: { user_id: $cookies.get("userid") },
        });

        this.notifications = res.data;

        console.log(this.notifications);
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
