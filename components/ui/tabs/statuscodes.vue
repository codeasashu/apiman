<template>
    <div>
        <v-card>
            <div v-if="editMode" class="d-inline-flex pa-2 text-center">
                <v-menu
                    :close-on-content-click="false"
                    :nudge-width="100"
                    v-model="visible"
                >
                <template v-slot:activator="{ on }">
                    <v-btn dense fab v-on="on"><v-icon>fa fa-plus</v-icon></v-btn>
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
                </v-card>
                </v-menu>
            </div>
            <div class="d-inline-flex">
                <v-btn-toggle class="d-flex pa-2 flex-wrap" dense v-model="toggle_none">
                <v-btn :disabled="runMode" v-for="(code, i) in codes" :key="i">
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
import {statusCodes, MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
export default {
  components: {
    autocomplete: () => import("~/components/ui/autocomplete"),
  },
  props: {
        method: String,
        mode: {
            type: String,
            default: MODE_EDIT,
        },
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
  computed: {
        editMode() {
            return this.mode == MODE_EDIT
        },
        runMode() {
            return this.mode == MODE_RUN
        },
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