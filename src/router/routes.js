// profile
import channel from '../pages/profile/Channel.vue'

// single pages
import homePage from '../pages/Home.vue'
import trending from '../pages/Trending.vue'
import notFoundPage from '../pages/NotFound.vue'
import videoPage from '../pages/VideoPage.vue'

import { routePropResolver } from './util'
import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: homePage,
    meta: { title: `${DOMAIN_TITLE} | home` }
  },
  {
    path: '/trending',
    name: 'trending',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | trending` }
  },
  {
    path: '/channel',
    name: 'channel',
    component: channel,
    meta: { title: `${DOMAIN_TITLE} | trending` }
  },  
  {
    path: '/video/:id',
    name: 'video',
    component: videoPage,
    meta: { title: `${DOMAIN_TITLE} | video` }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
]
