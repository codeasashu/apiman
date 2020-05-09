<template>
    <div class="ui dropdown branch compact icon button"
        :class="{'active visible': visible}">
        <span class="text" @click="visible = !visible">{{ placeholder }} {{value }}</span>
        <i class="dropdown icon"></i>

        <autocomplete
            ref="autocomplete"
            :options="options"
            :visible="visible"
            :placeholder="placeholder"
            :source="source"
            :spellcheck="false"
            :value="value"
            :readonly="readonly"
            @selected="selected"
            :labelFn="val => `${val.code}: ${val.text}`"
        />
    </div>
</template>
<script>
export default {
    data () {
        return {
            visible: false
        }
    },
    components: {
        autocomplete: () => import("./autocomplete")
    },
    props: {
        options: {
            type: Object,
            default: {},
        },
        value: {
            type: String,
            default: "",
            required: false,
        },
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
    },
    methods: {
        selected(event) {
            this.visible = false
        }
    },
}
</script>