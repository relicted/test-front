import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

export default ({store}) => {
  createPersistedState({
    key: 'vuex',
    paths: [],
    storage: localStorage
  })(store)
}
