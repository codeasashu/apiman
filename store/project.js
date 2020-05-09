export const state = () => ({
    config: {
        name: 'Apiman',
        description: 'Cool project'
    }
})

export const getters = {
    config: state => state.config
}