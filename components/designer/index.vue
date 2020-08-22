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
        <path-view :id="id" mode="run" />
        <operation-view :id="id" mode="run" />
      </v-col>
      <v-col :cols="12" v-else>
        <path-view :id="id" />
        <operation-view :id="id" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    }
  },
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
