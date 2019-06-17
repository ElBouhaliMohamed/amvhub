<template>
  <div class="container mx-auto flex items-center relative bg-nepal ">

      <div class="w-96 flex justify-center">
          <img src="@/assets/avatar.jpg" alt="avatar" class="rounded-full h-48 w-48 absolute top-0 -mt-24">
      </div>

      <div class="w-full px-4">
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
