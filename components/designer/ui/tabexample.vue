<template>
    <div>
        <div class="ui top attached tabular menu grid">
            <a class="item" :class="{'active': (index == 0)}" v-for="(item, index) in items" :key="index">
                {{ item }}
            </a>
            <div class="menu">
                <div class="item">
                    <button @click="addItems" class="ui button transparent icon"> 
                        <i class="plus link icon"></i> Add Example
                    </button>
                </div>
            </div>
        </div>
        <div class="ui bottom attached segment">
                <div class="ui right action input">
                    <input type="text" />
                    <a class="ui icon button" v-tooltip="'Copy to clipboard'">
                        <i class="trash icon"></i>
                    </a>
                </div>
                <Editor
                    v-model="editorValue"
                    :lang="rawInputEditorLang"
                    :options="{
                      readOnly: true,
                      maxLines: '16',
                      minLines: '8',
                      fontSize: '16px',
                      autoScrollEditorIntoView: true,
                      showPrintMargin: false,
                      useWorker: false,
                    }"
                  />
        </div>
    </div>
</template>
<script>
import AceEditor from "~/components/designer/ui/editor"
export default {
    components: {
        Editor: AceEditor
    },
    data() {
        return {
            items: ["Bio", "Photos"],
            editorValue: "{}",
            rawInputEditorLang: 'json',
        }
    },

    methods: {
        addItems() {
            this.items.push('Random')
        }
    }
}
</script>