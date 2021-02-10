<template>
    <div class="footer footer-gradient">
      <div class="links">
        <!-- <a class="icon" href="https://discord.gg/UmaHtz">
          <div class="fab fa-discord fa-4x"></div>
        </a> -->
        <a class="icon" href="https://twitter.com/indigoteamamv">
          <div class="fab fa-twitter fa-4x"></div>
        </a>
        <a class="icon" href="https://www.youtube.com/channel/UCxrPkSZ9do1_mzkjAsVZ2hw">
          <div class="fab fa-youtube fa-4x"></div>
        </a>
      </div>

      <div class="name">
        Indigo Team
      </div>

      <div class="copyrightNotice">
        @ Copyright 2019
      </div>
      <div class="copyrightNotice">
        All rights reserved.
      </div>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>

.footer {
  @apply w-screen flex flex-col h-full py-16 text-white;
}

.links {
   @apply flex uppercase w-full justify-center py-4 ;
}

.icon {
  @apply px-2;
}

.copyrightNotice {
  @apply flex w-full justify-center italic py-1;
}

.name {
  @apply flex justify-center font-semibold py-2;
}

</style>
