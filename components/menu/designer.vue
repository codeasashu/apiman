<template>
    <div>
        <div class="four wide column">
            <delete-button :showText="true" />
        </div>
        <div class="twelve wide column right floated">
            <button class="ui small button">Try</button>
            <button class="ui small button">Documentation</button>
        </div>
    </div>
</template>
<style scoped>
.right.floated > button {
    float: right;
}
</style>
<script>
export default {
    components: {
        DeleteButton: () => import("~/components/ui/delete")
    }
}
</script>