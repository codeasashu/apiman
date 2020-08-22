<template>
    <v-row>
        <v-col>
            {{ body }}
            <content-body v-model="body" :mode="mode" :contentTypes="requestContentTypes" />
        </v-col>
    </v-row>
</template>
<script>
import {requestContentTypes, MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
import {defaults} from "~/functions/utils/spec"
export default {
    components: {
        ContentBody: () => import("~/components/ui/contentbody"),
    },
    props: {
        method: String,
        mode: {
            type: String,
            default: MODE_EDIT,
        },
        value: {
          type: Object,
          default: defaults.operation.requestBody
        },
    },
    data() {
        return {
            requestContentTypes,
            body: Object.assign({}, defaults.operation.requestBody, this.$props.value)
        }
    },
    watch: {
      value(val) {
        this.body = Object.assign({}, defaults.operation.requestBody, val)
      }
    },
}
</script>
