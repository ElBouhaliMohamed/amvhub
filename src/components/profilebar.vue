<template>
  <div class="container mx-auto flex items-center relative bg-nepal ">
      <img src="@/assets/avatar.jpg" alt="avatar" class="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full">

      <div class="absolute w-full px-4">
          <ul class="flex">
              <li class="text-center py-3 px-4"><a class="text-white" href="#" target="_blank" rel="noopener noreferrer"> Videos </a></li>
              <li class="text-center py-3 px-4"><a class="text-white" href="#" target="_blank" rel="noopener noreferrer"> Following </a></li>
              <li class="text-center py-3 px-4"><a class="text-white" href="#" target="_blank" rel="noopener noreferrer"> Followers </a></li>
          </ul>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Profilebar'
}
</script>

<style lang="scss" scoped>
</style>
