/**
 * import and init third party
 * components/validators and other dependencies
 */

import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faBell, faEnvelope, faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faBell, faEnvelope, faSearch, faEllipsisV);

Vue.component('font-awesome-icon', FontAwesomeIcon)