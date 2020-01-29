import Vue from 'vue'
import Router from 'vue-router'

import { checkAlreadySignedInUserAccessMiddleware, checkAccessMiddleware, setPageTitleMiddleware, checkIfSmallNavigationNeeded } from './middlewares'
import { routes } from './routes'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
})

router.beforeEach(checkAccessMiddleware)
router.beforeEach(setPageTitleMiddleware)
router.beforeEach(checkIfSmallNavigationNeeded)
router.beforeEach(checkAlreadySignedInUserAccessMiddleware)

export default router
