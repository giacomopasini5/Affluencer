<template>
  <nav>
    <v-toolbar dark color="primary" style="max-height:60px;">
      <v-toolbar-title>
        <v-btn id="no-background-hover-title" v-ripple="false" text to="/">
          <strong>Affluencer</strong>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-list-item v-for="item in navLinks" :key="item.name">
          <v-dialog
            v-if="item.name == 'Notifiche'"
            v-model="dialog"
            scrollable
            max-width="500px"
            class="pt-4"
          >
            <template v-slot:activator="{ on: dialog, attrs }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-badge
                    color="red"
                    :content="notificationsNumber"
                    :value="notificationsNumber"
                    overlap
                    offset-x="25"
                    offset-y="20"
                  >
                    <v-btn
                      id="no-background-hover"
                      icon
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...dialog }"
                      v-ripple="false"
                    >
                      <v-icon large> {{ item.icon }} </v-icon>
                    </v-btn>
                  </v-badge>
                </template>
                <span> {{ item.name }} </span>
              </v-tooltip>
            </template>
            <notificationsDialog />
          </v-dialog>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                id="no-background-hover"
                v-if="item.name == 'Esci'"
                @click.native="logout"
                :to="item.link"
                text
                v-ripple="false"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon large> {{ item.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ item.name }}</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                id="no-background-hover"
                v-if="item.name != 'Notifiche' && item.name != 'Esci'"
                :to="item.link"
                text
                v-ripple="false"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon large> {{ item.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ item.name }}</span>
          </v-tooltip>
        </v-list-item>
      </v-toolbar-items>

      <v-app-bar-nav-icon
        class="hidden-md-and-up mx-2"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
    </v-toolbar>

    <v-navigation-drawer
      dark
      right
      v-model="drawer"
      absolute
      temporary
      color="primary"
      style="z-index: 9999;"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4">
            Menu
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in navLinks" :key="item.name">
          <v-dialog
            v-if="item.name == 'Notifiche'"
            v-model="dialog"
            scrollable
            max-width="500px"
            class="pt-4"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-badge
                color="red"
                :content="notificationsNumber"
                :value="notificationsNumber"
                offset-x="-30"
                offset-y="15"
              >
                <v-btn
                  id="no-background-hover"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  v-ripple="false"
                  style="margin-left: 47px;"
                >
                  {{ item.name }}
                </v-btn>
              </v-badge>
            </template>

            <notificationsDialog v-on:close-dialog="closeDialog()" />
          </v-dialog>

          <v-btn
            id="no-background-hover"
            v-if="item.name == 'Esci'"
            @click.native="logout"
            :to="item.link"
            text
            v-ripple="false"
          >
            {{ item.name }}
          </v-btn>
          <v-btn
            id="no-background-hover"
            v-if="item.name != 'Notifiche' && item.name != 'Esci'"
            :to="item.link"
            text
            v-ripple="false"
          >
            {{ item.name }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import notificationsDialog from "@/components/NotificationsDialog.vue";

export default {
  name: "navbar",

  props: ["navLinks"],

  components: {
    notificationsDialog,
  },

  data: function() {
    return {
      drawer: false,
      dialog: false,
      notificationsNumber: 0,
      polling: null,
    };
  },

  mounted: function() {
    if (this.isClient() || this.isStore()) {
      this.getNotificationsNumber();
    }
    setInterval(
      function() {
        if (this.isClient() || this.isStore()) {
          this.getNotificationsNumber();
        }
      }.bind(this),
      1000
    );
  },

  methods: {
    closeDialog: function() {
      this.dialog = false;
    },

    getNotificationsNumber: async function() {
      var num = 0;
      try {
        var res = await this.axios.get("/notifications/", {
          params: { user_id: $cookies.get("userid") },
        });

        for (var notification of res.data) {
          if (!notification.read) {
            num++;
          }
        }
        this.notificationsNumber = num;

        //console.log("notifiche: " + this.notificationsNumber);
      } catch (error) {
        console.log("failure");
        console.log(error);
      }
    },
  },

  beforeDestroy() {
    clearInterval(this);
  },
};
</script>

<style>
#no-background-hover::before {
  background-color: transparent;
}

#no-background-hover {
  font-size: 1em;
}

#no-background-hover-title::before {
  background-color: transparent;
}

#no-background-hover-title {
  font-size: 1.2em;
  font-family: Verdana, sans-serif;
}
</style>
