
import { SearchDriver } from '@elastic/search-ui'
import buildRequest from './../../services/search/buildRequest'
import runRequest from './../../services/search/runRequest'
import applyDisjunctiveFaceting from './../../services/search/applyDisjunctiveFaceting'
import buildState from './../../services/search/buildState'

const config = {
  debug: true,
  hasA11yNotifications: true,
  onResultClick: () => {
    /* Not implemented */
  },
  onAutocompleteResultClick: () => {
    /* Not implemented */
  },
  onAutocomplete: async ({ searchTerm }) => {
    const requestBody = buildRequest({ searchTerm })
    const json = await runRequest(requestBody)
    const state = buildState(json)
    return {
      autocompletedResults: state.results
    }
  },
  onSearch: async state => {
    const { resultsPerPage } = state
    const requestBody = buildRequest(state)
    // Note that this could be optimized by running all of these requests
    // at the same time. Kept simple here for clarity.
    const responseJson = await runRequest(requestBody)
    const responseJsonWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(
      responseJson,
      state,
      []
    )
    return buildState(responseJsonWithDisjunctiveFacetCounts, resultsPerPage)
  }
}

export default {
  namespaced: true,
  state: {
    driver: new SearchDriver(config),
    searchInputValue: '',
    searchState: {},
    resultsPerPage: 20,
    sortBy: 'relevance'
  },
  getters: {
    driver (state) {
      return state.driver
    },
    searchInputValue (state) {
      return state.searchInputValue
    },
    searchState (state) {
      return state.searchState
    },
    resultsPerPage (state) {
      return state.resultsPerPage
    },
    sortBy (state) {
      return state.sortBy
    }
  },
  mutations: {
    SET_SEARCH_INPUT_VALUE (state, value) {
      state.searchInputValue = value
    },
    SET_SEARCH_STATE (state, searchState) {
      state.searchState = searchState
    },
    SET_RESULTS_PER_PAGE (state, value) {
      state.resultsPerPage = value
    },
    SET_SORT_BY (state, value) {
      state.sortBy = value
    }
  }
}
