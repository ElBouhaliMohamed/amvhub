<template>
 <div class="container mx-auto h-full flex justify-center items-center py-16">
        <div class="w-full md:w-1/2">
            <div class="border-primary p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
                <div class="mb-2 text-center">
                  <p class="text-grey-dark text-sm mb-2 font-bold uppercase">Sign in with Google</p>
                  <button class="btn btn-social w-24" @click="loginWithGoogle">
                    <img class="block m-auto w-8 h-8" src="/google.png"/>
                  </button>
                </div>

                <div class="flex justify-center w-full mb-4">
                  <span class="w-1/2 self-center h-1 border-b border-black"></span>
                  <p class="w-1/8 text-center text-grey-dark text-sm font-bold uppercase">Or</p>
                  <span class="w-1/2 self-center h-1 border-b border-black"></span>
                </div>

                <div v-if="error.length > 0" class="rounded font-bold background-red-600">
                  {{error}}
                </div>

                <div class="mb-4"> 
                    <label class="font-bold text-grey-darker block mb-2">Email</label>
                    <input type="text" v-model="email" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Email">
                </div>

                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Password</label>
                    <input type="password" v-model="password" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Password">
                </div>

                <div class="flex items-center justify-between">
                    <button class="btn btn-primary w-32" @click="login">
                        Login
                    </button>

                    <router-link to="passwordreset" class="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right">
                        Forgot Password?
                    </router-link>
                </div>
                
            </div>

            <div class="text-center">
                <p class="text-grey-dark text-sm">Don't have an account? <router-link to="signup" class="no-underline text-blue font-bold">Create an Account</router-link>.</p>
            </div>
        </div>
    </div>
</template>

<script>
import UsersService from '../services/users.service'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    forgotPassword() {
    },
    login() {
      this.error = '';
      this.$Progress.start();

      if(this.password.length == 0) {
        this.error = 'Please enter a password.'
        this.$Progress.fail();
      }

      if(this.email.length == 0) {
        this.error = 'Please enter an email.'
        this.$Progress.fail();
      }

      if(this.error.length == 0) {
        UsersService.login(this.email, this.password)
        .then((user) => {
          this.loginSucceeded();
        })
        .catch((err) => { 
          this.error = err.message
          this.$Progress.fail();
        })
      }
    },
    loginWithGoogle() {
      this.$Progress.start();
      UsersService.loginWithGoogle().then((result) => {
        this.loginSucceeded();
      }).catch((err) => {
        this.error = err.message;
        this.$Progress.fail();      
      })
    },
    loginSucceeded() {
      UsersService.afterLogin();
      this.$router.push('audienceChoice');
      this.$Progress.finish();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
