<template>
    <div class="inline-block">
        <div class="ui dropdown branch"
            :class="{'active visible': visible}" v-on-clickaway="away">
            <button class="ui compact icon button"  @click="visible = !visible">
            <span class="text">Content-Type: {{ contenttype }}</span>

            <i class="dropdown icon"></i>
            </button>
            <autocomplete
                ref="autocomplete"
                :options="{keys: ['code', 'name']}"
                :visible="visible"
                placeholder="Select status code"
                :source="contentTypes"
                @selected="selected"
                label="name"
            />
        </div>
    </div>
</template>
<script>
import {contentTypes} from "~/functions/utils/commons"
export default {
  components: {
    autocomplete: () => import("~/components/ui/autocomplete")
  },
  data () {
    return {
      contentTypes,
      visible: false,
      contenttype: undefined,
    }
  },
  methods: {
      selected(val) {
        this.contenttype = val && val.type
        this.away()
      },
      away() {
          this.visible = false
      }
  },
}
</script>