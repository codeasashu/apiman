<template>
    <v-navigation-drawer
      permanent
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-tabs show-arrows v-model="tab">
        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
        <v-tab>API</v-tab>
        <v-tab>Docs</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-row>
            <v-col align="center">
              <v-btn to="/create">Add API</v-btn>
            </v-col>
          </v-row>
          <v-list dense>
            <template>
              <v-list-group prepend-icon="fas fa-book">
                <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title> ABC </v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item dense link color="primary">
                  <v-list-item-avatar>
                    <v-icon small>fas fa-star</v-icon>
                  </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Overview</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-group prepend-icon="fas fa-folder"  sub-group value="true">
                  <template v-slot:activator>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          Path
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                <v-list-item-group color="primary">
                <v-list-item @click="apiItemClick($event)" two-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      /user/{userId}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text--primary">
                      <span>Something</span>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="text--primary">
                      <v-chip-group column active-class="primary--text">
                      <v-chip @click="apiItemClick($event, 'get')" outlined label pill link x-small>GET</v-chip>
                      <v-chip @click="apiItemClick($event, 'post')" outlined label pill link x-small>POST</v-chip>
                      <v-chip @click="apiItemClick($event, 'put')" outlined label pill link x-small>PUT</v-chip>
                      </v-chip-group>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-list-item-group>
                </v-list-group>
              </v-list-group>
            </template>
          </v-list>
        </v-tab-item>
        <v-tab-item>
          <p>Docs</p>
        </v-tab-item>
      </v-tabs-items>
    </v-navigation-drawer>
</template>
<script>
export default {
    data() {
        return {
          tab: undefined,
        }
    },
    methods: {
      apiItemClick(event, type) {
        event.preventDefault()
        event.stopPropagation()
        console.log(type)
      },
    }
}
</script>