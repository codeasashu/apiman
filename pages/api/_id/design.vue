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
  components: {
    ApiDesigner: () => import("~/components/designer"),
  }
}
</script>
