<template>
  <div id="app" class="wrapper">
    <v-app id="apiman">
      <sidenav v-if="!fullscreen" />
      <div class="main h-full" id="main">
        <am-header v-if="!fullscreen" />
        <v-content>
          <v-container fluid>
            <nuxt />
          </v-container>
        </v-content>
        <am-footer />
      </div>
    </v-app>
        <!-- <aside class="nav-second"></aside> -->
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  components: {
    sidenav: () => import("../components/layout/sidenav"),
    "am-header": () => import("../components/layout/header"),
    "am-footer": () => import("../components/layout/footer"),
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      fullscreen: 'project/fullscreen',
    }),
  },
}
</script>
