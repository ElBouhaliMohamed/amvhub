<template>
  <div class="footer">
    <div class="links">
      <a class="icon" href="https://discord.gg/UmaHtz">
        <div class="fab fa-discord fa-4x"></div>
      </a>
      <a class="icon" href="https://discord.gg/UmaHtz">
        <div class="fab fa-twitter fa-4x"></div>
      </a>
    </div>

    <div class="name">
      Mohamed El Bouhali
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
  @apply .flex .flex-col .h-1/8 .bg-primary-100 .text-secondary-100 .py-16;
}

.links {
   @apply .flex .uppercase .w-full .justify-center .py-4 ;
}

.icon {
  @apply .text-secondary-100 .px-2;
}

.copyrightNotice {
  @apply .flex .w-full .justify-center .italic .py-1;
}

.name {
  @apply .flex .justify-center .uppercase .font-semibold .py-2;
}

</style>
