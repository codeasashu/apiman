import { OpenApiBuilder } from "~/functions/openapi3"
import { apimanRules } from "~/functions/openapi3/rules/apiman"
import { Spectral } from '@stoplight/spectral'
import { v4 as uuidv4 } from 'uuid';
import {cloneDeep, uniq} from "lodash";
import { X_APIMAN_ID, getPathInfo, defaults } from "~/functions/utils/spec"

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

export const getters = {
  specs: (state) => state.specs,
  spec: ({ specs }) => specid => specs[specid],
  specClone: ({ specs }) => specid => cloneDeep(specs[specid]),
  servers: ({ specs }) => specid => {
    const spec = specs[specid]
    return spec ? spec.servers : []
  },
  operation: ({ specs }) => (specid, pathid, method) => {
    let { pathInfo } = getPathInfo(specs[specid], pathid)
    if(pathInfo)
      return pathInfo[method] || defaults.operation
    return defaults.operation
  },
  parameters: ({ specs }) => (specid, pathid, method, _in) => {
    const { pathInfo } = getPathInfo(specs[specid], pathid)
    let parameters = []
    if(pathInfo) {
      const operation = pathInfo[method] || defaults.operation
      parameters = operation.parameters || []
    }
    if(!!_in) {
      return parameters.filter(param => param['in'] == _in)
    }
    return parameters
  },
  specInstance: ({ specs }) => specid => specs[specid] ? new OpenApiBuilder(specs[specid]) : null,
}

export const mutations = {
    resetSpecs({ specs }) {
      specs = {}
    },

    replace({ specs }, { id, spec}) {
      specs[id] = spec
    },

    add({ specs }, spec) {
      const id = uuidv4()
      console.log('addspec4', id, spec)
      specs[id] = spec
    },

    addServer({specs}, { id, server}) {
      specs[id].servers.push(server)
    },

    removeServer({specs}, { id, index}) {
      specs[id].servers.splice(index, 1)
    },

    setInfo({ specs }, {id, info}) {
      specs[id].info = info
    },

    addPath({ specs }, {id, path, pathInfo }) {
      if(!specs[id]) return;
    },
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
      const oasBuilder = new OpenApiBuilder(Object.assign({}, sut.getSpec(), spec))
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

    async add({ commit, dispatch }, spec) {
      const specFormatted = await dispatch('build', spec)
      commit('add', specFormatted)
    },

    async removeDuplicatePath({}, { spec, pathid}) {
      let { path, pathInfo } = getPathInfo(spec, pathid)
      if(pathInfo && path) {
        // This is updating existing path, copy and delete existing and add new
        let originalSpec = cloneDeep(spec)
        delete originalSpec.paths[path]
        return originalSpec
      }
      return spec
    },

    async addPath({ dispatch, state, commit }, { id, path, pathInfo }) {
      if(!state.specs[id]) throw new Error('Spec not found');
      const pathid = pathInfo[X_APIMAN_ID] || uuidv4()
      let spec = await dispatch('build', state.specs[id])
      const specFormatted = await dispatch('removeDuplicatePath', { spec, pathid })
      spec = new OpenApiBuilder(specFormatted)
      let extraArgs = {}
      extraArgs[X_APIMAN_ID] = pathid
      spec.addPath(path, Object.assign({}, extraArgs, pathInfo))
      commit('replace', { id, spec: spec.getSpec() })
    },

    async addOperation({ dispatch, state }, { id, pathid, method, operation }) {
      if(!state.specs[id]) throw new Error('Spec not found');
      //let spec = await dispatch('build', state.specs[id])
      let { path, pathInfo } = cloneDeep(getPathInfo(state.specs[id], pathid))
      let _operation = cloneDeep(operation)
      if(!_operation.hasOwnProperty('operationId')) {
        _operation.operationId = uuidv4()
      }
      pathInfo[method] = _operation
      return await dispatch('addPath', { id, path, pathInfo })
    },

    async addMethod({ dispatch }, { id, pathid, method }) {
      return await dispatch('addOperation', { id, pathid, method, operation: {} })
    },

    async deleteMethod({ dispatch, state }, { id, pathid, method }) {
      if(!state.specs[id]) throw new Error('Spec not found');
      let { path, pathInfo } = cloneDeep(getPathInfo(state.specs[id], pathid))
      delete pathInfo[method]
      return await dispatch('addPath', { id, path, pathInfo })
    },

    async removeParameter({ dispatch, state}, { id, pathid, method, _in }) {
      if(!state.specs[id]) throw new Error('Spec not found');
      //let spec = await dispatch('build', state.specs[id])
      let { path, pathInfo } = cloneDeep(getPathInfo(state.specs[id], pathid))
      if(pathInfo) {
        let operationParams = pathInfo[method].parameters || []
        let remainingParams = operationParams.filter(op => op['in'] != _in)
        pathInfo[method].parameters = remainingParams
        console.log('replaces', pathInfo[method].parameters)
        return await dispatch('addPath', { id, path, pathInfo })
      }
    },

    async addParameter({ dispatch, state }, { id, pathid, method, parameters }) {
      if(!state.specs[id]) throw new Error('Spec not found');
      //let spec = await dispatch('build', state.specs[id])
      let { path, pathInfo } = cloneDeep(getPathInfo(state.specs[id], pathid))
      if(pathInfo) {
        let replaces = uniq(parameters.map(p => p['in']))
        let operationParams = pathInfo[method].parameters || []
        console.log('replaces1', replaces, pathInfo[method].parameters)
        let remainingParams = operationParams.filter(op => replaces.indexOf(op['in']) == -1)
        parameters = parameters.filter(p => !!p.name)
        pathInfo[method].parameters = [...remainingParams, ...parameters]
        console.log('replaces', parameters, remainingParams)
        return await dispatch('addPath', { id, path, pathInfo })
        //parameters = pathInfo[method].parameters
      }
      //pathInfo[method] = cloneDeep(operation)
    }
}

