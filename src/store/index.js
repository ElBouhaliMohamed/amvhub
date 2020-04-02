import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  supportCircular: true
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV === 'development',
  plugins: [vuexLocal.plugin]
})
