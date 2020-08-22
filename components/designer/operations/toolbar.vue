<template>
    <div>
        <v-row>
            <v-col cols=4>
                <v-btn small color="error"><v-icon left x-small>fas fa-trash</v-icon> delete</v-btn>
                <v-btn small color="success"><v-icon left x-small>fas fa-save</v-icon> save</v-btn>
            </v-col>
            <v-col cols=8 align="right">
                <v-btn @click="fullscreen = false" small v-if="!!fullscreen"><v-icon x-small>fas fa-compress-alt</v-icon></v-btn>
                <v-btn @click="fullscreen = true" small v-if="fullscreen == false"><v-icon x-small>fas fa-expand</v-icon></v-btn>
                <v-btn small><v-icon left x-small>fas fa-book-open</v-icon> docs</v-btn>
                <v-btn small><v-icon left x-small>fas fa-flask</v-icon> mock</v-btn>
                <v-btn-toggle :value="toggleBtn('run')">
                    <v-btn small @click.prevent="sendEvent('run')">
                        <v-icon left x-small>fas fa-fighter-jet</v-icon>
                        run
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            runapi: false,
        }
    },
    computed: {
        fullscreen: {
            get() {
                return this.$store.getters['project/fullscreen']
            },
            set(value) {
                this.$store.commit('project/fullscreen', value)
            }
        }
    },
    methods: {
        toggleBtn(name) {
            return (!!this.$data[name]) ? 0: undefined
        },
        sendEvent(name) {
            if(!this.$data.hasOwnProperty(name)) this.$data[name] = true
            else this.$data[name] = !this.$data[name]
            this.$emit(name, this.$data[name])
        }
    }
}
</script>