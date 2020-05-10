<template>
    <v-form>
        <v-card>
            <v-simple-table light fixed-header>
                <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">Key</th>
                    <th class="text-left">Value</th>
                    <th v-if="!readonly" class="text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(param, i) in params" :key="i">
                        <td>
                            <v-text-field :readonly="readonly" height="30" v-model="param.key" single-line class="param-input" outlined dense label="Name"></v-text-field>
                        </td>
                        <td>
                            <v-text-field :readonly="readonly" height="30" v-model="param.value" single-line class="param-input" outlined dense label="Value"></v-text-field>
                        </td>
                        <td v-if="!readonly">
                            <v-btn-toggle v-if="editMode" dense :value="(param.required == true) ? 0 : undefined">
                                <v-btn @click.prevent="toggleRequred(param)" icon small sm>
                                    <v-icon small>fas fa-asterisk</v-icon></v-btn>
                            </v-btn-toggle>
                            <v-menu v-if="editMode"
                                :close-on-content-click="false"
                                :nudge-width="100"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn small icon @click="editParam(param)" v-on="on"><v-icon small>fas fa-pen</v-icon></v-btn>
                                </template>
                                <v-card>
                                    <param-description :oneline="false" v-model="param.description" />
                                </v-card>
                            </v-menu>
                            
                            <v-popover class="inline-block">
                                <v-btn small icon><v-icon small>fas fa-trash</v-icon></v-btn>
                                <template slot="popover">
                                    <v-btn @click.prevent="removeRow(i)" x-small>Yes</v-btn>
                                    <v-btn x-small>No</v-btn>
                                </template>
                            </v-popover>
                            <v-btn @click.prevent="addRow" small icon sm><v-icon small>fas fa-plus</v-icon></v-btn>
                        </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>  
        </v-card>
    </v-form>
</template>
<style>
.param-input .v-input__control{
  height: 30px !important;
}
.param-input .v-input__control .v-input__slot{
    height: 30px!important;
    min-height: 30px!important;
}
.param-input .v-label {
    top: 6px!important;
}
</style>
<script>
import {MODE_EDIT, MODE_RUN} from "~/functions/utils/commons"
export default {
    props: {
        mode: {
            type: String,
            default: MODE_EDIT,
        },
        readonly: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        deleteIcon: () => import("./delete"),
        paramDescription: () => import("./description")
    },
    computed: {
        editMode() {
            return this.mode == MODE_EDIT
        },
    },
    data() {
        return {
            params: [
                {key: "", value: "", description: "", required: true}
            ],
        }
    },
    methods: {
        editParam(param) {
            //Show modal param.description
        },
        addRow() {
            this.params.push({key: "", value: "", description: ""})
        },
        removeRow(index) {
            (this.params.length > 1) && this.params.splice(index, 1)
            return true
        },
        toggleRequred(param) {
            param.required = !param.required
        }
    }
}
</script>