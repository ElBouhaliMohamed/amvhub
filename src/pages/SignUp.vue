<template>
 <div class="container mx-auto h-full flex justify-center items-center py-16">
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
    </div>
</template>

<script>
import avatar from "../components/avatar.vue";
import UsersService from '../services/users.service'


export default {
  name: 'Login',
  data () {
    return {
        username: '',
        email: '',
        password: '',
        avatar: null
    }
  },
  methods: {
      signUp: function() {
        UsersService.signUp(this.username, this.email, this.password, this.avatar)
        .then((user) => {
            alert('Your account has been created!')
        }).catch((err) => {
            alert('Error: ' + err.message)
        });
      },
      uploaded: function(file) {
        this.avatar = file;
        console.log(file);
      }
  },
  components: {avatar}
}
</script>

<style lang="scss" scoped>
</style>
