import Vue from 'vue'
import Router from 'vue-router'

import { checkAlreadySignedInUserAccessMiddleware, checkAccessMiddleware, setPageTitleMiddleware, checkIfSmallNavigationNeeded, checkIfHeaderIsNeeded } from './middlewares'
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
router.beforeEach(checkIfHeaderIsNeeded)
router.beforeEach(checkAlreadySignedInUserAccessMiddleware)

export default router
