<template>
    <v-toolbar flat color="primary" dark>
    <v-tabs
        v-model="tab"
        background-color="accent-4"
        class="elevation-2"
    >
        <v-tabs-slider></v-tabs-slider>
        <!-- <v-tab v-for="method in methods" :key="method" nuxt :to="`${specid}/${method}`"> -->
        <v-tab v-for="method in selectedMethods" :key="method" @click="selectTab(method)">
            {{ method.toUpperCase() }}
        </v-tab>
    </v-tabs>
    <v-row justify="center">
        <v-col>
            <v-menu :close-on-content-click="true" v-model="showMenu">
                <template v-slot:activator="{ on }">
                    <v-btn small dense v-on="on">
                        <v-icon x-small left>fa fa-plus</v-icon>
                        Add Method
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(method, index) in methods"
                    :key="index"
                    @click="addMethod(method)"
                    >
                        <v-list-item-title>{{ method.toUpperCase() }}</v-list-item-title>
                     </v-list-item>
                </v-list>
            </v-menu>
        </v-col>
    </v-row>
    </v-toolbar>
</template>
<script>
import {methods} from "~/functions/utils/commons"
export default {
    name: 'requestMethods',
    data() {
        return {
            tab: null,
            methods,
            selectedMethods: [],
            showMenu: false,
        }
    },
    created() {
        // this.tab = this.methods.length ? 0 : undefined
        // this.$nextTick(() => this.$emit('selected', this.methods[this.tab]))
    },
    methods: {
        triggerDropdown() {
          this.showMenu = !this.showMenu  
        },
        selectTab(method) {
            this.$emit('selected', method)
        },
        addMethod(method) {
            if(this.selectedMethods.indexOf(method.toLowerCase()) < 0) {
                this.selectedMethods.push(method.toLowerCase())
                this.tab = this.selectedMethods.indexOf(method.toLowerCase())
                this.$emit('selected', method)
            }
        }
    }
}
</script>