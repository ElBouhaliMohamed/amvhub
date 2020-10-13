import Vue from 'vue'

import AppLayout from './layout/index.vue'
import router from './router'
import store from './store'
import setGlobalHelpers from './global.helpers'

import './mixins'
import './plugins'
import './thirdParty'

import './scss/main.scss'
import './scss/tailwind.scss'
import 'aos/dist/aos.css'

import AOS from 'aos'

setGlobalHelpers()
Vue.config.productionTip = false

let app = null

if (!app) {
  /* eslint-disable no-new */
  app = new Vue({
    name: 'Root',
    router,
    store,
    created () {
      AOS.init()
    },
    mounted () {
      store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth)
      window.addEventListener('resize', () => {
        store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth)
      })
    },
  
    beforeDestroy () {
      window.removeEventListener('resize', () =>
        store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth)
      )
    },
    render: h => h(AppLayout)
  }).$mount('#app')
}
