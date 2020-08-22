<template>
<div>
    <v-form>
        <!-- <v-row>
            <v-col cols="12">
                <v-text-field v-if="editMode" label="Operation" flat filled></v-text-field>
                <h2 v-else-if="runMode">Operation 1</h2>
            </v-col>
        </v-row> -->
        <v-row>
            <v-col cols="12" class="pb-0">
                <v-row no-gutters wrap>
                    <v-col cols="3" v-if="editMode">
                        <v-select :items="servers" item-text="url" item-value="url" return-object label="Server"
                        outlined dense flat></v-select>
                    </v-col>
                    <v-col cols="7" v-if="editMode">
                        <v-text-field label="path" v-model="path" dense outlined flat></v-text-field>
                    </v-col>
                    <v-col cols="10" v-if="runMode">
                        <v-text-field label="path" dense outlined flat></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn @click="showParameterTable = !showParameterTable" text>Path Params</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-form>
    <div>
      <v-btn @click="save">Save</v-btn>
    </div>
    <v-row v-if="showParameterTable">
        <v-col>
            <parameter-form v-model="pathParameters" :mode="mode" />
        </v-col>
    </v-row>
</div>
</template>
<script>
import {MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
import {getPathParams} from "~/functions/templating"
export default {
  name: 'PathView',
    props: {
      mode: {
        type: String,
        default: MODE_EDIT,
      },
      id: {
        type: String,
        required: true,
      },
    },
    components: {
        ParameterForm: () => import("~/components/ui/paramtable")
    },
    computed: {
      editMode() {
          return this.mode == MODE_EDIT
      },
      runMode() {
          return this.mode == MODE_RUN
      },
      spec() {
        return this.$store.getters['spec/spec'](this.$props.id)
      },
      servers() {
        return this.spec && this.spec.servers
      },
      pathid () {
        return this.$route.query.pathid
      }
    },
    data() {
      return {
          showParameterTable: false,
          path: null,
          pathParameters: [],
      }
    },
    mounted() {
      this.resetPath()
    },
    watch: {
      pathid(val) {
        //console.log('val', val, this)
        this.resetPath()
      },
      path (val) {
        let pathParams = getPathParams(val)
        this.pathParameters = pathParams ? pathParams.map(param => {
          //@TODO Add example from environment variable
          return {
            name: param[1],
            in: "path",
            required: true,
            style: 'simple',
            schema: 'string',
            example: ""
          }
        }) : []
      }
    },
    methods: {
      resetPath() {
        if(this.spec && this.$route.query.pathid){
          for(let path in this.spec.paths) {
            if(this.spec.paths[path]['x-apiman-id'] == this.pathid) {
              this.path = path
              return;
            }
          }
        } else {
          this.path = null
        }
      },
      save() {
        let pathInfo = {}
        if(this.pathid) {
          pathInfo['x-apiman-id'] = this.pathid
        }
        if(this.pathParameters.length) {
          pathInfo['parameters'] = this.pathParameters
        }
        this.$store.dispatch('spec/addPath', { id: this.id, path: this.path, pathInfo })
      }
    }
}
</script>
