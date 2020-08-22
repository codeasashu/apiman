<template>
  <div>
    <parameter-form
      v-if="editorType == 'form'"
      :value="example"
      @input="editExample"
      @removerow="removeFormRow"
      :mode="mode"
    />
    <Editor
      v-else
      :value="example"
      @input="editExample"
      :lang="rawInputEditorLang"
      :options="{
        maxLines: '16',
        minLines: '8',
        fontSize: '16px',
        autoScrollEditorIntoView: true,
        showPrintMargin: false,
        useWorker: false,
        readOnly: runMode,
      }"
    />
  </div>
</template>
<script>
import {MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
import AceEditor from "~/components/ui/editor"
import { unserializeParameter } from "~/functions/utils/spec"
import {map, isString, isArray} from "lodash"
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    contentType: {
      type: Object,
      default: () => { return {type: 'json', text: 'application/json'}},
    },
    encoding: {
      type: Object,
      default: () => { return {style: 'form', explode: true} },
    },
    mode: {
      type: String,
      default: MODE_EDIT,
    },
  },
  components: {
    ParameterForm: () => import("~/components/ui/paramtable"),
    Editor: AceEditor,
  },
  data() {
    return {
      rawInputEditorLang: this.$props.contentType.type
    }
  },
  computed: {
    runMode() {
      return this.$props.mode == MODE_RUN
    },
    editorType() {
      return this.contentType.type == 'form' ? 'form' : 'raw'
    },
    example() {
      let _example = this.$props.value
      if(this.editorType == 'form') {
        //Convert to key-value pair
        let fields = map(_example, (value, key) => {key, value})
        return fields.length ? fields : [{key: '', value: '', required: true, description: ''}]
      }
      if(this.contentType.type == 'json') {
        try {
          return JSON.stringify(_example)
        } catch(error) {
          console.info(`[parse_error] ${error}`)
          return _example
        }
      }
      if(this.contentType.type == 'form') {
        // Forms are separated by "styles"
        return unserializeParameter(_example, this.$props.encoding)
      }
      //Worst case, we try to stringify the example
      return _example ? "" + _example : ""
    }
  },
  watch: {
    contentType(val) {
      this.rawInputEditorLang = (val && val.type) || 'json'
    }
  },
  methods: {
    editExample(event) {
      this.$emit('input', event)
      console.log('form', event)
    },
    removeFormRow({ index }) {
      console.log('removing row', index)
      let remainingExample = this.example.filter((h, i) => i != index)
      //Form have `example` in array, we will try to remove the index
      this.example = remainingExample
      // try{
      //   _example = isString(this.example) ? JSON.parse(this.example) : this.example
      // } catch(error) {
      //   console.error('[json_parse_error]', error)
      //   _example = []
      // }
      // this.example.splice(index, 1)
    },
  }
}
</script>
