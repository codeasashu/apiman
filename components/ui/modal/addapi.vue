<template>
    <v-card>
        <v-form ref="form" v-model="specform.valid">
        <v-card-title>
            <span class="headline">Add API</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="API Name*" v-model="specform.name" :rules="rules.title" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
        </v-form>
    </v-card>
</template>
<script>
export default {
    data () {
        return {
            specform: {
                valid: false,
                name: null,
            },
            rules: {
                title: [
                    v => !!v || 'API name is required',
                    v => (v && v.length <= 20) || 'API name must be less than 20 characters',
                ],
            }
        }
    },
    mounted() {
        
    },
    methods: {
        close() {
            this.$emit('close')
            this.$refs.form.reset()
        },
        save() {
            if(this.$refs.form.validate()) {
                this.$emit('save', this.specform)
            }
            this.$refs.form.reset()
        }
    }
}
</script>