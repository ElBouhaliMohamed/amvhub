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
                <span v-if="error.length != 0" class="inline-flex text-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-red-100 text-red-800">
                {{error}}
                </span>
                <logo class="mx-auto h-12 w-auto text-gray-900 text-center text-4xl"/>
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
            <form v-on:submit.prevent class="mt-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm">
                <div>
                    <input v-model="email" aria-label="Email address" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
                </div>
                </div>

                <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-b-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" @click="sendReset">
                    <span class="absolute left-0 inset-y pl-3">
                    <!-- <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg> -->
                    </span>
                    Email Me!
                </button>
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
      error: ''
    }
  },
  components: {
    logo
  },
  methods: {
    sendReset: function () {
      this.$Progress.start()
      this.error = ''

      if (this.email.length == 0) {
        this.error = 'Please enter an email.'
      }

      if (this.error.length == 0) {
        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
          this.$Progress.finish()
          this.showSuccessMsg({
            message: `An email was send to ${this.email}`
          })
          this.$router.push('login')
        })
          .catch((err) => {
            this.showErrorMsg({
              message: err.message
            })
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
