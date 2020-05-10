<template>
  <div>
    <v-row>
      <v-col cols="12">
        <operation-toolbar @run="run_api" />
        <v-divider />
      </v-col>
    </v-row>
    <v-row align="stretch" justify="center">
      <v-col :cols="12" v-if="runapi">
        <path-view mode="run" />
        <operation-view mode="run" />
      </v-col>
      <v-col :cols="12" v-else>
        <path-view />
        <operation-view />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
    components: {
        DesignerMenu: () => import("../menu/designer"),
        PathView: () => import("./path"),
        OperationView: () => import("./operations"),
        operationToolbar: () => import("./operations/toolbar"),
    },
    data() {
      return {
        operationCols: 12,
        runapi: false,
      }
    },
    methods: {
      run_api(run) {
        this.operationCols = run ?  6 : 12
        this.runapi = run
      }
    }
}
</script>