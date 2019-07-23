import Http from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'

export default class BaseService {
  constructor () {
    if (!this.entity) {
      throw new Error('Child service class not provide entity')
    }
  }

  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */

  request (status = { auth: false }) {
    return new Http(status)
  }

  responseWrapper (...rest) {
    return new ResponseWrapper(...rest)
  }

  errorWrapper (...rest) {
    return new ErrorWrapper(...rest)
  }

  /**
   * ------------------------------
   * @API_CALLS_PUBLIC
   * ------------------------------
   */

}
