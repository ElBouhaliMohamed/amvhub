import { callFirebaseFunction } from './../firebase.functions.service'

export default async function runRequest (body) {
  try {
    const search = callFirebaseFunction('elasticsearchVideoSearchVideos')
    const response = await search({ body })
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
  }
}
