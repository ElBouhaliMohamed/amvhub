<template>
  <div>
    <!-- Breadcrumb -->
    <nav class="hidden bg-white border-b border-gray-200 lg:flex" aria-label="Breadcrumb">
      <ol class="flex w-full max-w-screen-xl px-4 space-x-4 sm:px-6 lg:px-8">
        <li class="flex">
          <div class="flex items-center">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <!-- Heroicon name: home -->
              <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span class="sr-only">Home</span>
            </a>
          </div>
        </li>
        <li class="flex">
          <div class="flex items-center">
            <svg class="flex-shrink-0 w-6 h-full text-gray-200" preserverAspectRatio="none" viewBox="0 0 24 44" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Projects</a>
          </div>
        </li>
        <li class="flex">
          <div class="flex items-center">
            <svg class="flex-shrink-0 w-6 h-full text-gray-200" preserverAspectRatio="none" viewBox="0 0 24 44" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Project Nero</a>
          </div>
        </li>
      </ol>
    </nav>

    <div class="flex">
      <nav class="max-w-xs p-8 border-r">
        <div>
          <router-link :to="{name: 'dashboardOverview'}" class="flex items-center px-3 py-2 text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out bg-gray-100 rounded-md group hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200" aria-current="page">
            <svg class="flex-shrink-0 w-6 h-6 -ml-1 text-gray-500 transition duration-150 ease-in-out md:mr-3 group-hover:text-gray-500 group-focus:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span class="hidden truncate md:block">
              Dashboard
            </span>
          </router-link>
          <router-link :to="{name: 'dashboardVideos'}" class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100">
            <svg class="flex-shrink-0 w-6 h-6 -ml-1 text-gray-400 transition duration-150 ease-in-out md:mr-3 group-hover:text-gray-500 group-focus:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
            <span class="hidden truncate md:block">
              Videos
            </span>
          </router-link>
          <a href="#" class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100">
            <svg class="flex-shrink-0 w-6 h-6 -ml-1 text-gray-400 transition duration-150 ease-in-out md:mr-3 group-hover:text-gray-500 group-focus:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <span class="hidden truncate md:block">
              Team
            </span>
          </a>
          <router-link :to="{name: 'settings'}" class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100">
            <svg class="flex-shrink-0 w-6 h-6 -ml-1 text-gray-400 transition duration-150 ease-in-out md:mr-3 group-hover:text-gray-500 group-focus:text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
            <span class="hidden truncate md:block">
              Settings
            </span>
          </router-link>
        </div>
        <div class="hidden mt-8">
          <h3 class="px-3 text-xs font-semibold leading-4 tracking-wider text-gray-500 uppercase" id="projects-headline">
            Projects
          </h3>
          <div class="mt-1" role="group" aria-labelledby="projects-headline">
            <a href="#" class="flex items-center px-3 py-2 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100">
              <span class="truncate">
                Website redesign
              </span>
            </a>
            <a href="#" class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100">
              <span class="truncate">
                GraphQL API
              </span>
            </a>
            <a href="#" class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100">
              <span class="truncate">
                Customer migration guides
              </span>
            </a>
            <a href="#" class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100">
              <span class="truncate">
                Profit sharing program
              </span>
            </a>
          </div>
        </div>
      </nav>
      <div class="w-5/6">
        <!-- <transition name="component-fade"> -->
          <router-view></router-view>
        <!-- </transition> -->
      </div>
    </div>
  </div>

</template>

<script>

export default {

}
</script>

<style>

</style>
