import { OpenApiBuilder } from "~/functions/openapi3"
import { apimanRules } from "~/functions/openapi3/rules/apiman"
import { Spectral } from '@stoplight/spectral'
import { v4 as uuidv4 } from 'uuid';

/** DiagnosticSeverity levels
// Something not allowed by the rules of a language or other means.
Error = 0,

// Something suspicious but allowed.
Warning = 1,

// Something to inform about but not a problem.
Information = 2,

// Something to hint to a better way of doing it, like proposing
Hint = 3
**/

const sut = OpenApiBuilder.create()

export const state = () => ({
    specs: {},
    spectral: undefined,
})

export const mutations = {
    resetSpecs({ specs }) {
      specs = {}
    },

    replace({ specs }, { id, spec}) {
      specs[id] = spec
    },

    add({ specs }, spec) {
      const id = uuidv4()
      specs[id] = spec
    },

    addServer({specs}, { id, server}) {
      specs[id].servers.push(server)
    },

    removeServer({specs}, { id, index}) {
      specs[id].servers.splice(index, 1)
    },

    setInfo({ specs }, {id, info}) {
      console.log('info', id, info)
      specs[id].info = info
    }
}

export const actions = {
    async validate({}, spec) {
      Spectral.registerStaticAssets(require('@stoplight/spectral/rulesets/assets/assets.json'))
      const spectral = new Spectral();
      spectral.setRuleset({
        extends: "spectral:oas3",
        functions: [],
        exceptions: {},
        rules: apimanRules,
      });
      return await spectral.run(spec)
    },

    async build({ dispatch }, spec) {
      const oasBuilder = new OpenApiBuilder(spec)
      // for(let server of spec.servers) {
      //     sut.addServer(server)
      // }
      const specFormatted = oasBuilder.getSpec()
      // await dispatch('validate', spec)
      return specFormatted
    },

    async update({ commit, dispatch }, { id, spec }) {
      const specFormatted = await dispatch('build', spec)
      commit('replace', {id, spec: specFormatted})
    },

    async add({ commit, dispatch }, { id, spec }) {
      const specFormatted = await dispatch('build', spec)
      commit('add', specFormatted)
    },
}

