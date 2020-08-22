import Vue from "vue"

export const state = () => ({
  response: undefined,
  selectedVersion: {},
  specs: [],
})

const getid = spec => spec["x-internal-id"]

export const mutations = {
  replace(state, specs) {
    state.specs = specs
  },

  setInfo(state, { specid, info }) {
    state.specs.forEach((_spec, key) => {
      if (getid(_spec) == specid) {
        console.log("setinfo", Object.assign({}, state.specs[key].info, info), info)
        state.specs[key].info = Object.assign({}, state.specs[key].info, info)
        return
      }
    })
  },

  setServers(state, { specid, servers }) {
    state.specs.forEach((_spec, key) => {
      if (getid(_spec) == specid) {
        state.specs[key].servers = servers
        return
      }
    })
  },

  add(state, spec) {
    state.specs.push(spec)
  },

  remove(state, id) {
    state.specs.forEach((_spec, key) => {
      if (getid(_spec) == id) {
        state.specs.splice(key, 1)
        return
      }
    })
  },

  addResponse(state, response) {
    state.response = response
  },

  update(state, { id, spec }) {
    state.specs.forEach((_spec, key) => {
      if (getid(_spec) == id) {
        Vue.set(state.specs, key, spec)
        return
      }
    })
  },

  setVersion(state, { specid, version }) {
    state.selectedVersion[specid] = version
  },

  setDefaultVersion(state, specid) {
    let spec = this.$store.state.openapi.specs.filter(spec => spec["x-internal-id"] == specid).pop()
    state.selectedVersion[specid] = spec["info"]["version"]
  },

  resetVersion(state, specid) {
    let spec = this.$store.state.openapi.specs.filter(spec => spec["x-internal-id"] == specid).pop()
    state.selectedVersion[specid] = spec["info"]["version"]
  },
}

export const actions = {
  async fetchSpec({ state, commit }, params) {
    let { specid, version } = params
    if (!specid) {
      specid = params
      let spec = state.specs.filter(spec => spec["x-internal-id"] == specid).pop()
      version = spec["info"]["version"]
    }
    return await this.$specapi.getSpec(specid, version).then(
      resp => {
        commit("update", {
          id: specid,
          spec: resp.data,
        })
        return resp
      },
      err => {
        console.error("[API ERROR]", err)
        return err
      }
    )
  },

  async fetchSpecs({ commit }) {
    return await this.$specapi.getSpecs().then(
      resp => {
        commit("replace", resp.data)
        return resp
      },
      err => {
        console.error("[API ERROR]", err)
        return err
      }
    )
  },

  async deleteOperation({ dispatch }, { specid, operationid, version }) {
    return await this.$specapi.deleteRequest(specid, operationid, version).then(res => {
      if (res.data.deleted && res.data.deleted == true) {
        //Refresh thiss spec
        return dispatch("fetchSpec", { specid, version })
      }
    })
  },

  async deleteResponse({ dispatch }, { specid, operationid, version, data }) {
    console.log("del respponse", specid, operationid, version)
    return await this.$specapi.deleteResponse(specid, operationid, version, data).then(
      () => dispatch("fetchSpec", { specid, version }),
      err => console.error("[APIERROR]", err)
    )
  },

  async deleteSpec({ dispatch }, specid) {
    return await this.$specapi.deleteSpec(specid).then(
      () => dispatch("fetchSpecs"),
      err => console.error("[APIERROR]", err)
    )
  },

  async addSpec({ commit }, { title, servers, description }) {
    description = description || ""
    return await this.$specapi.addSpec({ title, url: servers, description }).then(
      res => commit("add", res.data),
      err => console.error("[APIERROR]", err)
    )
  },

  async updateSpec({ commit }, { specid, data: { title, servers, description, version } }) {
    description = description || ""
    return await this.$specapi.updateSpec({ title, url: servers, description }, specid, version).then(
      res => commit("update", { id: specid, spec: res.data }),
      err => console.error("[APIERROR]", err)
    )
  },

  async addRequest({ commit }, { specid, data: { title, request, response } }) {
    return await this.$specapi.addRequest({ title, request, response }).then(
      res => commit("update", { id: specid, spec: res.data }),
      err => console.error("[APIERROR]", err)
    )
  },

  async getFork(state, { specid, version }) {
    return await this.$specapi.getFork(specid, version).then(
      res => {
        if (!res.data) return { specid: undefined, version: undefined }
        return { specid: res.data.specid, version: res.data.version }
      },
      err => console.error("[APIERROR]", err)
    )
  },

  async forkSpec({ dispatch }, { specid, version }) {
    return await this.$specapi.forkSpec(specid, version).then(
      async res => {
        await dispatch("fetchSpec", {
          specid: res.data["x-internal-id"],
          version: version || res.data.info.version,
        })
        return res
      },
      err => console.error("[APIERROR]", err)
    )
  },

  async addVersion({ dispatch }, { specid, version, from }) {
    return await this.$specapi.addVersion(specid, version, false, from).then(
      async res => {
        await dispatch("fetchSpec", { specid: res.data["x-internal-id"], version })
        return res
      },
      err => console.error("[APIERROR]", err)
    )
  },

  async removeVersion({ dispatch }, { specid, version }) {
    return await this.$specapi.removeVersion(specid, version).then(
      async res => {
        await dispatch("fetchSpec", specid)
        return res
      },
      err => console.error("[APIERROR]", err)
    )
  },

  async setDefaultVersion({ dispatch }, { specid, version }) {
    return await this.$specapi.setDefaultVersion(specid, version).then(
      async res => {
        await dispatch("fetchSpec", res.data["x-internal-id"])
        return res
      },
      err => console.error("[APIERROR]", err)
    )
  },
}
