<template>
    <div>
        <h2>Responses</h2>
        <v-row>
            <v-col cols=12>
                <status-codes :mode="mode" />
            </v-col>
        </v-row>
        <v-divider />
        <v-row>
            <v-col>
                <v-subheader>Headers</v-subheader>
                <parameter-form :mode="mode" :readonly="runMode" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-divider />
                <content-body :mode="mode" />
            </v-col>
        </v-row>
    </div>
</template>
<script>
import {MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
export default {
    props: {
        method: String,
        mode: {
            type: String,
            default: MODE_EDIT,
        },
    },
    computed: {
        editMode() {
            return this.mode == MODE_EDIT
        },
        runMode() {
            return this.mode == MODE_RUN
        },
    },
    components: {
        ParameterForm: () => import("~/components/ui/paramtable"),
        ContentBody: () => import("~/components/ui/contentbody"),
        StatusCodes: () => import("~/components/ui/tabs/statuscodes"),
    },
}
</script>