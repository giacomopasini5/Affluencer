<template>
  <nav style="font-family: serif">
    <v-toolbar color="primary lighten-1" style="max-height:60px;">
      <v-toolbar-title>
        <v-btn id="no-background-hover-title" v-ripple="false" text to="/">
          <strong>Affluencer</strong>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-list-item v-for="item in navLinks" :key="item.name">
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
            v-else
            :to="item.link"
            text
            v-ripple="false"
          >
            {{ item.name }}
          </v-btn>
        </v-list-item>
      </v-toolbar-items>

      <v-app-bar-nav-icon
        class="hidden-md-and-up mx-2"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
    </v-toolbar>

    <v-navigation-drawer
      right
      v-model="drawer"
      absolute
      temporary
      color="primary"
      style="z-index: 9999;"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Menu
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in navLinks" :key="item.name">
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
            v-else
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
export default {
  name: "navbar",

  props: ["navLinks"],

  data: function() {
    return {
      drawer: false,
    };
  },

  methods: {},
};
</script>

<style>
#no-background-hover::before {
  background-color: transparent;
}

#no-background-hover {
  font-size: 1.2em;
}

#no-background-hover-title::before {
  background-color: transparent;
}

#no-background-hover-title {
  font-size: 1.7em;
}
</style>
