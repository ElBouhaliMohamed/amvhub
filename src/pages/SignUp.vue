<template>
  <div>
    <div class="flex items-center justify-center min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div class="w-full max-w-xl">
            <div>
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
            </div>
        <form v-on:submit.prevent="signUp" class="mt-16">
          <div>
            <div>
              <div>
                <router-link to="/">
                  <logo class="w-auto h-12 mx-auto text-4xl text-center text-gray-900"/>
                </router-link>
                <div class="relative mt-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm leading-5">
                  <span class="px-2 text-gray-500 bg-gray-50">
                    Sign Up
                  </span>
                </div>
              </div>
              </div>
              <div class="mt-6 sm:mt-5">
                <div
                  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="username"
                    class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >Username</label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="flex max-w-lg rounded-md shadow-sm">
                      <span
                        class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm"
                      >amvhub.com/</span>
                      <input
                        id="username"
                        v-model.lazy="username"
                        class="flex-1 block w-full transition duration-150 ease-in-out rounded-none form-input rounded-r-md sm:text-sm sm:leading-5"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="username"
                    class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >Email</label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="flex max-w-lg rounded-md shadow-sm">
                      <input
                        required
                        v-model.lazy="email"
                        aria-label="Email address"
                        name="email"
                        type="email"
                        class="flex-1 block w-full transition duration-150 ease-in-out rounded-none rounded-md form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="username"
                    class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >Password</label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="flex max-w-lg rounded-md shadow-sm">
                      <input
                        required
                        id="password"
                        type="password"
                        v-model.lazy="password"
                        class="flex-1 block w-full transition duration-150 ease-in-out rounded-none rounded-md form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="about"
                    class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >About</label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="flex max-w-lg rounded-md shadow-sm">
                      <textarea
                        required
                        id="about"
                        v-model.lazy="about"
                        rows="3"
                        class="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"
                      ></textarea>
                    </div>
                    <p
                      class="mt-2 text-sm text-gray-500"
                    >Write a few sentences about yourself. This information will be displayed publicly so be careful what you share.</p>
                  </div>
                </div>

                <div
                  class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="photo"
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >Avatar</label>
                  <avatar @uploaded="uploaded" />
                </div>

                <div
                  class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="cover_photo"
                    class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >Cover photo</label>
                  <div class="mt-2 sm:mt-0 sm:col-span-2">
                    <div
                      class="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                    >
                      <div class="text-center"
                        v-cloak
                        @drop.prevent="addFile"
                        @dragover.prevent
                      >
                        <svg
                          class="w-12 h-12 mx-auto text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <p class="mt-1 text-sm text-gray-600">
                          <button
                            @click="triggerFileExplorer"
                            type="button"
                            class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
                          >Upload a file</button>
                          or drag and drop
                        </p>
                        <p class="mt-1 text-xs text-gray-500">PNG or JPG up to 10MB</p>
                        <input type="file" id="inputfile" name="inputfile" class="hidden" accept="image/*" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-8 mt-8 border-t border-gray-200 sm:mt-5 sm:pt-10">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                <p
                  class="max-w-2xl mt-1 text-sm leading-5 text-gray-500"
                >We'll always let you know about important changes, but you pick what else you want to hear about.</p>
              </div>
              <div class="mt-6 sm:mt-5">
                <div class="sm:border-t sm:border-gray-200 sm:pt-5">
                  <fieldset>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                      <div>
                        <legend
                          class="text-base font-medium leading-6 text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                        >By Email</legend>
                      </div>
                      <div class="mt-4 sm:mt-0 sm:col-span-2">
                        <div class="max-w-lg">
                          <div class="flex items-start">
                            <div class="absolute flex items-center h-5">
                              <input
                                id="comments"
                                type="checkbox"
                                class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                                v-model.lazy="notifications.comments"
                              />
                            </div>
                            <div class="text-sm leading-5 pl-7">
                              <label for="comments" class="font-medium text-gray-700">Comments</label>
                              <p
                                class="text-gray-500"
                              >Get notified when someones posts a comment on a video.</p>
                            </div>
                          </div>
                          <div class="mt-4">
                            <div class="flex items-start">
                              <div class="absolute flex items-center h-5">
                                <input
                                  id="candidates"
                                  type="checkbox"
                                  class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                                  v-model.lazy="notifications.subscribers"
                                />
                              </div>
                              <div class="text-sm leading-5 pl-7">
                                <label
                                  for="candidates"
                                  class="font-medium text-gray-700"
                                >Subscribers</label>
                                <p class="text-gray-500">Get notified when a user subscribes.</p>
                              </div>
                            </div>
                          </div>
                          <div class="mt-4">
                            <div class="flex items-start">
                              <div class="absolute flex items-center h-5">
                                <input
                                  id="offers"
                                  type="checkbox"
                                  class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                                  v-model.lazy="notifications.videos"
                                />
                              </div>
                              <div class="text-sm leading-5 pl-7">
                                <label for="offers" class="font-medium text-gray-700">Videos</label>
                                <p
                                  class="text-gray-500"
                                >Get notified when a user you are subscribed to uploads a new video.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <div class="my-8">
            <button
              class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              type="submit"
            >
              <span class="absolute left-0 pl-3 inset-y">
                <svg
                  class="w-5 h-5 text-indigo-500 transition duration-150 ease-in-out group-hover:text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign Up
            </button>
            <div class="flex items-center justify-center p-2 mt-6 border border-gray-200 rounded-lg">
              <p class="mr-2 text-gray-500">
                Back to
              </p>
              <router-link to="login" class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                Login
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '../components/avatar.vue'
import UsersService from '../services/users.service'

export default {
  name: 'SignUp',
  data () {
    return {
      errors: []
    }
  },
  computed: {
    username: {
      get () {
        return this.$store.getters['signup/username']
      },
      set (newValue) {
        this.$store.commit('signup/SET_USERNAME', newValue)
      }
    },
    email: {
      get () {
        return this.$store.getters['signup/email']
      },
      set (newValue) {
        this.$store.commit('signup/SET_EMAIL', newValue)
      }
    },
    password: {
      get () {
        return this.$store.getters['signup/password']
      },
      set (newValue) {
        this.$store.commit('signup/SET_PASSWORD', newValue)
      }
    },
    about: {
      get () {
        return this.$store.getters['signup/about']
      },
      set (newValue) {
        this.$store.commit('signup/SET_ABOUT', newValue)
      }
    },
    notifications: {
      get () {
        return this.$store.getters['signup/notifications']
      },
      set (newValue) {
        this.$store.commit('signup/SET_NOTIFICATIONS', newValue)
      }
    },
    avatar: {
      get () {
        return this.$store.getters['signup/avatar']
      },
      set (newValue) {
        this.$store.commit('signup/SET_AVATAR', newValue)
      }
    },
    banner: {
      get () {
        return this.$store.getters['signup/banner']
      },
      set (newValue) {
        this.$store.commit('signup/SET_BANNER', newValue)
      }
    }
  },
  methods: {
    triggerFileExplorer () {
      document.getElementById('inputfile').addEventListener('change', e => {
        var selectedFile = document.getElementById('inputfile').files[0]
        this.startUpload(selectedFile)
      })

      document.getElementById('inputfile').click()
    },
    addFile (e) {
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return;
      ([...droppedFiles]).forEach(f => {
        this.startUpload(f)
      })
    },
    startUpload (file) {
      this.banner = file
      console.log(file)
    },
    signUp: function () {
      this.$Progress.start()
      this.errors = []
      UsersService.signUp(this.username, this.email, this.password, this.avatar, this.banner, this.about, this.notifications)
        .then(user => {
          this.$Progress.finish()
          
          let self = this
          user.sendEmailVerification().then(() => {
            self.showSuccessMsg()
            self.loginSucceeded()
          }).catch((error) => {
            self.errors.push(error)
          })
        })
        .catch(err => {
          this.errors.push(err)
          this.$Progress.fail()
        })
    },
    loginSucceeded () {
      UsersService.afterLogin()
      this.$router.push('feed')
      this.$Progress.finish()
    },
    uploaded: function (file) {
      this.avatar = file
      console.log(file)
    }
  },
  notifications: {
    showSuccessMsg: {
      type: 'success',
      title: 'Success',
      message: 'You successfully signed up!'
    },
    showInfoMsg: {
      type: 'info',
      title: 'Hey you',
      message: 'Here is some info for you'
    },
    showWarnMsg: {
      type: 'warn',
      title: 'Wow, man',
      message: "That's the kind of warning"
    },
    showErrorMsg: {
      type: 'error',
      title: 'Error',
      message: ''
    }
  },
  components: {
    logo: () => ({
      component: import('../components/logo')
    }),
    avatar }
}
</script>
