<template>
  <div class="h-80 w-full bg-center bg-no-repeat bg-contain" :style="{backgroundImage: `url(${require(`../assets/${this.banner}`)})`}">
  </div>
</template>

<script>

export default {
  name: 'Banner',
  data() {
    return {
      banner: 'banner.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>