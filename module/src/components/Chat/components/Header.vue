<!-- TODO: add overflow property to title -->

<template>
  <div class="header">
    <v-app-bar
      app
      dark
      dense
      class="primary flex-grow-1 flex-shrink-1"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <!-- <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon> -->
      <v-img
        alt="PilotCity Logo"
        class="shrink"
        contain
        src="https://www.pilotcity.com/favicon.ico"
        transition="scale-transition"
        width="26"
      />
      <v-toolbar-title class="ml-3">
        <span class="hidden-sm-and-down">PilotCity</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-app-bar
      app
      dense
      class="header primary flex-grow-1 flex-shrink-1"
      dark
      flat
    >
      <v-img
        alt="PilotCity Logo"
        class="shrink hidden-lg-and-up"
        contain
        src="https://www.pilotcity.com/favicon.ico"
        transition="scale-transition"
        width="26"
      />
      <v-toolbar-title class="flex-grow-1 flex-shrink-1 d-flex justify-center">
        <span class="chatTitle">{{ room.name }}</span>
      </v-toolbar-title>
      <!-- Temporary settings button via the pencil sign -->
      <router-link to="/settings/meeting">
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    room: Object,
  },
  data: () => {
    return {
      // colors: {
      //   green: "#6eba7f"
      // }
    };
  },
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer");
    },
  },
});
</script>
