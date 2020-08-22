<template>
    <v-popover class="inline-block">
        <a class="ui button" :class="{'small': !!showText, 'icon': !showText}">
            <i class="trash icon"></i>
            <span v-if="showText">{{ btnText }}</span>
        </a>
        <template slot="popover">
            <button class="ui button">Yes</button>
            <button class="ui button">No</button>
        </template>
    </v-popover>
</template>
<script>
export default {
    name: 'DeleteBtn',
    props: {
        showText: {
            type: Boolean,
            default: false
        },
        btnText: {
            type: String,
            default: 'delete',
        }
    }
}
</script>