<template>
<div>
    <transition name="slideHeight" v-if="!isActive">
      <div key="small" class="container mx-auto bg-primary" >
        <ul class="flex justify-center">
            <router-link tag="li" class="navbarEntry" to="/trending"> Trending </router-link>
            <router-link tag="li" class="navbarEntry" to="/subscriber"> Subscriber </router-link>
            <router-link tag="li" class="navbarEntry" to="/recommended"> Recommendations </router-link>
        </ul>
      </div>
    </transition>
    <transition name="slideWidth" v-else>
      <div key="big" class="flex flex-col fixed bg-primary text-white overflow-hidden h-screen w-80 z-50 pin-t shadow-lg">
          <button class="toggle" @click="toggleNavigation">
            <font-awesome-icon icon="bars" size="lg"/>
          </button>
          <ul class="flex flex-col justify-start px-8 py-8">
            <router-link tag="li" class="navigationEntry" to="/trending"> Trending </router-link>
            <router-link tag="li" class="navigationEntry" to="/subscriber"> Subscriber </router-link>
            <router-link tag="li" class="navigationEntry" to="/recommended"> Recommendations </router-link>
        </ul>
      </div>
    </transition>
</div>

</template>

<script>

export default {
  name: 'Navbar',
  mounted() {
    console.log("tesssst");
  },
  computed: {
    isActive: function() {
      return this.$store.state.navBar.isActive;
    }
  },
  methods: {
    toggleNavigation() {
      this.$store.commit('navBar/toggleNavigation', false);
    }
  },
}
</script>

<style lang="scss" scoped>

.navbarEntry {
  @apply .text-white .text-center .uppercase .py-3 .px-4;
}

// .is-active {
//   @apply .border-b-4 .border-solid .border-tertiary;
// }

.navigationEntry {
  @apply .text-white .py-5 .px-4;
}

.toggle {
  @apply .absolute .inline-block .ml-4 .h-8 .w-12 .items-center .justify-center .text-secondary;
  top: 42px;
  left: 230px;
  transition: all 0.2s ease-out;
}

.toggle:hover {
  @apply text-tertiary;  
  left: 235px;
}
</style>