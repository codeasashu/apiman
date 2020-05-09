const strategy = "local"
const FALLBACK_INTERVAL = 1000 * 60 * 5 //5 mins

async function refreshTokenF($auth, $axios, $authapi, token, refreshToken) {
  if (token && refreshToken) {
    try {
      const { data } = await $authapi.refreshToken(refreshToken)
      token = data.access
      $auth.setToken(strategy, token)
      $auth.setRefreshToken(strategy, refreshToken)
      return data.access
    } catch (error) {
      $auth.logout()
      console.error(error)
      throw new Error("Error while refreshing token")
    }
  }
}

const setAccessToken = async ($auth, $authapi, $axios, token) => {
  try {
    const { data } = await $authapi.getToken(token)
    let access_token = data.access_token
    return {
      access_token,
      refresh_token: data.refresh_token,
    }
  } catch (e) {
    console.log(e)
  }
}

export default async function({ app }) {
  const { $axios, $auth, $authapi } = app

  console.log("auth executed")
  if (!$auth.loggedIn) {
    return
  }

  // We support JWT by google
  if ($auth.strategy.name === "google") {
    const token = $auth.getToken($auth.strategy.name).substr(7)
    //We now set token and change strategy to local for further processing
    const { access_token, refresh_token } = await setAccessToken($auth, $authapi, $axios, token)

    $auth.setToken(strategy, access_token)
    $auth.setRefreshToken(strategy, refresh_token)
    $authapi.setToken(access_token)

    setTimeout(async () => {
      $auth.setStrategy("local")
    })
    //let refreshToken = $auth.getRefreshToken(strategy)
  }

  let token = $auth.getToken(strategy)
  let refreshToken = $auth.getRefreshToken(strategy)

  if (!refreshToken) {
    await $auth.logout()
    return
  }

  if (token && refreshToken) {
    $authapi.setToken(token)
  }

  let refreshInterval = FALLBACK_INTERVAL

  setInterval(async function() {
    token = $auth.getToken(strategy)
    refreshToken = $auth.getRefreshToken(strategy)
    const newAccessToken = await refreshTokenF($auth, $axios, $authapi, token, refreshToken)
    $authapi.setToken(newAccessToken)
  }, refreshInterval)
}
