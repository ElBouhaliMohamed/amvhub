<template>
  <div class="bg-white shadow">
    <div class="container mx-auto flex items-center relative">

        <div class="w-96">
            <img src="@/assets/avatar.jpg" alt="avatar" class="rounded-full h-48 w-48 absolute pin-t -mt-24 ml-4">
        </div>

        <div class="w-1/2">
            <ul class="flex">
                <li class="text-center py-3 px-4"><a class="font-semibold text-black antialiased hover:text-teal" href="#" target="_blank" rel="noopener noreferrer"> Videos </a></li>
                <li class="text-center py-3 px-4"><a class="font-semibold text-black antialiased hover:text-teal" href="#" target="_blank" rel="noopener noreferrer"> Following </a></li>
                <li class="text-center py-3 px-4"><a class="font-semibold text-black antialiased hover:text-teal" href="#" target="_blank" rel="noopener noreferrer"> Followers </a></li>
            </ul>
        </div>
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
