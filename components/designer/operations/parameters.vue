<template>
    <div>
        <v-tabs v-model="tab">
            <v-tab>Header</v-tab>
            <v-tab>Qury params</v-tab>
            <v-tab-item>
                <parameter-form />
            </v-tab-item>
            <v-tab-item>
                <parameter-form />
            </v-tab-item>
        </v-tabs>
    </div>
</template>
<script>
export default {
    components: {
        ParameterForm: () => import("../ui/paramtable"),
    }
}
</script>