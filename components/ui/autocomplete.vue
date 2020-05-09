<template>
    <div class="menu autocomplete-wrapper"
        :class="{'visible': visible}"
        :style="{'display:block;': visible}"
        v-show="visible">
        <div class="ui icon search input" v-show="search">
            <i class="search icon"></i>
            <v-text-field outlined dense
                :placeholder="placeholder"
                v-model="text"
                @input="updateSuggestions"
                @keyup="updateSuggestions"
                @click="updateSuggestions"
                @keydown="handleKeystroke"
                ref="acInput"
                :spellcheck="spellcheck"
                :autocapitalize="spellcheck"
                :autocorrect="spellcheck"
            />
        </div>
        <v-divider></v-divider>
        <!-- :style="{ transform: `translate(${suggestionsOffsetLeft}px, 0)` }" -->
        <!-- <div class="scrolling menu visible suggestions" v-if="suggestions.length > 0 && suggestionsVisible"> -->
        <v-list dense>    
            <v-list-item class="item"
                v-for="(suggestion, index) in suggestions"
                @click.prevent="forceSuggestion(suggestion)"
                :class="{ active: currentSuggestionIndex === index }"
                :key="index"
            >
                {{ label && suggestion[label] ? labelFn(suggestion[label]) : labelFn(suggestion) }}
            </v-list-item>
        </v-list>
        <!-- </div> -->
    </div>
</template>
<script>
const KEY_TAB = 9
const KEY_ESC = 27

const KEY_ARROW_UP = 38
const KEY_ARROW_DOWN = 40

import {defaultOptions} from "~/functions/search"
import Fuse from "fuse.js"

export default {
  name: 'autocomplete',
  props: {
    options: {
        type: Object,
        default: {},
    },
    visible: {
        type: Boolean,
        default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
    header: {
      type: String,
      default: undefined,
    },
    search: {
        type: Boolean,
        default: true,
    },
    spellcheck: {
      type: Boolean,
      default: true,
      required: false,
    },

    placeholder: {
      type: String,
      default: "",
      required: false,
    },

    source: {
      type: Array,
      required: true,
    },

    value: {
      type: String,
      default: "",
      required: false,
    },

    labelFn: {
        type: Function,
        required: false,
        default: val => val
    }
  },

  watch: {
    text() {
      this.$emit("input", this.text)
    },
  },

  data() {
    return {
      searcher: undefined,
      text: this.value,
      selectionStart: 0,
      suggestionsOffsetLeft: 0,
      currentSuggestionIndex: -1,
      suggestionsVisible: false,
    }
  },

  methods: {
    updateSuggestions(event) {
      // Hide suggestions if ESC pressed.
      if (event.which && event.which === KEY_ESC) {
        event.preventDefault()
        this.suggestionsVisible = false
        this.currentSuggestionIndex = -1
        return
      }

      // As suggestions is a reactive property, this implicitly
      // causes suggestions to update.
      this.selectionStart = this.$refs.acInput.selectionStart
      this.suggestionsOffsetLeft = 12 * this.selectionStart
      this.suggestionsVisible = true
    },

    forceSuggestion(text) {
    //   let input = this.text.substring(0, this.selectionStart)
    //   this.text = input + text

    //   this.selectionStart = this.text.length
    //   this.suggestionsVisible = true
    //   this.currentSuggestionIndex = -1

      this.$emit('selected', text)
      this.text = ''
    },

    handleKeystroke(event) {
      switch (event.which) {
        case KEY_ARROW_UP:
          event.preventDefault()
          this.currentSuggestionIndex =
            this.currentSuggestionIndex - 1 >= 0 ? this.currentSuggestionIndex - 1 : 0
          break

        case KEY_ARROW_DOWN:
          event.preventDefault()
          this.currentSuggestionIndex =
            this.currentSuggestionIndex < this.suggestions.length - 1
              ? this.currentSuggestionIndex + 1
              : this.suggestions.length - 1
          break

        case KEY_TAB:
          event.preventDefault()
          let activeSuggestion = this.suggestions[
            this.currentSuggestionIndex >= 0 ? this.currentSuggestionIndex : 0
          ]
          if (activeSuggestion) {
            let input = this.text.substring(0, this.selectionStart)
            this.text = input + activeSuggestion
          }
          break

        default:
          break
      }
    },
    modifier (val) {
        return this.labelFn ? val.map(this.labelFn) : val
    },
    clearInput() {
        this.text = ''
    }
  },

  computed: {
    /**
     * Gets the suggestions list to be displayed under the input box.
     *
     * @returns {default.props.source|{type, required}}
     */
    suggestions() {
      // let input = this.text.substring(0, this.selectionStart)
      if(this.text) {
          let results = this.searcher.search(this.text)
          return results.map(item => item['item'])
      }
      return this.source

      

    //   return (
    //     this.source
    //       .filter(entry => {
    //         return (
    //           entry.toLowerCase().startsWith(input.toLowerCase())
    //         //  input.toLowerCase() !== entry.toLowerCase()
    //         )
    //       })
    //       // Cut off the part that's already been typed.
    //       .map(entry => entry.substring(this.selectionStart))
    //       // We only want the top 6 suggestions.
    //       .slice(0, 6)
    //   )
    },
  },

  mounted() {
    this.searcher = new Fuse(this.source, {...this.options})
    this.clearInput()
    this.updateSuggestions({
      target: this.$refs.acInput,
    })
  },
    created () {
        document.addEventListener('click', this.documentClick)
    },
    destroyed () {
        // important to clean up!!
        document.removeEventListener('click', this.documentClick)
    },
}
</script>
