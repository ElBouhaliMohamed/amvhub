/**
 * import and init third party
 * components/validators and other dependencies
 */

import Vue from 'vue'

import VueCarousel from 'vue-carousel'

import Vue2TouchEvents from 'vue2-touch-events'

import VueProgressBar from 'vue-progressbar'

import VueNotifications from 'vue-notifications'

import swal from 'sweetalert'

import infiniteScroll from 'vue-infinite-scroll'

import vueHeadful from 'vue-headful'

Vue.component('headful', vueHeadful)

Vue.use(infiniteScroll)

Vue.use(VueCarousel)

Vue.use(Vue2TouchEvents)

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '3px'
})

function toast ({ title, message, type, timeout, cb }) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return swal(title, message, type)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)