<template>
    <div>
        <v-card>
            <div class="d-inline-flex pa-2 text-center">
                <v-menu
                    :close-on-content-click="false"
                    :nudge-width="100"
                    v-model="visible"
                >
                <template v-slot:activator="{ on }">
                    <v-btn small dense fab v-on="on"><v-icon>fa fa-plus</v-icon></v-btn>
                </template>
                <v-card>
                    <autocomplete
                        :options="{keys: ['code', 'text']}"
                        :visible="true"
                        placeholder="Filter input"
                        :source="statusCodes"
                        @selected="selected"
                        :labelFn="val => `${val.text}`"
                    ></autocomplete>
                    <!-- <v-autocomplete
                        v-model="statuscode"
                        dense
                        flat 
                        solo
                        :items="statusCodes"
                        item-key="code"
                        item-value="code"
                        :loading="false"
                        @blur="selected"
                        search-input.sync="search"
                        placeholder="Status code"
                        clearable
                        return-object
                    ></v-autocomplete> -->
                    <!-- <v-row justify="center">
                        <v-btn @click="visible=false">Select</v-btn>
                    </v-row> -->
                </v-card>
                </v-menu>
            </div>
            <div class="d-inline-flex">
                <v-btn-toggle class="d-flex pa-2 flex-wrap" dense v-model="toggle_none">
                <v-btn v-for="(code, i) in codes" :key="i">
                    <v-icon left x-small>fa-dot-circle</v-icon>
                    {{ code }}
                </v-btn>
            </v-btn-toggle>
            </div>
        </v-card>
    </div>
</template>
<style scoped>
.menu.overflowed{
    overflow-y: auto;
    white-space: nowrap;
    max-width: 80%;
}
.inlineblock.right.floated{
    float: right;
    display: inline-block;
}
</style>
<script>
import {statusCodes} from "~/functions/utils/commons"
export default {
  components: {
    autocomplete: () => import("~/components/ui/autocomplete"),
  },
  data () {
    return {
      codes: [200,201],
      toggle_none: null,
      statusCodes,
      model: null,
      visible: false,
      items: [
          {text: '200: OK', value: 200}
      ],
      statuscode: undefined,
    }
  },
  methods: {
      selected(val) {
          this.visible = false
          console.log('stta', val)
          this.addStatusCode((val && val.code))
      },
      away() {
          this.visible = false
      },
      addStatusCode(code) {
          this.codes.push(code)
      }
  }
}
</script>