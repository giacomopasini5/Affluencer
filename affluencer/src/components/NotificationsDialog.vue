<template>
  <v-card>
    <v-card-title v-if="notifications != ''">
      <span class="text-h5">Notifiche da leggere</span>
    </v-card-title>
    <v-card-title v-else>
      <span class="text-h5">Nessuna notifica da leggere</span>
    </v-card-title>
    <v-card>
      <v-list>
        <v-list-item
          v-for="notification in notifications"
          :key="notification._id"
          :to="notification.url"
          @click="setAsRead(notification._id)"
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

    <v-btn v-if="notifications != ''" text @click="setAsRead()" color="green">
      LETTO
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "userNotificationsDialog",
  props: ["userNotifications"],

  data: function() {
    return {
      notifications: [],
    };
  },

  mounted: function() {
    this.initializeNotifications();
    setInterval(
      function() {
        this.initializeNotifications();
      }.bind(this),
      1000
    );
  },

  methods: {
    initializeNotifications: async function() {
      try {
        var notif = [];
        var res = await this.axios.get("/notifications/", {
          params: { user_id: $cookies.get("userid") },
        });

        for (var notification of res.data) {
          if (!notification.read) {
            notif.push(notification);
          }
        }

        this.notifications = notif;
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },

    setAsRead: async function(notificationId) {
      try {
        if (notificationId == null) {
          for (var notification of this.notifications) {
            var res = await this.axios.put(
              "/notifications/" + notification._id,
              {
                read: true,
              }
            );
          }
        } else {
          var res = await this.axios.put("/notifications/" + notificationId, {
            read: true,
          });
        }

        this.$emit("close-dialog");
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
