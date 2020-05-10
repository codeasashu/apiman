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
        <v-row v-if="selectedContentType && selectedContentType.type &&
            (!selectedContentType.hasOwnProperty('table') || !selectedContentType.table)">
            <v-col>
                <Editor
                    v-model="editorValue"
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
            </v-col>
        </v-row>
        <v-row v-if="selectedContentType && selectedContentType.type && !!selectedContentType.table">
            <v-col>
                <parameter-form :mode="mode" />
            </v-col>
        </v-row>
    </div>
</template>
<script>
import {contentTypes, MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
import AceEditor from "~/components/ui/editor"

const getDefault = () => contentTypes

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
    },
    components: {
        ParameterForm: () => import("~/components/ui/paramtable"),
        autocomplete: () => import("~/components/ui/autocomplete"),
        Editor: AceEditor,
    },
    computed: {
        editMode() {
            return this.mode == MODE_EDIT
        },
        runMode() {
            return this.mode == MODE_RUN
        },
    },
    data() {
        return  {
            visible: false,
            selectedContentType: undefined,
            editorValue: "{}",
            rawInputEditorLang: 'json',
        }
    },
    methods: {
        selected(val) {
            this.visible = false
            if(val)  {
                this.selectedContentType = val
                this.rawInputEditorLang = val.type
                this.$emit('selected', val)
            }
        }
    }
}
</script>