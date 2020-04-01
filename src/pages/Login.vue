<template>
    <div>
      <div class="flex items-center justify-center min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
        <div class="w-full max-w-md">
          <div>
            <!-- <img class="w-auto h-12 mx-auto" src="/img/logos/workflow-mark-on-white.svg" alt="Workflow" /> -->
            <span v-if="error.length != 0" class="inline-flex text-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-red-100 text-red-800">
              {{error}}
            </span>
            <router-link to="/">
              <logo class="w-auto h-12 mx-auto text-4xl text-center text-gray-900"/>
            </router-link>
            <h2 class="px-2 my-6 text-lg leading-5 text-center text-gray-500 bg-white">
              Sign in to your account via
            </h2>
            <div>
              <div>
                <div class="grid grid-cols-3 gap-3 mt-1">
                  <div>
                    <span class="inline-flex hidden w-full rounded-md shadow-sm">
                      <button type="button" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue">
                        <svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </span>
                  </div>

                  <div>
                    <span class="inline-flex w-full rounded-md shadow-sm">
                      <button @click="loginWithGoogle" type="button" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue">
                        <!-- <svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                        </svg> -->
                        <img class="block w-8 h-8 m-auto" src="/google.png"/>

                      </button>
                    </span>
                  </div>

                  <div>
                    <span class="inline-flex hidden w-full rounded-md shadow-sm">
                      <button type="button" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue">
                        <svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div class="relative mt-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm leading-5">
                  <span class="px-2 text-gray-500 bg-white">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>
          </div>
          <form v-on:submit.prevent class="mt-8" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm">
              <div>
                <input v-model="email" aria-label="Email address" name="email" type="email" required class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
              </div>
              <div class="-mt-px">
                <input v-model="password" aria-label="Password" name="password" type="password" required class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
              </div>
            </div>

            <div class="flex items-center justify-between mt-6">
              <div class="flex items-center">
                <input id="remember_me" type="checkbox" class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox" />
                <label for="remember_me" class="block ml-2 text-sm leading-5 text-gray-900">
                  Remember me
                </label>
              </div>

              <div class="text-sm leading-5">
                <router-link to="passwordreset" class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                  Forgot your password?
                </router-link>
              </div>
            </div>

            <div class="mt-6">
              <button class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700" @click="login">
                <span class="absolute left-0 pl-3 inset-y">
                  <svg class="w-5 h-5 text-indigo-500 transition duration-150 ease-in-out group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
            
            <div class="flex items-center justify-center p-2 mt-6 border border-gray-200 rounded-lg">
              <p class="mr-2 text-gray-500">
                New to amvhub?
              </p>
              <router-link to="signup" class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                Create an account.
              </router-link>
            </div>
          </form>
        </div>
      </div>
      
      <transition name="fade">
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 opacity-75" v-if="loading">
        </div>
      </transition>
        <div class="fixed inset-0 z-50 flex items-center justify-center" v-if="loading">
          <loadingAnimation class="w-16 h-16 opacity-100" />
        </div>
    </div>
</template>

<script>
import UsersService from '../services/users.service'
import logo from '../components/logo'
import loadingAnimation from '../components/loadingAnimation'
import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  },
  components: {
    logo,
    loadingAnimation
  },
  methods: {
    forgotPassword () {
    },
    login () {
      this.$Progress.start()
      this.loading = true

      UsersService.login(this.email, this.password)
        .then((user) => {
          this.loginSucceeded()
        })
        .catch((err) => {
          this.error = err.message
          this.$Progress.fail()
          this.loading = false
        })
    },
    loginWithGoogle () {
      this.$Progress.start()
      this.loading = true

      UsersService.loginWithGoogle().then((result) => {
        this.loginSucceeded()
      }).catch((err) => {
        this.error = err.message
        this.$Progress.fail()
        this.loading = false
      })
    },
    loginSucceeded () {
      UsersService.afterLogin()

      var generateFeed = firebase.functions().httpsCallable('firestoreGenerateFeed')
      generateFeed({ uid: this.getCurrentUser.userInfo.uid }).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })

      this.load = false
      this.$router.push('feed')
      this.$Progress.finish()
    }
  },
  computed: {
    getCurrentUser () {
      return this.$store.state.user.currentUser
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
