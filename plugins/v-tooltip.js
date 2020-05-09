import Vue from "vue"
import VTooltip from "v-tooltip"
import { mixin as clickaway } from 'vue-clickaway'

// We add clickaway dropdown here, since it is kind of popover

Vue.use(VTooltip)
Vue.mixin(clickaway)
