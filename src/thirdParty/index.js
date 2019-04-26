/**
 * import and init third party
 * components/validators and other dependencies
 */

import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { faHome, faBell, faEnvelope, faSearch, faEllipsisV, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faBell, faEnvelope, faSearch, faEllipsisV, faBars, faPlayCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon)