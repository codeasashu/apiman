<template>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      >
        <span class="hidden-sm-and-down">API Man</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="fas fa-search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>fas fa-cog</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
    </v-app-bar>
</template>
<style scoped>
.page.header {
    background-color: #F5F5F5;
    border-bottom: 1px solid #E5E5E5;
    padding: 5px 0px;
}
</style>
<script>
export default {
    components: {
        modal: () => import("~/components/ui/modal"),
    }
}
</script>