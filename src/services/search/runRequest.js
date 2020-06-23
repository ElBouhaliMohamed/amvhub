import { functions } from './../firebase.service'

export default async function runRequest (body) {
  try {
    const search = functions.httpsCallable('elasticsearchVideoSearchVideos')
    const response = await search({ body })
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
  }
}
