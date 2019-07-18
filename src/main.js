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
import './scss/videoPlayer/plyr.scss'

import AOS from 'aos'
import firebase from 'firebase'
import firebaseConfig from './firebaseConfig.json';

setGlobalHelpers()
Vue.config.productionTip = false

let app = '';

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      name: 'Root',
      router,
      store,
      created () {
        AOS.init({disable: true})
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
});