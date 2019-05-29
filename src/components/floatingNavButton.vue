<template>
  <transition name="floatingNavButton-fade">
    <div class="floatingContainer" v-show="visible" @click="toggleNav">
        <div class="floatingToggle fa fa-bars"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "floatingNavButton",
  props: {
    visibleoffset: {
      type: [String, Number],
      default: 600
    },
    visibleoffsetbottom: {
      type: [String, Number],
      default: 0
    },
    scrollFn: {
      type: Function,
      default: function(eventObject) {}
    }
  },
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    window.smoothscroll = () => {
      let currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll);
        window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5));
      }
    };
    window.addEventListener("scroll", this.catchScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.catchScroll);
  },
  methods: {
    /**
     * Catch window scroll event
     * @return {void}
     */
    catchScroll() {
      const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset);
      const pastBottomOffset =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - parseInt(this.visibleoffsetbottom);
      this.visible =
        parseInt(this.visibleoffsetbottom) > 0
          ? pastTopOffset && !pastBottomOffset
          : pastTopOffset;
      if(this.isActive) {
          this.visible = false;
      }
      this.scrollFn(this);
    },
    /**
     * The function who make the magics
     * @return {void}
     */
    toggleNav() {
      this.$store.commit("navbar/toggleNavigation", true);
    }
  },
  computed: {
    isActive: function() {
      return this.$store.state.navbar.isActive;
    }
  }
};
</script>
<style lang="scss" scoped>
.floatingNavButton-fade-enter-active,
.floatingNavButton-fade-leave-active {
  transition: opacity 0.7s;
}
.floatingNavButton-fade-enter,
.floatingNavButton-fade-leave-to {
  opacity: 0;
}

.vue-floatingNavButton {
  cursor: pointer;
  position: fixed;
}

.vue-floatingNavButton .default {
  @apply bg-primary-100;
  border-radius: 3px;
  color: #ffffff;
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 160px;
}

.vue-floatingNavButton .default span {
  color: #ffffff;
}

.vue-floatingNavButton--is-footer {
  bottom: 50% !important;
  position: absolute;
  transform: translateY(50%);
}

.floatingContainer {
  @apply .flex .fixed .w-10 .h-10 .z-50 .rounded-full .items-center .justify-center;
  top: 25px;
  left: 25px;

  background: #000000;
}

.floatingToggle {
  @apply .w-6 .h-6;
  color: #ffffff;
}

</style>