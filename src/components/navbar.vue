<template>
  <nav>
    <div :class="[smallNav, {smallNavActive: smallNavIsEnabled}]">
      <span class="flex ml-8 items-center"> 
        <span class="uppercase text-xs font-bold">view</span>
        <button><span class="fas fa-list ml-2"></span></button>
        <button><span class="fas fa-th ml-2"></span></button>
      </span>

      <span class="border-l-2 border-secondary-100 h-5 mx-4 opacity-10"></span>

      <router-link class="flex text-secondary-100 text-center items-center pr-2" tag="a" to="/trending">
        <div class='fas fa-fire fa-sm'></div>
        <span class='uppercase text-xs font-bold pl-1'>Trending</span>
      </router-link>
            <router-link class="flex text-secondary-100 text-center items-center px-2" tag="a" to="/feed">
        <div class='fas fa-home fa-sm'></div>
        <span class='uppercase text-xs font-bold pl-1'>Feed</span>
      </router-link>
            <router-link class="flex text-secondary-100 text-center items-center pl-2" tag="a" to="/featured">
        <div class='fas fa-bullhorn fa-sm'></div>
        <span class='uppercase text-xs font-bold pl-1'>Featured</span>
      </router-link>

      <span class="border-l-2 border-secondary-100 h-5 mx-4 opacity-10"></span>

    </div>
    <div id="bigNav" :class="[bigNav, {bigNavActive:isActive}]">
      <ul class="flex flex-col">

        <router-link tag="li" class="bigNavEntry" to="/trending">
          <div class='fas fa-fire fa-sm w-8 pr-6'></div>
          Trending
        </router-link>
        <router-link tag="li" class="bigNavEntry" to="/home">
          <div class='fas fa-home fa-sm w-8 pr-6'></div>
          Feed
        </router-link>
        <router-link tag="li" class="bigNavEntry" to="/featured">
          <div class='fas fa-bullhorn fa-sm w-8 pr-6'></div>
          Featured
        </router-link>

        <router-link tag="li" class="bigNavEntry" to="/t">
          <div class='fas fa-book-open fa-sm w-8 pr-6'></div>
          Guides
        </router-link>
        <router-link tag="li" class="bigNavEntry" to="/e">
          <div class='fas fa-trophy fa-sm w-8 pr-6'></div>
          Contests
        </router-link>
      </ul>

      <div class="flex text-secondary-100 h-16 pl-4 pr-16 items-center">
        Darkmode
        <label class="switch">
          <input type="checkbox" value:="isDarkMode" @click="switchTheme">
          <span class="slider round"></span>
        </label>
      </div>

      <!-- <div class="flex text-xs pl-4 pr-16 opacity-50">
        @ 2019 amvhub
      </div> -->
      <!-- dark mode toggle -->

    </div>

    <backToTop text="Back to top" visibleoffset="500"></backToTop>
    <!-- <floatingNavButton visibleoffset="100"></floatingNavButton> -->
  </nav>
</template>

<script>
import logo from "../components/logo.vue";
import backToTop from "../components/backToTop.vue";
import floatingNavButton from "../components/floatingNavButton.vue";

export default {
  name: "Navbar",
  data() {
    return {
      bigNav: "bigNav",
      smallNav: "smallNav",
    };
  },
  computed: {
    smallNavIsEnabled: function() {
      return (this.$store.state.navbar.smallNavIsEnabled && !this.$store.state.navbar.isActive);
    },
    isActive: function() {
      return this.$store.state.navbar.isActive;
    },
    isDarkMode: function(){
        return this.$store.state.theme.isDarkMode;
    }
  },
  methods: {
    toggleNavigation() {
      this.$store.commit("navbar/toggleNavigation", false);
    },
    switchTheme() {
      this.$store.dispatch("theme/switchTheme");
    }
  },
  components: {
    logo,
    backToTop,
    floatingNavButton
  }
};
</script>

<style lang="scss" scoped>

hr {
  @apply z-50;
  height: .25rem;
  width: 25%;
  margin: 0;
  background: tomato;
  border: none;
  transition: .3s ease-in-out;
}

.bigNav > a {
  @apply text-secondary-100 text-center font-hairline uppercase px-4;

  text-decoration: none;
  letter-spacing: 0.15em;
  
  display: inline-block;
  width: 25%;
  margin: 0;
}

.smallNav {
  @apply z-40 w-full flex flex-row overflow-hidden justify-start items-center bg-primary-100;
  top: 67px;
  height: 0px;
  -webkit-transition: height 250ms ease-in-out;
  -moz-transition: height 250ms ease-in-out;
  -o-transition: height 250ms ease-in-out;
  transition: height 250ms ease-in-out;
}

.smallNavActive {
  @apply h-8 w-full;
}

.bigNav {
  @apply flex flex-col fixed bg-primary-100 text-secondary-100 overflow-hidden h-screen z-40 top-0 shadow-lg;
  top: 106px;
  width: 0px;
  -webkit-transition: width 250ms ease-in-out;
  -moz-transition: width 250ms ease-in-out;
  -o-transition: width 250ms ease-in-out;
  transition: width 250ms ease-in-out;
}

.bigNavActive {
  @apply w-full;
}

.bigNavEntry {
  @apply flex text-secondary-100 h-16 pl-4 pr-16 items-center;

  -webkit-transition: all 250ms ease-in-out;
  -moz-transition: all 250ms ease-in-out;
  -o-transition: all 250ms ease-in-out;
  transition: all 250ms ease-in-out;
}

.bigNavEntry:hover {
  @apply bg-primary-25;
}

.bigNavEntry.is-active {
  @apply bg-primary-50 pl-8;
}

.toggle {
  @apply .ml-4 .h-8 .w-12 bg-background-100 ;
  transition: all 0.2s ease-out;
}

.toggle:hover {
  @apply text-primary-100 ;
  left: 235px;
}

.searchContainer {
  @apply .flex .pt-8 .px-8;
}

.searchBox {
  background-color: rgba(255, 255, 255, 0.05);
}

.searchIcon {
  background-color: rgba(255, 255, 255, 0.05);
}

.switch {
  @apply .flex .items-center .text-center mx-4;
  position: relative;
  width: 50px;
  height: 15px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 0px;
  bottom: -5px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  @apply bg-background-100 ;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

@screen md {
  .bigNav {
    top: 67px;
  }
  .bigNavActive {
    @apply w-80;
  }
}

</style>