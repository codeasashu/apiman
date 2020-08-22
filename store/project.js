export const state = () => ({
    config: {
        name: 'Apiman',
        description: 'Cool project'
    },
    fullscreen: false,
})

export const getters = {
    config: state => state.config,
    fullscreen: state => state.fullscreen,
}

export const mutations = {
    fullscreen(state, fullscreen) {
        state.fullscreen = fullscreen
    }
}
