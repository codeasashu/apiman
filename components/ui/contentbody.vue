<template>
    <div>
        <v-row>
            <v-col>
                <v-menu v-if="editMode"
                    :close-on-content-click="false"
                    :nudge-width="100"
                    v-model="visible"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn small dense v-on="on">
                            <v-icon x-small left>fa fa-plus</v-icon>
                            Add Body
                        </v-btn>
                    </template>
                    <v-card>
                        <autocomplete
                          :options="{keys: ['code', 'text']}"
                          :visible="true"
                          placeholder="Filter input"
                          :source="contentTypes"
                          @selected="selected"
                          :labelFn="val => `${val.text}`"
                        ></autocomplete>
                    </v-card>
                </v-menu>
                <v-btn :disabled="runMode" small dense v-if="selectedContentType && selectedContentType.type">
                    {{ selectedContentType.type }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-if="selectedContentType && selectedContentType.type && examples">
          <v-tabs v-model="tab">
            <v-tab v-for="(example, exampleName) in examples" :key="exampleName">
              {{ exampleName }}
            </v-tab>
            <v-tab-item v-for="(example, exampleName) in examples" :key="exampleName">
              <editor-form
                :value="example"
                :contentType="selectedContentType"
                @input="editExample"
              />
            </v-tab-item>
          </v-tabs>
        </v-row>
        <v-row v-else-if="selectedContentType && selectedContentType.type && !examples">
          <v-col>
            <editor-form
              :contentType="selectedContentType"
              @input="editExample"
            />
          </v-col>
        </v-row>
        <!--  -->
    </div>
</template>
<script>
import {contentTypes as defaultContentTypes, MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
import {map} from "lodash"

const getDefault = () => defaultContentTypes

export default {
    props: {
        contentTypes: {
            type: Array[Object],
            default: () => getDefault()
        },
        mode: {
            type: String,
            default: MODE_EDIT,
        },
        value: {
          type: Object,
        },
    },
    components: {
      autocomplete: () => import("~/components/ui/autocomplete"),
      editorForm: () => import("~/components/ui/editor/editorform")
    },
    computed: {
      editMode() {
          return this.mode == MODE_EDIT
      },
      runMode() {
          return this.mode == MODE_RUN
      },
      editorType() {
        return this.selectedContentType.type == 'form' ? 'form' : 'raw'
      },
      selectedContentType: {
        get() {
          let ct = this.$props.value ? (this.$props.value.contentType || '') : ''
          return this.$props.contentTypes.filter(
            c => c.text.toLowerCase() == ct.toLowerCase()).pop()
        },
        set(val) {
          this.$emit('input', {
            contentType: val.text,
            body: this.body,
            description: ''
          })
        }
      },
      examples() {
        return this.$props.value.examples
      },
      // formParameters: {
      //   get() {
      //     let examples = []
      //     forEach(this.$props.value.examples, (value, key) => {
      //       examples
      //     })
      //     for(let example of examples) {
      //       examples[example] = map(example, (value ,key) => {key,value})
      //     }

      //   },
      //   set(val) {

      //   }
      // },
      body() {
        let ct = this.$props.value ? (this.$props.value.contentType || '') : ''
        //let p = (ct.toLowerCase() == 'form') ? this.formParameters : this.editorValue
        //console.log('body', p)
        return this.editorValue
      }
    },
    data() {
        return  {
          tab: null,
          visible: false,
          //formBody: this.$props.value,
          editorValue: "{}",
          rawInputEditorLang: 'json',
            //formParameters: [{key: '', value: '', required: true, description: ''}]
        }
    },
    // watch: {
    //   value(val) {
    //     //@TODO Object assign with default
    //     this.formBody = val
    //   }
    // },
    methods: {
      removeFormRow({ index }) {
        console.log('removingRow', index)
      },
      modelExample(example, type) {
        console.log('event', example, type)
        if(type == 'form') {
          //Convert to key-value pair
          return map(example, (value, key) => {key, value})
        }
        if(this.selectedContentType.type == 'json') {
          try {
            return JSON.stringify(example)
          } catch(error) {
            console.info(`[parse_error] ${error}`)
            return example
          }
        }
        if(this.selectedContentType.type == 'form') {
          // Forms are separated by "styles"
          return unserializeParameter(example, this.$props.value.enccoding)
        }
        //Worst case, we try to stringify the example
        return "" + example
      },
      editExample(event, type) {
        this.$emit('input', {
          contentType: this.selectedContentType.text,
          body: this.body,
          description: ''
        })
      },
      selected(val) {
          this.visible = false
          if(val)  {
              this.selectedContentType = val
              this.rawInputEditorLang = val.type
              this.$emit('selected', val)
          }
      },
      // emitModel(event) {
      //   console.log('ev', event, this.body)
      //   this.$emit('input', {
      //     contentType: this.selectedContentType.text,
      //     body: this.body,
      //     description: ''
      //   })
      // }
    }
}
</script>
