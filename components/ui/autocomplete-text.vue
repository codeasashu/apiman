<template>
    <div class="ui fluid search selection dropdown">
        <i class="dropdown icon"></i>
        <input class="search" :placeholder="placeholder" autocomplete="off" tabindex="0">
        <div class="text">{{ value }}</div>
        <autocomplete
            :placeholder="placeholder"
            :source="source"
            :spellcheck="false"
            v-model="value"
            :readonly="readonly"
        />
</template>
<script>
export default {
    components: {
        autocomplete: () => import("./autocomplete")
    },
    props: {
        placeholder: {
            type: String,
            default: "",
            required: false,
        },
        readonly: {
            type: Boolean,
            default: false,
            required: false,
        },
        source: {
            type: Array,
            required: true,
        },
        value: {
            type: String,
            default: "",
            required: false,
        },
    },
}
</script>