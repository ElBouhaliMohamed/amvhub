export default {
  state: {
    isDarkMode: false,
    lightTheme: {
      "--background-25": "#cccccc",
      "--background-50": "#e5e5e5",
      "--background-100": "#ffffff",

      "--secondary-25": "#8795a1",
      "--secondary-50": "#3d4852",
      "--secondary-100": "#000000",

      "--primary-25": "#bcdefa",
      "--primary-50": "#6cb2eb",
      "--primary-100": "#3490dc"
    },
    darkTheme: {
      "--background-25": "#606f7b",
      "--background-50": "#3d4852",
      "--background-100": "#000000",

      "--secondary-25": "#dae1e7",
      "--secondary-50": "#f8fafc",
      "--secondary-100": "#ffffff",

      "--primary-25": "#8795a1",
      "--primary-50": "#606f7b",
      "--primary-100": "#3d4852"
    }
  },
  getters: {
    isDarkMode(state) {
      return state.isDarkMode;
    }
  },
  mutations: {
    SET_MODE (state, value) {
      state.isDarkMode = value;
    }
  },
  actions: {
    initTheme({state, dispatch}){
      if(state.isDarkMode) {
        dispatch('activateDarkMode');
      }else {
        dispatch('activateLightMode');
      }
    },
    switchTheme({state, commit, dispatch}) {
      if(state.isDarkMode) {
        dispatch('activateLightMode');
        commit('SET_MODE', false);
      }else {
        dispatch('activateDarkMode');
        commit('SET_MODE', true);
      }
    },
    activateLightMode({state}) {
      const rootElement = document.querySelector(":root");
      let lightTheme = state.lightTheme;
      for (let variable in lightTheme) {
        rootElement.style.setProperty(variable, lightTheme[variable]);
      }
    },
    activateDarkMode({state}) {
      const rootElement = document.querySelector(":root");
      let darkTheme = state.darkTheme;
      for (let variable in darkTheme) {
        rootElement.style.setProperty(variable, darkTheme[variable]);
      }
    }
  }
};
