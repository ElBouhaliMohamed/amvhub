/**
 * navbar module
**/

export default {
  namespaced: true,
  state: {
    author: '',
    title: '',
    views: 0,
    hearts: 0,
    tags: Array,
    categories: Array,
    theaterMode: false,

    ratings: Array,
    didUserAlreadyGiveRating: Boolean,
    ratingsCount: 0,
    ratingsAvg: 0,
    ratingsMedian: 0
  },
  getters: {
    ratings: state => {
      return state.ratings
    },
    ratingsCount: state => {
      return state.ratingsCount
    },
    ratingsMedian: state => {
      return state.ratingsMedian
    },
    ratingsAvg: state => {
      return state.ratingsAvg
    },
    theaterMode: state => {
      return state.theaterMode
    }
  },
  mutations: {
    SET_RATINGS: (state, ratings) => {
      state.ratings = ratings
    },
    SET_RATINGSMEDIAN: (state, ratingsMedian) => {
      state.ratingsMedian = ratingsMedian
    },
    SET_RATINGSAVG: (state, ratingsAvg) => {
      state.ratingsAvg = ratingsAvg
    },
    SET_RATINGSCOUNT: (state, ratingsCount) => {
      state.ratingsCount = ratingsCount
    },
    SET_DIDUSERALREADYGIVERATING: (state, didUserAlreadyGiveRating) => {
      state.didUserAlreadyGiveRating = didUserAlreadyGiveRating
    },
    SET_THEATERMODE: (state, theaterMode) => {
      state.theaterMode = theaterMode
    }
  },
  actions: {
    processRatingsArray ({ state, commit }, userId) {
      var ratings = state.ratings
      
      var didUserAlreadyGiveRating = Array.from(ratings).findIndex(ratingObject => ratingObject.user === userId) > 0
      commit('SET_DIDUSERALREADYGIVERATING', didUserAlreadyGiveRating)
      commit('SET_RATINGSCOUNT', ratings.length)

      let sum = 0 // for avg
      let count = 0
      let medianArray = []
      for (let ratingObject of ratings) {
        let rating = ratingObject.rating
        let ratingSum = 0
        let ratingCount = 0
        for (let category of rating) {
          ratingSum += category.value
          sum += category.value

          count++
          ratingCount++
        }
        medianArray.push(ratingSum / ratingCount)
      }
      let ratingsAvg = sum / count

      const median = arr => {
        const mid = Math.floor(arr.length / 2)
        const nums = [...arr].sort((a, b) => a - b)
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
      }

      let ratingsMedian = median(medianArray)

      if (isNaN(ratingsAvg)) {
        ratingsAvg = 0
      }

      if (isNaN(ratingsMedian)) {
        ratingsMedian = 0
      }

      commit('SET_RATINGSAVG', ratingsAvg)
      commit('SET_RATINGSMEDIAN', ratingsMedian)
    }
  }
}
