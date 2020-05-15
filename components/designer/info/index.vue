<template>
    <div>
    <v-form>
        <v-row>
            <v-col cols="12">
                <v-btn small color="error"><v-icon left x-small>fas fa-trash</v-icon> delete</v-btn>
                <v-btn small color="success" @click="save"><v-icon left x-small>fas fa-save</v-icon> save</v-btn>
                <v-divider />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols=3>
                <v-text-field label="Version" placeholder="1.0.1" v-model="info.version" flat outlined dense></v-text-field>
            </v-col>
            <v-col cols=9>
                <v-text-field label="API Name" placeholder="Cool api" v-model="info.title" flat outlined dense></v-text-field>
            </v-col>
            <v-col cols=12>
                <v-textarea
                v-model="info.description"
                flat full-width filled
                label="API Description"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-divider />
        <v-row>
            <v-col cols="12">
                <v-row><v-col>Servers <v-btn small icon @click="addServer"><v-icon x-small>fas fa-plus</v-icon></v-btn>
                </v-col></v-row>
                <v-row no-gutters class="mb-1 pb-0" v-for="(server, i) in servers" :key="i">
                    <v-col cols=8>
                        <v-text-field
                                dense
                                v-model="server.url"
                                single-line class="param-input" outlined
                                label="http://api.server.1"></v-text-field>
                    </v-col>
                    <v-col cols=3>
                        <v-text-field
                                dense
                                v-model="server.description"
                                single-line class="param-input" outlined
                                label="Localhost"></v-text-field>
                    </v-col>
                    <v-col cols=1>
                        <v-btn @click="deleteServer(i)" small offset-x icon><v-icon small>fas fa-trash</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider />
        <v-row>
            <v-col cols="12">
                <v-row><v-col>Contact Information</v-col></v-row>
                <v-row>
                    <v-col cols=4>
                        <v-text-field
                                dense
                                v-model="info.contact.name"
                                single-line class="param-input" outlined
                                label="Developer name"></v-text-field>
                    </v-col>
                    <v-col cols=4>
                        <v-text-field
                                dense
                                v-model="info.contact.url"
                                single-line class="param-input" outlined
                                label="Contact url"></v-text-field>
                    </v-col>
                    <v-col cols=4>
                        <v-text-field
                                dense
                                v-model="info.contact.email"
                                single-line class="param-input" outlined
                                label="Contact email"></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-form>
    </div>
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
import {cloneDeep} from "lodash"
export default {
    props: {
        id: {
            type: String,
            required: false,
        }
    },
    computed: {
      spec() {
        return cloneDeep(this.$store.state.spec.specs[this.$data.specid])
      },
    },
    data() {
      return {
        specid: this.$props.id,
        info: {
          title: null,
          description: null,
          version: null,
          contact: { name: null, url: null, email: null, },
        },
        servers: [{url: null, description: null}]
      }
    },
    watch: {
      spec(val) {
        if(val) {
          this.$data.info = val.info
          this.$data.servers = val.servers
        }
      }
    },
    mounted() {
      if(this.spec) {
        this.$data.info = this.spec.info
        this.$data.servers = this.spec.servers
      }
    },
    methods: {
        addServer() {
          this.servers.push({url: null, description: null})
        },
        deleteServer(index) {
          this.servers.splice(index, 1)
        },
        async save() {
          this.$toast.clear()
          if(this.id) {
            await this.$store.dispatch('spec/update', {id: this.id, spec: { info: this.info, servers: this.servers }})
          } else {
            await this.$store.dispatch('spec/add', {info: this.info, servers: this.servers})
          }
          this.$toast.success("url_invalid_format")
        }
    }
}
</script>
