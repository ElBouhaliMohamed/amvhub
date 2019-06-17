// profile
import channel from '../pages/profile/Channel.vue'

// single pages
import homePage from '../pages/Home.vue'
import trending from '../pages/Trending.vue'
import notFoundPage from '../pages/NotFound.vue'
import videoPage from '../pages/VideoPage.vue'

import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: homePage,
    meta: { title: `${DOMAIN_TITLE} | home`, enableSmallNavigation: false}
  },
  {
    path: '/trending',
    name: 'trending',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | trending`, enableSmallNavigation: true}
  },
  {
    path: '/channel',
    name: 'channel',
    component: channel,
    meta: { title: `${DOMAIN_TITLE} | trending`, enableSmallNavigation: false}
  },  
  {
    path: '/video/:id',
    name: 'video',
    component: videoPage,
    meta: { title: `${DOMAIN_TITLE} | video`, enableSmallNavigation: false}
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found`, enableSmallNavigation: false}
  }
]
