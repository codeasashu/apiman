<template>
    <v-row>
        <v-col>
            <content-body :mode="mode" :contentTypes="requestContentTypes" />
        </v-col>
    </v-row>
</template>
<script>
import {requestContentTypes, MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
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
    },
    data() {
        return {
            requestContentTypes
        }
    }
}
</script>