<template>
  <!-- <div class="container mx-auto h-full flex justify-center items-center py-16">
        <div class="w-full md:w-1/2">
            <div class="border-primary p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Email</label>
                    <input id="email" type="text" v-model="email" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Email">
                </div>
                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Username</label>
                    <input id="username" type="text" v-model="username" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Username">
                </div>

                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Password</label>
                    <input id="password" type="password" v-model="password" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Password">
                </div>

                <avatar @uploaded="uploaded"/>

                <div class="flex items-center justify-between">
                    <button class="btn btn-primary" @click="signUp">
                        Sign Up
                    </button>
                </div>
                
            </div>
            <div class="text-center">
                <p class="text-grey-dark text-sm">Back to <router-link to="login" class="no-underline text-blue font-bold">Login</router-link>.</p>
            </div>
        </div>
  </div>-->
  <div>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div class="max-w-xl w-full">
        <!-- <div>
            <logo class="mx-auto h-12 w-auto text-gray-900 text-center text-4xl"/>
            <h2 class="my-6 bg-white text-gray-500 leading-5 text-lg">
              By having an amvhub account, you can join, vote, and comment on all your favorite amv content.
            </h2>

        </div>-->
        <form v-on:submit.prevent class="mt-16">
          <div>
            <div>
              <div>
                <router-link to="/">
                  <logo class="mx-auto h-12 w-auto text-gray-900 text-center text-4xl"/>
                </router-link>
                <div class="mt-6 relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm leading-5">
                  <span class="px-2 bg-white text-gray-500">
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
                    <div class="max-w-lg flex rounded-md shadow-sm">
                      <span
                        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                      >amvhub.com/</span>
                      <input
                        id="username"
                        v-model="username"
                        class="flex-1 form-input block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                    <div class="max-w-lg flex rounded-md shadow-sm">
                      <input
                        v-model="email"
                        aria-label="Email address"
                        name="email"
                        type="email"
                        class="flex-1 form-input block w-full rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                    <div class="max-w-lg flex rounded-md shadow-sm">
                      <input
                        id="password"
                        type="password"
                        v-model="password"
                        class="flex-1 form-input block w-full rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                    <div class="max-w-lg flex rounded-md shadow-sm">
                      <textarea
                        id="about"
                        rows="3"
                        class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                    class="block text-sm leading-5 font-medium text-gray-700"
                  >Avatar</label>
                  <avatar @uploaded="uploaded" />
                </div>

                <div
                  class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="cover_photo"
                    class="block text-sm leading-5 font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >Cover photo</label>
                  <div class="mt-2 sm:mt-0 sm:col-span-2">
                    <div
                      class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                    >
                      <div class="text-center"
                        v-cloak
                        @drop.prevent="addFile"
                        @dragover.prevent
                        @click="triggerFileExplorer"
                      >
                        <svg
                          class="mx-auto h-12 w-12 text-gray-400"
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
                            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                          >Upload a file</button>
                          or drag and drop
                        </p>
                        <p class="mt-1 text-xs text-gray-500">PNG or JPG up to 10MB</p>
                        <input type="file" id="inputfile" name="inputfile" class="hidden" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
                <p
                  class="mt-1 max-w-2xl text-sm leading-5 text-gray-500"
                >We'll always let you know about important changes, but you pick what else you want to hear about.</p>
              </div>
              <div class="mt-6 sm:mt-5">
                <div class="sm:border-t sm:border-gray-200 sm:pt-5">
                  <fieldset>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                      <div>
                        <legend
                          class="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                        >By Email</legend>
                      </div>
                      <div class="mt-4 sm:mt-0 sm:col-span-2">
                        <div class="max-w-lg">
                          <div class="flex items-start">
                            <div class="absolute flex items-center h-5">
                              <input
                                id="comments"
                                type="checkbox"
                                class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                              />
                            </div>
                            <div class="pl-7 text-sm leading-5">
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
                                  class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                />
                              </div>
                              <div class="pl-7 text-sm leading-5">
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
                                  class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                />
                              </div>
                              <div class="pl-7 text-sm leading-5">
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
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              @click="signUp"
            >
              <span class="absolute left-0 inset-y pl-3">
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
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
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '../components/avatar.vue'
import UsersService from '../services/users.service'
import logo from '../components/logo'

export default {
  name: 'SignUp',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      avatar: null
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
      console.log(file)
    },
    signUp: function () {
      this.$Progress.start()
      UsersService.signUp(this.username, this.email, this.password, this.avatar)
        .then(user => {
          this.$Progress.finish()
          this.showSuccessMsg()
          this.loginSucceeded()
        })
        .catch(err => {
          console.log(err)
          this.showErrorMsg({ message: err.message })
          this.$Progress.fail()
        })
    },
    loginSucceeded () {
      UsersService.afterLogin()
      this.$router.push('audienceChoice')
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
  components: { avatar, logo }
}
</script>
