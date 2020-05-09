<template>
    <v-row>
        <v-col>
            <content-body :contentTypes="requestContentTypes" />
        </v-col>
    </v-row>
</template>
<script>
import {requestContentTypes} from "~/functions/utils/commons"
export default {
    components: {
        ContentBody: () => import("../ui/contentbody"),
    },
    data() {
        return {
            requestContentTypes
        }
    }
}
</script>