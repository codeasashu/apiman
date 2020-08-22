<template>
  <div>
    <api-designer :id="$route.params.id" />
  </div>
</template>
<style scoped>
.column{ padding-top: 0!important;}
</style>
<script>
export default {
  async asyncData({ params, store, error }) {
    const spec = await store.state.spec.specs[params.id]
    if(!spec)
      error('Spec not found')
    //await store.dispatch("openapi/fetchSpecs")
  },
  components: {
    ApiDesigner: () => import("~/components/designer"),
  }
}
</script>
