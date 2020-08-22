<template>
    <div>
        <method-tabs ref="methodComponent" @selected="selectMethod" />
        <operation-view v-if="method" :method="method" :mode="mode" />
        <v-container full-height v-else>
            <v-row class="flex-child" align="center" justify="center">
                <v-card class="d-flex" justify="center" height="300" width="100%">
                    <v-row justify="center" align="center">
                        <v-btn @click="addMethod" primary class="success"><v-icon left>fas fa-plus</v-icon> Add Method </v-btn>
                    </v-row>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import {MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
export default {
    props: {
      mode: {
        type: String,
        default: MODE_EDIT,
      },
    },
    components: {
        MethodTabs: () => import("~/components/ui/tabs/method"),
        OperationView: () => import("./view"),
    },
    data() {
        return {
            method: null,
            loading: false,
            //tab: null,
        }
    },
    computed: {
      editMode() {
        return this.mode == MODE_EDIT
      },
      runMode() {
        return this.mode == MODE_RUN
      },
    },
    methods: {
        selectMethod(method) {
          this.method = method
        },
        addMethod() {
            // Add a default GET method
            this.$refs.methodComponent.triggerDropdown()
        }
    }
}
</script>
