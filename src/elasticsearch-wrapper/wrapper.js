import { Client } from '@elastic/elasticsearch'

export default {

  install (Vue, options) {
    const client = new Client({
      node: options.url,
      auth: {
        username: options.username,
        password: options.password
      }
    })

    Vue.prototype.$elasticsearch = client
  }

}
