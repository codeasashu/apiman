<template>
  <div>
    <api-designer />
  </div>
</template>
<style scoped>
.column{ padding-top: 0!important;}
</style>
<script>
export default {
  async asyncData({ store }) {
    await store.dispatch("openapi/fetchSpecs")
  },
  components: {
    ApiDesigner: () => import("~/components/designer"),
  }
}
</script>