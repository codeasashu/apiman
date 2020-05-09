export default ({ $axios, $auth, env }, inject) => {
    $axios.defaults.baseURL = env.api
  
    //inject("api", new SpecApi($axios, $auth))
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