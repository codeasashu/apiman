<template>
    <tabs @selected="selectMethod" :classes="['top attached']">
        <tab :selected="true" :id="method" :label="method.toUpperCase()" v-for="method in methods" :key="method">
            {{ method }}
        </tab>
    </tabs>
</template>
<script>
import {methods} from "~/functions/utils/commons"
import tabs from "~/components/ui/tabs"
export default {
    name: 'requestMethods',
    components: {
        tabs: () => import("~/components/ui/tabs"),
        tab: () => import("~/components/ui/tab"),
    },
    data() {
        return {
            methods,
            selectedMethod: methods[0]
        }
    },
    created() {
        this.$nextTick(() => this.$emit('selectedMethod', this.methods[0]))
    },
    methods: {
        selectMethod(method) {
            this.$emit('selectedMethod', method)
            this.selectedMethod = method
        }
    }
}
</script>