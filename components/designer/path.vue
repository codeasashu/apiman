<template>
<div>
    <v-form>
        <v-row>
            <v-col cols="12">
                <v-text-field v-if="editMode" label="Operation" flat filled></v-text-field>
                <h2 v-else-if="runMode">Operation 1</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="pb-0">
                <v-row no-gutters wrap>
                    <v-col cols="3" v-if="editMode">
                        <v-select :items="servers" label="Server"
                        outlined dense flat></v-select>
                    </v-col>
                    <v-col cols="7" v-if="editMode">
                        <v-text-field label="path" dense outlined flat></v-text-field>
                    </v-col>
                    <v-col cols="10" v-if="runMode">
                        <v-text-field label="path" dense outlined flat></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn @click="showParameterTable = !showParameterTable" text>Path Params</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-form>
    <v-row v-if="showParameterTable">
        <v-col>
            <parameter-form :mode="mode" />
        </v-col>
    </v-row>
</div>
</template>
<script>
import {MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
export default {
    props: {
        mode: {
            type: String,
            default: MODE_EDIT,
        }
    },
    components: {
        ParameterForm: () => import("~/components/ui/paramtable")
    },
    computed: {
        editMode() {
            return this.mode == MODE_EDIT
        },
        runMode() {
            return this.mode == MODE_RUN
        },
    },
    data() {
        return {
            showParameterTable: false,
            servers: [
                'http://localhost',
                'https://httpbin.org',
            ]
        }
    },
}
</script>