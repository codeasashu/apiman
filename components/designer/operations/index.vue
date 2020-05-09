<template>
    <div>
        <v-tabs
            v-model="tab"
            background-color="accent-4"
            class="elevation-2"
            dark>
            <v-tabs-slider></v-tabs-slider>
            <!-- <v-tab v-for="method in methods" :key="method" nuxt :to="`${specid}/${method}`"> -->
            <v-tab v-for="method in methods" :key="method">
                {{ method.toUpperCase() }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item :transition="false" :reverse-transition="false"
                v-for="method in methods"
                :key="method"
            >
                <operation-view :method="method" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>
<script>
import {methods} from "~/functions/utils/commons"
export default {
    components: {
        OperationView: () => import("./view")
    },
    data() {
        return {
            methods,
            method: undefined,
            loading: false,
            tab: null,
        }
    },
}
</script>
