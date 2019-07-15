/**
 * import and init global mixins
 */

import Vue from 'vue'

import currentUser from '../mixins/currentUser'
import jumpTo from '../mixins/jumpTo'
import formatDateTime from '../mixins/formatDateTime'
import titleMixin from '../mixins/titleMixin'

Vue.mixin(titleMixin)
Vue.mixin(currentUser)
Vue.mixin(jumpTo)
Vue.mixin(formatDateTime)
