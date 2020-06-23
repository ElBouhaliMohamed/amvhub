<template>
  <div class="sui-sorting">
    <div class="sui-sorting__label">Sort by</div>
    <select
      name="sortBy"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <option value="">Relevance</option>
      <option value="title">Title</option>
      <option value="user.name">User</option>
      <option value="editors.name">Editor</option>
      <option value="songs.artist">Artist</option>
      <!-- <option value="createdAt">Uploaded At</option> -->
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>
