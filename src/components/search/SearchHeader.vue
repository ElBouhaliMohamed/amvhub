<template>
  <form @submit.prevent="$emit('submit', $event.target.value)">
    <div class="">
      <div class="">
        <input
          type="text"
          placeholder="Try searching for 'water', 'dragon' or 'ragnaros'"
          class=""
          :value="value"
          @input="$emit('input', $event.target.value)"
        />
      </div>
      <input
        type="submit"
        class=""
        value="Search"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String
    }
  }
}
</script>
