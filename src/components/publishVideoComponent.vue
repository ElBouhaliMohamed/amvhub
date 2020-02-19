<template>
    <div id="infos" class="h-full flex flex-col justify-center items-center py-4 text-white">
        <a :href="url">{{ url }}</a>
    </div>
</template>

<script>
export default {
  computed: {
    url () {
      return this.$store.getters['upload/url']
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
