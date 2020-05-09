<template>
    <div>
        <h2>Responses</h2>
        <v-row>
            <v-col cols=12>
                <status-code-picker />
            </v-col>
        </v-row>
        <v-divider />
        <v-row>
            <v-col>
                <v-subheader>Headers</v-subheader>
                <parameter-form />
            </v-col>
        </v-row>
        <v-divider />
        <v-row>
            <v-col>
                <content-body />
            </v-col>
        </v-row>
        <!-- <div class="ui item mt-10">
            <div class="ui row">
                <content-type-picker />
                <description :oneline="true" />
            </div>
            <div class="ui item mt-10">
                <tab-example />
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
    components: {
        ParameterForm: () => import("../ui/paramtable"),
        ContentBody: () => import("../ui/contentbody"),
        //ContentTypePicker: () => import("../ui/contenttype"),
        StatusCodePicker: () => import("../ui/statuscodepicker"),
        // Description: () => import("../ui/description"),
        // TabExample: () => import("../ui/tabexample")
    },
}
</script>