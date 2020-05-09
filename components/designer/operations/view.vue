<template>
    <div>
        <v-row>
            <v-col cols="12" md="12">
                <v-textarea
                flat full-width filled
                name="input-7-4"
                label="Operation Description"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col cols="12" md="12">
            <v-tabs v-model="tab">
                <v-tab>Header</v-tab>
                <v-tab>Query params</v-tab>
                <v-tab>Request Body</v-tab>
                <v-tab-item><parameter-form /></v-tab-item>
                <v-tab-item><parameter-form /></v-tab-item>
                <v-tab-item><request-body /></v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col cols="12" md="12">
              <responses />
          </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'operationView',
    props: {
        method: String,
    },
    data() {
        return {
            tab: null
        }
    },
    components: {
        ParameterForm: () => import("../ui/paramtable"),
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