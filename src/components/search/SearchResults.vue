<template>
  <ul class="flex flex-col">
    <li
      v-for="result in results"
      :key="result.uuid.raw"
      class=""
    >
      <SearchResult :result="result" />
    </li>
  </ul>
</template>

<script>
export default {
  components: {
    SearchResult: () => ({
      component: import('./SearchResult')
    })
  },
  props: {
    results: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
