import $store from '../store'

export function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)

  if (pageTitle) window.document.title = pageTitle.meta.title
  next()
}

export function checkIfSmallNavigationNeeded (to, from, next) {
  const enabled = to.matched.find(item => item.meta.enableSmallNavigation)
  if (enabled) {
    $store.commit('navbar/toggleSmallNavigation', true)
  } else {
    $store.commit('navbar/toggleSmallNavigation', false)
  }
  next()
}

export function checkIfHeaderIsNeeded (to, from, next) {
  const enabled = to.matched.find(item => item.meta.enableHeader)
  if (enabled) {
    $store.commit('navbar/toggleHeader', true)
  } else {
    $store.commit('navbar/toggleHeader', false)
  }
  next()
}

/**
 * Check access permission to auth routes
 */
export function checkAccessMiddleware (to, from, next) {
  const isLoggedIn = $store.getters['user/isLoggedIn']
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && isLoggedIn) return next()
  if (requiresAuth) return next({ name: 'login' })
  next()
}

/**
 * Check access permission to auth routes
 */
export function checkAlreadySignedInUserAccessMiddleware (to, from, next) {
  const isLoggedIn = $store.getters['user/isLoggedIn']
  const cantOpenWhenSignedIn = to.matched.some(record => record.meta.cantOpenWhenSignedIn)

  if (!cantOpenWhenSignedIn) return next()
  if (cantOpenWhenSignedIn && isLoggedIn) return next(from)
  next()
}
