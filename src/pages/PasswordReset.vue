<template>
 <!-- <div class="container mx-auto h-full flex justify-center items-center py-16"> -->
        <!-- <div class="w-full md:w-1/2">
            <div class="border-primary p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
                <div v-if="error.length > 0" class="rounded font-bold bg-danger py-2 px-2">
                  {{error}}
                </div>
                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Email</label>
                    <input type="text" id="email" v-model="email" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Email">
                </div>
                <div class="flex items-center justify-between">
                    <button class="btn btn-primary" @click="sendReset">
                        Email Me!
                    </button>
                </div>
                
            </div>
            <div class="text-center">
                <p class="text-grey-dark text-sm">Back to <router-link to="login" class="no-underline text-blue font-bold">Login</router-link>.</p>
            </div>
        </div>
    </div> -->
    <div>
        <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full">
            <div>
                <!-- <img class="mx-auto h-12 w-auto" src="/img/logos/workflow-mark-on-white.svg" alt="Workflow" /> -->
                <div v-if="errors.length != 0" class="rounded-md bg-red-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm leading-5 font-medium text-red-800">
                        There was an error with your submission
                      </h3>
                      <div class="mt-2 text-sm leading-5 text-red-700">
                        <ul class="list-disc pl-5">
                          <li v-for="(error, index) in errors" :key="index" :class="{'mt-1' : index > 0}">
                            {{error}}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <router-link to="/">
                  <logo class="mx-auto h-12 w-auto text-gray-900 text-center text-4xl"/>
                </router-link>
            <div>

              <div class="mt-6 relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm leading-5">
                  <span class="px-2 bg-white text-gray-500">
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
                    <input v-model="email" aria-label="Email address" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
                </div>
                </div>

                <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-b-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    <span class="absolute left-0 inset-y pl-3">
                    <!-- <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg> -->
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
import firebase from 'firebase'
import logo from '../components/logo'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      errors: []
    }
  },
  components: {
    logo
  },
  methods: {
    sendReset: function () {
      this.$Progress.start()
      this.errors = []

      if (this.email.length == 0) {
        this.errors.push('Please enter an email.')
      }

      if (this.errors.length == 0) {
        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
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
