<template>
  <div>
    <api-info />
  </div>
</template>
<style scoped>
.column{ padding-top: 0!important;}
</style>
<script>
export default {
  components: {
    ApiInfo: () => import("~/components/designer/info"),
  }
}
</script>
