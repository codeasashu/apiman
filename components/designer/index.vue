<template>
    <v-row>
      <v-col cols="8">
        <operation-toolbar />
        <v-divider />
        <path-view />
        <operation-view />
      </v-col>
    </v-row>
</template>
<script>
export default {
    components: {
        DesignerMenu: () => import("../menu/designer"),
        PathView: () => import("./path"),
        OperationView: () => import("./operations"),
        operationToolbar: () => import("./operations/toolbar"),
    }
}
</script>