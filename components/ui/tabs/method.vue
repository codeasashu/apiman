<template>
    <v-toolbar flat color="primary" dark>
    <v-tabs
        v-model="tab"
        background-color="accent-4"
        class="elevation-2"
    >
        <v-tabs-slider></v-tabs-slider>
        <!-- <v-tab v-for="method in methods" :key="method" nuxt :to="`${specid}/${method}`"> -->
        <v-tab v-for="(method, index) in selectedMethods" :key="method" @click="selectTab(method)">
            {{ method.toUpperCase() }}
            <v-btn @click.prevent="deleteMethod($event, method)" v-if="tab == index" icon small><v-icon small>fas fa-trash</v-icon></v-btn>
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
import { getPathInfo } from "~/functions/utils/spec"
import {intersection} from "lodash"
export default {
    name: 'requestMethods',
    data() {
        return {
            tab: null,
            methods,
            //selectedMethods: [],
            showMenu: false,
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
      selectedMethods: {
        get() {
          const { pathInfo } = getPathInfo(this.spec, this.pathid)
          const pathMethods = pathInfo ? Object.keys(pathInfo) : []
          return pathMethods ? intersection(pathMethods, methods) : pathMethods
        },
        set(val) {
          this.$store.dispatch('spec/addMethod', { id: this.id, pathid: this.pathid, method: val })
        }
      },
      highlightedMethod() {
        if(this.selectedMethods.indexOf(this.$route.query.method) >= 0){
          return this.$route.query.method.toLowerCase()
        }
        return this.selectedMethods[0]
      },
    },
    created() {
        // this.tab = this.methods.length ? 0 : undefined
        // this.$nextTick(() => this.$emit('selected', this.methods[this.tab]))
    },
    mounted() {
      // const { pathInfo } = getPathInfo(this.spec, this.pathid)
      // const pathMethods = Object.keys(pathInfo)
      // if(pathMethods.length) {
      //   this.selectedMethods = intersection(pathMethods, methods)
      // }
      if(this.highlightedMethod) {
        this.$emit('selected', this.highlightedMethod)
        this.tab = this.methods.indexOf(this.highlightedMethod)
      }
      //console.log('methods', methods)
    },
    watch: {
      // selectedMethods(val) {
      //   if(val.length)
      //     this.$emit('selected', val[0])
      // },
      highlightedMethod(val) {
        console.log('changed', val)
        if(val){
          this.tab = this.methods.indexOf(val)
          this.$emit('selected', val)
        }
      }
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
        },
        deleteMethod(event, method) {
          event.preventDefault()
          event.stopPropagation()
          if(confirm("Sure?")) {
            this.$store.dispatch('spec/deleteMethod', { id: this.id, pathid: this.pathid, method })
          }
        }
    }
}
</script>
