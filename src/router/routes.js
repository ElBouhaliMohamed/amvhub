import login from '../pages/Login.vue'
import signup from '../pages/SignUp.vue'
import passwordreset from '../pages/PasswordReset.vue'
import channel from '../pages/profile/Channel.vue'
import upload from '../pages/Upload.vue'
import admin from '../pages/Admin.vue'

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
    meta: { title: `${DOMAIN_TITLE} | feed`, enableHeader: true, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/',
    alias: '/trending',
    name: 'trending',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | trending`, enableHeader: true, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/featured',
    name: 'featured',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | featured`, enableHeader: true, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/channel/:id',
    name: 'channel',
    component: channel,
    meta: { title: `${DOMAIN_TITLE}`, enableHeader: true, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false },
    children: [
      {
        path: 'videos',
        component: login
      },
      {
        path: 'test',
        component: signup
      },
      {
        path: 'test2',
        component: passwordreset
      }
    ]
  },
  {
    path: '/admin/',
    name: 'admin',
    component: admin,
    meta: { title: `${DOMAIN_TITLE} | admin`, enableHeader: true, enableSmallNavigation: false, requiresAuth: true, cantOpenWhenSignedIn: false },
    children: [
      {
        path: 'upload',
        name: 'upload',
        component: upload
      }
    ]
  },
  {
    path: '/video/:id',
    name: 'video',
    component: videoPage,
    meta: { title: `${DOMAIN_TITLE} | video`, enableHeader: true, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/login/',
    name: 'login',
    component: login,
    meta: { title: `${DOMAIN_TITLE} | login`, enableHeader: false, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: true }
  },
  {
    path: '/signup/',
    name: 'signup',
    component: signup,
    meta: { title: `${DOMAIN_TITLE} | signup`, enableHeader: false, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: true }
  },
  {
    path: '/passwordreset/',
    name: 'passwordreset',
    component: passwordreset,
    meta: { title: `${DOMAIN_TITLE} | password reset`, enableHeader: false, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: true }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found`, enableHeader: true, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  }
]
