export default ({ $axios, $auth, env }, inject) => {
    $axios.defaults.baseURL = env.api
  
    inject("specapi", new SpecApi($axios, $auth))
    inject("authapi", new AuthApi($axios))
}

class ApiBase {
    API_PREFIX = "/api/v1"
  
    constructor($axios) {
      this.apibase = $axios.defaults.baseURL
      this.client = $axios.create({
        baseURL: `${$axios.defaults.baseURL}${this.API_PREFIX}`,
      })
    }
  
    get axios() {
      return this.client
    }
  
    setToken(token, scheme) {
      scheme = scheme || "Bearer"
      this.client.setToken(token, scheme)
      return this
    }
}

class AuthApi extends ApiBase {
  API_PREFIX = "/api/token"

  constructor($axios) {
    super($axios)
    this.superBaseUrl = $axios.defaults.baseURL
    this.client.defaults.baseURL = $axios.defaults.baseURL + this.API_PREFIX
  }

  get googleClient() {
    let gclient = this.client.create({ baseURL: this.superBaseUrl + "/google_auth" })
    delete gclient.defaults.headers.common["Authorization"]
    return gclient
  }

  //Get JWT token from google token
  getToken = async googleToken => await this.googleClient.post("/", { token: googleToken })

  refreshToken = async refresh => await this.client.post("/refresh/", { refresh })
}

class SpecApi extends ApiBase {
  constructor($axios, $auth) {
    super($axios)

    this.auth = $auth
    //Auto logout
    // this.client.onError(error => {
    //   const code = parseInt(error.response && error.response.status)
    //   if ([401, 403].includes(code)) {
    //     this.auth.logout()
    //   }
    //   return Promise.reject(error)
    // })
  }
  get integrationclient() {
    return this.client.create({ baseURL: this.apibase + "/integrations" })
  }

  timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

  retry(cb) {
    let retryClient = this.client.create()
    retryClient.interceptors.response.use(
      res => {
        if (cb(res) === true) {
          //Rety after 5 second
          console.log("retrying....", res.config)
          return this.timeout(5000).then(() => retryClient.request(res.config))
        }
        return res
      },
      error => Promise.reject(error)
    )
    //this.client = retryClient
    // return this
    return retryClient
  }

  // Spec related APIs
  getSpecs = async () => await this.client.get("spec/")
  addSpec = async data => await this.client.post("spec/", data)
  //Version specific
  getSpec = async (specid, version) =>
    await this.client.get(`spec/${specid}`, { params: { format: "json", version } })
  updateSpec = async (data, specid, version) =>
    await this.client.put(`spec/${specid}`, data, { params: { version } })
  deleteSpec = async specid => await this.client.delete(`spec/${specid}`)

  // Design specific APIs
  addRequest = async (specid, { title, request, response, version }) =>
    await this.client.post(`spec/${specid}`, { title, request, response }, { params: { version } })
  deleteRequest = async (specid, operationid, version) =>
    await this.client.delete(`spec/${specid}/operation/${operationid}`, { params: { version } })
  deleteResponse = async (specid, operationid, version, { code, contentType }) =>
    await this.client.put(
      `spec/${specid}/operation/${operationid}`,
      { code, contentType },
      { params: { version } }
    )

  // Fork related APIs
  getFork = async (specid, version) => await this.client.get(`fork/${specid}/${version}`)
  forkSpec = async (specid, version) => await this.client.post(`fork/${specid}/${version}`)

  // Mock APIs
  getMock = async (specid, version) =>
    await this.retry(res => !res.data.running).get(`mock/${specid}`, { params: { version } })
  getMockStatus = async (specid, version) =>
    await this.client.get(`mock/${specid}`, { params: { version } })
  restartMock = async (specid, version) =>
    await this.client.post(`mock/${specid}/restart`, {}, { params: { version } })
  stopMock = async (specid, version) =>
    await this.client.post(`mock/${specid}/stop`, {}, { params: { version } })

  //Version APIs
  addVersion = async (specid, version, isdefault, from) =>
    await this.client.post(`spec/${specid}/version/${version}`, { default: isdefault, from })
  removeVersion = async (specid, version) =>
    await this.client.delete(`spec/${specid}/version/${version}`)
  setDefaultVersion = async (specid, version) => await this.addVersion(specid, version, true)

  //Integration APIs
  //Gitlab
  gitlab = {
    listRepos: async () => await this.integrationclient.get("gitlab"),
    getconfig: async () => await this.integrationclient.get("gitlab/config"),
    setRepo: async (project_id, branch) =>
      await this.integrationclient.post("gitlab", { project_id, branch }),
    commitSpec: async (specid, version) =>
      await this.integrationclient.post(`gitlab/commit/${specid}/${version}`),
  }
}