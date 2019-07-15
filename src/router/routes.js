// profile
import channel from '../pages/profile/Channel.vue'

// single pages
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
    meta: { title: `${DOMAIN_TITLE} | feed`, enableSmallNavigation: true }
  },
  {
    path: '/trending',
    name: 'trending',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | trending`, enableSmallNavigation: true }
  },
  {
    path: '/featured',
    name: 'featured',
    component: trending,
    meta: { title: `${DOMAIN_TITLE} | featured`, enableSmallNavigation: true }
  },
  {
    path: '/channel',
    name: 'channel',
    component: channel,
    meta: { title: `${DOMAIN_TITLE} | trending`, enableSmallNavigation: false }
  },
  {
    path: '/video/:id',
    name: 'video',
    component: videoPage,
    meta: { title: `${DOMAIN_TITLE} | video`, enableSmallNavigation: false }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found`, enableSmallNavigation: false }
  }
]
