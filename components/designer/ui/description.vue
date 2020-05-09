<template>
    <div class="p-0">
        <v-text-field v-model="content" @input="handleInput" solo dense placeholder="Description..." v-if="!!oneline" />
        <v-textarea v-model="content" @input="handleInput" solo dense v-else rows=3 cols=40 placeholder="Description..."></v-textarea>
    </div>
</template>
<script>
export default {
    props: {
        oneline: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            content: this.value
        }
    },
    methods: {
        handleInput (e) {
            this.$emit('input', this.content)
        }
    }
}
</script>