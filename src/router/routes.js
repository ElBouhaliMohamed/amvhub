import login from '../pages/Login.vue'
import signup from '../pages/SignUp.vue'
import passwordreset from '../pages/PasswordReset.vue'
import channel from '../pages/profile/Channel.vue'
import upload from '../pages/Upload.vue'

import trending from '../pages/Trending.vue'
import feed from '../pages/Feed.vue'
import notFoundPage from '../pages/NotFound.vue'
import videoPage from '../pages/VideoPage.vue'

import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/feed',
    name: 'feed',
    component: feed,
    meta: { title: `${DOMAIN_TITLE} | feed`, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/',
    alias: '/trending',
    name: 'trending',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | trending`, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/featured',
    name: 'featured',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | featured`, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/channel',
    name: 'channel',
    component: channel,
    meta: { title: `${DOMAIN_TITLE}`, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/upload',
    name: 'upload',
    component: upload,
    meta: { title: `${DOMAIN_TITLE} | upload`, enableSmallNavigation: false, requiresAuth: true, cantOpenWhenSignedIn: false }
  },
  {
    path: '/video/:id',
    name: 'video',
    component: videoPage,
    meta: { title: `${DOMAIN_TITLE} | video`, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/login/',
    name: 'login',
    component: login,
    meta: { title: `${DOMAIN_TITLE} | login`, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: true }
  },
  {
    path: '/signup/',
    name: 'signup',
    component: signup,
    meta: { title: `${DOMAIN_TITLE} | signup`, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: true }
  },
  {
    path: '/passwordreset/',
    name: 'passwordreset',
    component: passwordreset,
    meta: { title: `${DOMAIN_TITLE} | password reset`, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: true }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found`, enableSmallNavigation: false, requiresAuth: false }
  }
]
