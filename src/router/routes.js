import { DOMAIN_TITLE } from '../.env'
import notFoundPage from '../pages/NotFound.vue'

const upload = () => import('../pages/Upload.vue')
const dashboard = () => import('../pages/Dashboard.vue')
const dashboardVideosList = () => import('../pages/DashboardVideosList.vue')
const dashboardEditVideo = () => import('../pages/DashboardEditVideo.vue')

const featured = () => import('../pages/Featured.vue')
const trending = () => import('../pages/Trending.vue')
const feed = () => import('../pages/Feed.vue')
const videoPage = () => import('../pages/VideoPage.vue')
const searchPage = () => import('../pages/SearchPage.vue')
const channel = () => import('../pages/profile/Channel.vue')

const login = () => import('../pages/Login.vue')
const signup = () => import('../pages/SignUp.vue')
const passwordreset = () => import('../pages/PasswordReset.vue')

const channelVideos = () => import('../pages/profile/ChannelVideos.vue')

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
    component: featured,
    meta: { title: `${DOMAIN_TITLE} | featured`, enableHeader: true, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false }
  },
  {
    path: '/channel/:id',
    name: 'channel',
    component: channel,
    meta: { title: `${DOMAIN_TITLE}`, enableHeader: true, enableSmallNavigation: false, requiresAuth: false, cantOpenWhenSignedIn: false },
    children: [
      {
        path: '',
        component: channelVideos
      },
      {
        path: 'videos',
        component: channelVideos
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
    path: '/dashboard/',
    name: 'dashboard',
    component: dashboard,
    meta: { title: `${DOMAIN_TITLE} | dashboard`, enableHeader: true, enableSmallNavigation: false, requiresAuth: true, cantOpenWhenSignedIn: false },
    children: [
      {
        path: 'videos',
        name: 'dashboardVideos',
        component: dashboardVideosList
      },
      {
        path: 'video/:id',
        name: 'dashboardEditVideo',
        component: dashboardEditVideo
      },
      {
        path: 'upload',
        name: 'upload',
        component: upload
      }
    ]
  },
  {
    path: '/video/:id/:comment?',
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
