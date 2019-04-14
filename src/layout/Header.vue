<template>
  <div class="bg-white">
    <div class="container mx-auto flex items-center py-4">
      <nav class="w-32 ml-4">
        <a class="" href="#"> 
          <logo styling="fill-current text-black h-8 w-24" />
        </a>
      </nav>

      <nav class="w-1/2 flex" >
        <div class="w-full mr-4"> 
          <input type="text" class="bg-grey-lighter px-4 py-2 text-xs rounded-l searchBox" placeholder="Search">
          <a href="#" class="px-4 py-2 rounded-r searchIcon"><font-awesome-icon class="text-grey-darker" icon="search"/></a>  
        </div>
      </nav>

      <nav class="w-1/2 flex items-center text-center justify-end">
        <a href="#" class="top-nav-item"> <font-awesome-icon icon="bell" size="lg"/></a>
        <a href="#" class="top-nav-item"> <font-awesome-icon icon="envelope" size="lg"/></a>
       <div class="mr-4"> <a href="#"><img src="@/assets/avatar.jpg" alt="avatar" class="avatar"></a></div>
      </nav>
    </div>
  </div>

</template>

<script>
import * as authService from '../services/auth.service'
import logo from '../components/logo.vue'

export default {
  name: 'Header',
  methods: {
    logout () {
      authService.makeLogout()
    }
  },
  components: {
    logo
  }
}
</script>

<style lang="scss" scoped>
</style>
