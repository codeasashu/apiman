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
              <v-list-group dense v-for="(_spec, specid) in specs" :key="_spec.id" prepend-icon="fas fa-book">
                <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title> {{ _spec.info.title }} </v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item :to="`/api/${specid}/info`" dense link color="primary">
                  <v-list-item-avatar>
                    <v-icon small>fas fa-star</v-icon>
                  </v-list-item-avatar>
                    <v-list-item-content dense>
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
                <!-- <v-list-item-group v-for="(_pathInfo, _path) in _spec.paths" :key="_path" color="primary"> -->
                <v-list-item
                  v-for="(_pathInfo, _path) in _spec.paths" :key="_path"
                  color="primary" @click="apiItemClick($event, specid, _pathInfo)" two-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ _path }}
                    </v-list-item-title>
                    <!-- <v-list-item-subtitle class="text--primary">
                      <span></span>
                    </v-list-item-subtitle> -->
                    <v-list-item-subtitle class="text--primary">
                      <v-chip-group column active-class="primary--text">
                      <v-chip @click="apiItemClick($event, specid, _pathInfo, 'get')" outlined label pill link x-small>GET</v-chip>
                      <v-chip @click="apiItemClick($event, specid, _pathInfo, 'post')" outlined label pill link x-small>POST</v-chip>
                      <v-chip @click="apiItemClick($event, specid, _pathInfo, 'put')" outlined label pill link x-small>PUT</v-chip>
                      </v-chip-group>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <nuxt-link :to="`/api/${specid}/design`">Add Path</nuxt-link>
                  </v-list-item-content>
                </v-list-item>
                <!-- </v-list-item-group> -->
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
  name: 'sideNav',
  computed: {
    specs() {
      return this.$store.getters['spec/specs']
    },
    spec() {
      return this.$store.getters['spec/spec'](this.$props.id)
    },
  },
    data() {
        return {
          tab: undefined,
        }
    },
    methods: {
      apiItemClick(event, specid, pathInfo, method) {
        event.preventDefault()
        event.stopPropagation()
        method = method || 'get'
        this.$router.push({
          path: `/api/${specid}/design?pathid=${pathInfo['x-apiman-id']}&method=${method}`
        })
        //this.$store.dispatch('project/selectOperation', { pathInfo, method })
      },
    }
}
</script>
