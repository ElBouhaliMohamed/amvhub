<template>
    <div>
        <div class="flex items-center justify-center min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
            <div class="w-full max-w-md">
            <div>
                <!-- <img class="w-auto h-12 mx-auto" src="/img/logos/workflow-mark-on-white.svg" alt="Workflow" /> -->
                <div v-if="errors.length != 0" class="p-4 rounded-md bg-red-50">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium leading-5 text-red-800">
                        There was an error with your submission
                      </h3>
                      <div class="mt-2 text-sm leading-5 text-red-700">
                        <ul class="pl-5 list-disc">
                          <li v-for="(error, index) in errors" :key="index" :class="{'mt-1' : index > 0}">
                            {{error}}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <router-link to="/">
                  <logo class="w-auto h-12 mx-auto text-4xl text-center text-gray-900"/>
                </router-link>
            <div>

              <div class="relative mt-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm leading-5">
                  <span class="px-2 text-gray-500 bg-gray-50">
                    Reset your password
                  </span>
                </div>
              </div>
                </div>
            </div>
            <form v-on:submit.prevent="sendReset" class="mt-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm">
                <div>
                    <input v-model="email" aria-label="Email address" name="email" type="email" required class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
                </div>
                </div>

                <button type="submit" class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent group rounded-b-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                    <span class="absolute left-0 pl-3 inset-y">
                    <svg class="w-5 h-5 text-indigo-500 transition duration-150 ease-in-out group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                     <path clip-rule="evenodd" fill-rule="evenodd" d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    </span>
                    Email Me!
                </button>

                <div class="flex items-center justify-center p-2 mt-6 border border-gray-200 rounded-lg">
                  <p class="mr-2 text-gray-500">
                    Back to
                  </p>
                  <router-link to="login" class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                    Login
                  </router-link>
                </div>
            </form>
             </div>
          </div>
    </div>
</template>

<script>
import { auth } from '../services/firebase.service'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      errors: []
    }
  },
  components: {
    logo: () => ({
      component: import('../components/logo')
    })
  },
  methods: {
    sendReset: function () {
      this.$Progress.start()
      this.errors = []

      if (this.email.length === 0) {
        this.errors.push('Please enter an email.')
      }

      if (this.errors.length === 0) {
        auth.sendPasswordResetEmail(this.email).then(() => {
          this.$Progress.finish()
          this.showSuccessMsg({
            message: `An email was send to ${this.email}`
          })
          this.$router.push('login')
        })
          .catch((err) => {
            this.errors.push(err)
            this.$Progress.fail()
          })
      }
    }
  },
  
  notifications: {
    showSuccessMsg: {
      type: 'success',
      title: 'Success',
      message: ''
    },
    showErrorMsg: {
      type: 'error',
      title: 'Error',
      message: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
