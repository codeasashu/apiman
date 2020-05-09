
export default {
  mode: 'spa',
  auth: {
    strategies: {
      google: {
        client_id: process.env.GOOGLE_CLIENT_ID || '406186701865-s61e6rf1tjn8tck25olhfmp28hgm0n1e.apps.googleusercontent.com',
      },
      local: {
        endpoints: {
          logout: false,
        },
      },
    },
    plugins: ["~/plugins/axios.js", { src: "~/plugins/auth.js", mode: "client" }],
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        //href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
        href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/css/all.min.css'
        //href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
//    "~/assets/ui2/semantic.css",
    "~/assets/style.scss",
    // "~/assets/ui/components/reset.css",
    // "~/assets/ui/components/site.css",
    // "~/assets/ui/components/button.css",
    // "~/assets/ui/components/header.css"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/v-tooltip",
    //"~/plugins/v-select",
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {
    optionsPath: '~/plugins/vuetify.options.js'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  router: {
    middleware: [
      //'auth'
    ]
  },
  /**
   * API configurations
   */
  env: {
    api: process.env.API_URL || "http://localhost:8080/api",
  },
}
