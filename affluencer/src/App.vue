<template>
  <v-app id="app">
    <v-main>
      <navbar :navLinks="navLinks" />
      <v-btn
        fab
        fixed
        bottom
        left
        small
        @click="toggleTheme"
        color="primary"
        style="z-index: 9999"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-container fluid class="pa-0">
        <v-slide-x-transition>
          <router-view />
        </v-slide-x-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navbar from "@/components/Navbar.vue";

export default {
  name: "app",

  components: {
    navbar,
  },

  data: function() {
    return {
      notifications: [],
    };
  },

  computed: {
    navLinks: function() {
      return this.$store.state.auth.isLogged
        ? [
            {
              name: "Informazioni",
              link: "/info",
              icon: "mdi-information-outline",
            },

            {
              name: "Notifiche",
              link: "",
              icon: "mdi-bell",
            },
            {
              name: "Profilo",
              link: "/profile",
              icon: "mdi-account",
            },
            {
              name: "Esci",
              link: "/",
              icon: "mdi-logout",
            },
          ]
        : [
            {
              name: "Informazioni",
              link: "/info",
              icon: "mdi-information-outline",
            },
            {
              name: "Accedi/Registrati",
              link: "/login",
              icon: "mdi-login",
            },
          ];
    },
  },

  methods: {},
};
</script>
