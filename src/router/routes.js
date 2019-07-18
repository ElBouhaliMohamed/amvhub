import login from '../pages/Login.vue'
import signup from '../pages/SignUp.vue'
import channel from '../pages/profile/Channel.vue'

import trending from '../pages/Trending.vue'
import feed from '../pages/Feed.vue'
import notFoundPage from '../pages/NotFound.vue'
import videoPage from '../pages/VideoPage.vue'

import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    alias: '/feed',
    name: 'feed',
    component: feed,
    meta: { title: `${DOMAIN_TITLE} | feed`, enableSmallNavigation: true, requiresAuth: false }
  },
  {
    path: '/trending',
    name: 'trending',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | trending`, enableSmallNavigation: true, requiresAuth: false }
  },
  {
    path: '/featured',
    name: 'featured',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | featured`, enableSmallNavigation: true,requiresAuth: false }
  },
  {
    path: '/channel',
    name: 'channel',
    component: channel,
    meta: { title: `${DOMAIN_TITLE} | trending`, enableSmallNavigation: false, requiresAuth: true }
  },
  {
    path: '/video/:id',
    name: 'video',
    component: videoPage,
    meta: { title: `${DOMAIN_TITLE} | video`, enableSmallNavigation: false, requiresAuth: false }
  },
  {
    path: '/login/',
    name: 'login',
    component: login,
    meta: { title: `${DOMAIN_TITLE} | login`, enableSmallNavigation: false, requiresAuth: false }
  },
  {
    path: '/signup/',
    name: 'signup',
    component: signup,
    meta: { title: `${DOMAIN_TITLE} | signup`, enableSmallNavigation: false, requiresAuth: false }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found`, enableSmallNavigation: false, requiresAuth: false }
  }
]
