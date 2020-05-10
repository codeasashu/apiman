<template>
    <div>
        <v-row v-if="editMode">
            <v-col cols="12" md="12">
                <v-textarea
                flat full-width filled
                name="input-7-4"
                label="Operation Description"
                ></v-textarea>
                <v-btn large color="error" class="mb-5"><v-icon left>fas fa-trash</v-icon> Delete method</v-btn>
                
                <v-divider />

            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-tabs v-model="tab">
                <v-tab>Header</v-tab>
                <v-tab>Query params</v-tab>
                <v-tab>Request Body</v-tab>
                <v-tab-item><parameter-form :mode="mode" /></v-tab-item>
                <v-tab-item><parameter-form :mode="mode" /></v-tab-item>
                <v-tab-item><request-body :mode="mode" /></v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
              <v-divider />
              <responses :mode="mode" />
          </v-col>
        </v-row>
    </div>
</template>
<script>
import {MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
export default {
    name: 'operationView',
    props: {
        method: String,
        mode: {
            type: String,
            default: MODE_EDIT,
        },
    },
    data() {
        return {
            tab: null
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
    watch: {
        method(val) {
            console.log('meethod has changed', val)
        }
    },
    components: {
        ParameterForm: () => import("~/components/ui/paramtable"),
        Params: () => import("./parameters"),
        RequestBody: () => import("./requestbody"),
        Responses: () => import("./responses"),
    },
    methods: {
        selectedParam(tab) {
            console.log('selectedTab', tab)
        }
    }
}
</script>