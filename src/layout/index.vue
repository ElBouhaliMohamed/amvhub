<template>
  <div id="app">
      <AppHeader></AppHeader>
      <AppBanner></AppBanner>
      <AppProfilebar></AppProfilebar>
      <AppChannelContent></AppChannelContent>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from "./Header.vue";
import AppFooter from "./Footer.vue";
import AppChannelContent from "./ChannelContent.vue";
import AppBanner from "../components/banner.vue";
import AppProfilebar from "../components/profilebar.vue";

export default {
  name: "AppLayout",
  components: {
    AppHeader,
    AppFooter,
    AppBanner,
    AppProfilebar,
    AppChannelContent
  }
};
</script>
