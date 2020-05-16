import { DOMAIN_TITLE } from '../.env'
import notFoundPage from '../pages/NotFound.vue'

const upload = () => import(/* webpackChunkName: "needslogin" */ '../pages/Upload.vue')
const admin = () => import(/* webpackChunkName: "needslogin" */ '../pages/Admin.vue')

const trending = () => import(/* webpackChunkName: "doesntneedlogin" */ '../pages/Trending.vue')
const feed = () => import(/* webpackChunkName: "doesntneedlogin" */ '../pages/Feed.vue')
const videoPage = () => import(/* webpackChunkName: "doesntneedlogin" */ '../pages/VideoPage.vue')
const searchPage = () => import(/* webpackChunkName: "doesntneedlogin" */ '../pages/SearchPage.vue')
const channel = () => import(/* webpackChunkName: "doesntneedlogin" */ '../pages/profile/Channel.vue')

const login = () => import(/* webpackChunkName: "prelogin" */ '../pages/Login.vue')
const signup = () => import(/* webpackChunkName: "prelogin" */ '../pages/SignUp.vue')
const passwordreset = () => import(/* webpackChunkName: "prelogin" */ '../pages/PasswordReset.vue')

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
    path: '/search/',
    name: 'search',
    component: searchPage,
    meta: { title: `${DOMAIN_TITLE} | search`, enableHeader: true, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
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
