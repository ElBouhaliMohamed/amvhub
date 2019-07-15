export default {
  state: {
    isDarkMode: false,
    lightTheme: {
      '--background-light': '#e6eaed',
      '--background': '#fff',
      '--background-dark': '#a0aec0',

      '--primary-light': '#bcdefa',
      '--primary': '#6cb2eb',
      '--primary-dark': '#3490dc',

      '--brand-light': '#d6c4f8',
      '--brand': '#0116da',
      '--brand-dark': '#201367',

      '--cta-light': '#ffd5c1',
      '--cta': '#da5801',
      '--cta-dark': '#692f0e',

      '--info-light': '#daedfe',
      '--info': '#47b7f9',
      '--info-dark': '#2d5874',

      '--warning-light': '#fdecd5',
      '--warning': '#e8b45b',
      '--warning-dark': '#6e5630',

      '--success-light': '#daf1da',
      '--success': '#61c570',
      '--success-dark': '#345e39',

      '--danger-light': '#ffd0d6',
      '--danger': '#e52564',
      '--danger-dark': '#6e1f33'
    },
    darkTheme: {
      '--background-light': '#8795a1',
      '--background': '#3d4852',
      '--background-dark': '#000000',

      '--primary-light': '#bcdefa',
      '--primary': '#6cb2eb',
      '--primary-dark': '#3490dc',

      '--brand-light': '#d6c4f8',
      '--brand': '#0116da',
      '--brand-dark': '#201367',

      '--cta-light': '#ffd5c1',
      '--cta': '#da5801',
      '--cta-dark': '#692f0e',

      '--info-light': '#daedfe',
      '--info': '#47b7f9',
      '--info-dark': '#2d5874',

      '--warning-light': '#fdecd5',
      '--warning': '#e8b45b',
      '--warning-dark': '#6e5630',

      '--success-light': '#daf1da',
      '--success': '#61c570',
      '--success-dark': '#345e39',

      '--danger-light': '#ffd0d6',
      '--danger': '#e52564',
      '--danger-dark': '#6e1f33'
    }
  },
  getters: {
    isDarkMode (state) {
      return state.isDarkMode
    }
  },
  mutations: {
    SET_MODE (state, value) {
      state.isDarkMode = value
    }
  },
  actions: {
    initTheme ({ state, dispatch }) {
      if (state.isDarkMode) {
        dispatch('activateDarkMode')
      } else {
        dispatch('activateLightMode')
      }
    },
    switchTheme ({ state, commit, dispatch }) {
      if (state.isDarkMode) {
        dispatch('activateLightMode')
        commit('SET_MODE', false)
      } else {
        dispatch('activateDarkMode')
        commit('SET_MODE', true)
      }
    },
    activateLightMode ({ state }) {
      const rootElement = document.querySelector(':root')
      let lightTheme = state.lightTheme
      for (let variable in lightTheme) {
        rootElement.style.setProperty(variable, lightTheme[variable])
      }
    },
    activateDarkMode ({ state }) {
      const rootElement = document.querySelector(':root')
      let darkTheme = state.darkTheme
      for (let variable in darkTheme) {
        rootElement.style.setProperty(variable, darkTheme[variable])
      }
    }
  }
}
