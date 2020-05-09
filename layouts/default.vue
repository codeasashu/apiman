<template>
  <div id="app" class="wrapper">
    <v-app id="apiman">
      <sidenav />
      <div class="main h-full" id="main">
        <am-header />
        <v-content>
          <v-container fluid>
            <nuxt />
          </v-container>
        </v-content>
        <am-footer v-if="$auth.loggedIn" />
      </div>
    </v-app>
        <!-- <aside class="nav-second"></aside> -->
  </div>
</template>
<script>
export default {
  components: {
    sidenav: () => import("../components/layout/sidenav"),
    "am-header": () => import("../components/layout/header"),
    "am-footer": () => import("../components/layout/footer"),
  },
}
</script>