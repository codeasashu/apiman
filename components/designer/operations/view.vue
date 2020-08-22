<template>
    <div>
        <v-row v-if="editMode">
            <v-col cols="12" md="12">
                <v-textarea
                  v-model.lazy="description"
                  flat full-width filled
                  name="input-7-4"
                  label="Operation Description"
                ></v-textarea>
                <v-btn large color="error" class="mb-5"><v-icon left>fas fa-trash</v-icon> Delete method</v-btn>
                <v-btn @click="saveOperation" large color="success" class="mb-5"><v-icon left>fas fa-trash</v-icon> Save method</v-btn>

                <v-divider />

            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-tabs v-model="tab">
                <v-tab>Header</v-tab>
                <v-tab>Query params</v-tab>
                <v-tab>Request Body</v-tab>
                <v-tab-item>
                  <parameter-form
                    v-model.lazy="headerParameters"
                    :mode="mode"
                    @removerow="removeHeader"
                  />
                </v-tab-item>
                <v-tab-item>
                   <parameter-form
                    v-model.lazy="queryParameters"
                    :mode="mode"
                    @removerow="removeQuery"
                  />
                </v-tab-item>
                <v-tab-item>
                  <request-body
                    :mode="mode"
                    v-model.lazy="bodyParameters"
                  />
                </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
              <v-divider />
              <responses :mode="mode" />
          </v-col>
        </v-row>
    </div>
</template>
<script>
import {MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
import { getPathInfo, defaults, toSpecParam, toNativeParam, toNativeBody } from "~/functions/utils/spec"
export default {
    name: 'operationView',
    props: {
        method: String,
        mode: {
            type: String,
            default: MODE_EDIT,
        },
    },
    data() {
      return {
        tab: null,
        // operation: {},
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      spec() {
        return this.$store.getters['spec/specClone'](this.id)
      },
      pathid () {
        return this.$route.query.pathid
      },
      editMode() {
        return this.mode == MODE_EDIT
      },
      runMode() {
        return this.mode == MODE_RUN
      },
      operation() {
        return this.$store.getters['spec/operation'](this.id, this.pathid, this.method)
      },
      description: {
        get() {
          return this.operation.description || ""
        },
        set(val) {
          this.$store.dispatch('spec/addOperation', {
            id: this.id,
            pathid: this.pathid,
            method: this.method,
            operation: Object.assign({}, this.operation, { description: val })
          })
        }
      },
      parameters: {
        get() {
          return this.$store.getters['spec/parameters'](this.id, this.pathid, this.method)
        }
      },
      headerParameters: {
        get() {
          let headers = toNativeParam(this.parameters, 'header')
          if(!headers.length) {
            return [...headers, ...[{key: '', value: '', required: true, description: ''}]]
          }
          return headers
        },
        set(val) {
          if(val && val.length) {
            let headers = toSpecParam(val, 'header')
            this.$store.dispatch('spec/addParameter', {
              id: this.id,
              pathid: this.pathid,
              method: this.method,
              parameters: headers
            })
          }
        }
      },
      queryParameters: {
        get() {
          let queries = toNativeParam(this.parameters, 'query')
          if(!queries.length) {
            return [...queries, ...[{key: '', value: '', required: true, description: ''}]]
          }
          return queries
        },
        set(val) {
          if(val && val.length) {
            let queries = toSpecParam(val, 'query')
            this.$store.dispatch('spec/addParameter', {
              id: this.id,
              pathid: this.pathid,
              method: this.method,
              parameters: queries
            })
          }
        }
      },
      bodyParameters: {
        get() {
          let bodyParam = toNativeBody(this.operation.requestBody)
          console.log('bp', bodyParam)
          return bodyParam
        },
        set(val) {
          console.log('rbb', val)
        }
      }
    },
    // watch: {
    //   method(val) {
    //     this.setOperation()
    //     console.log('meethod has changed', val)
    //   },
    //   pathid(val) {
    //     this.setOperation()
    //     console.log('pathid has changed', val)
    //   }
    // },
    mounted() {
      //this.setOperation()
    },
    components: {
        ParameterForm: () => import("~/components/ui/paramtable"),
        Params: () => import("./parameters"),
        RequestBody: () => import("./requestbody"),
        Responses: () => import("./responses"),
    },
    methods: {
      setOperation() {
        const { pathInfo } = getPathInfo(this.spec, this.pathid)
        if(pathInfo) {
          console.log('pp', defaults.operation, (this.method || 'get'), pathInfo[(this.method || 'get')])
          this.$data.operation = pathInfo[(this.method || 'get')] || defaults.operation
        }
      },
      saveOperation() {
        this.$store.dispatch('spec/addOperation', {
          id: this.id,
          pathid: this.pathid,
          method: this.method,
          operation: {
            description: this.description,
          },
        })
      },
      removeHeader({ index }) {
        let remainingParams = this.headerParameters.filter((h, i) => i != index)
        if(!remainingParams.length)
          remainingParams = [{key: '', value: '', required: true, description: ''}]
        this.headerParameters = remainingParams
      },
      removeQuery({ index }) {
        let remainingParams = this.queryParameters.filter((h, i) => i != index)
        if(!remainingParams.length)
          remainingParams = [{key: '', value: '', required: true, description: ''}]
        this.queryParameters = remainingParams
      },
      selectedParam(tab) {
        console.log('selectedTab', tab)
      }
    }
}
</script>
