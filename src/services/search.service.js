import { callFirebaseFunction } from './firebase.functions.service'

const searchUserByName = function (searchQuery) {
  let searchUserByName = callFirebaseFunction('elasticsearchUserSearch')
  searchUserByName({
    index: 'users',
    body: {
      query: {
        fuzzy: {
          name: {
            value: searchQuery,
            fuzziness: 'AUTO',
            'max_expansions': 50,
            'prefix_length': 0,
            'transpositions': true
          }
        }
      }
    }
  }).then((result) => {
    return result
  }).catch((err) => {
    console.log(err)
    return null
  })
}

export { searchUserByName }
