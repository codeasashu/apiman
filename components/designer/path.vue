<template>
<div>
    <v-form>
        <v-row>
            <v-col cols="12">
                <v-text-field label="Operation" flat filled></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="pb-0">
                <v-row no-gutters wrap>
                    <v-col cols="3">
                        <v-select :items="servers" label="Server"
                        outlined dense flat></v-select>
                    </v-col>
                    <v-col cols="7">
                        <v-text-field label="path" dense outlined flat></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn @click="showParameterTable = !showParameterTable" text>Path Params</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-form>
    <v-row>
        <v-col>
            <parameter-form v-if="showParameterTable" />
            <v-divider />
        </v-col>
    </v-row>
</div>
</template>
<script>
export default {
    components: {
        ParameterForm: () => import("./ui/paramtable")
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