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
          <v-list dense>
            <template>
              <v-list-group>
                <template v-slot:activator>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon v-text="'fas fa-book'"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        ABC
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
      }
    }
}
</script>