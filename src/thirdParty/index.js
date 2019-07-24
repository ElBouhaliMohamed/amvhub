/**
 * import and init third party
 * components/validators and other dependencies
 */

import Vue from 'vue'

import VueCarousel from 'vue-carousel'

import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(VueCarousel)
Vue.use(Vue2TouchEvents)

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '3px'
})

import VueNotifications from 'vue-notifications'
import swal from 'sweetalert'

function toast ({title, message, type, timeout, cb}) {
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