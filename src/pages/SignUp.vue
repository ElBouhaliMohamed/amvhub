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
  name: 'SignUp',
  data () {
    return {
        username: '',
        email: '',
        password: '',
        avatar: null,
    }
  },
  methods: {
    signUp: function() {
        this.$Progress.start();
        UsersService.signUp(this.username, this.email, this.password, this.avatar)
        .then((user) => {
            this.$Progress.finish();
            this.showSuccessMsg();
            this.loginSucceeded();
        }).catch((err) => {
            console.log(err);
            this.showErrorMsg({message: err.message});
            this.$Progress.fail();
        });
    },
    loginSucceeded() {
        UsersService.afterLogin();
        this.$router.push('feed');
        this.$Progress.finish();
    },
    uploaded: function(file) {
        this.avatar = file;
        console.log(file);
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
      message: 'That\'s the kind of warning'
    },
    showErrorMsg: {
      type: 'error',
      title: 'Error',
      message: ''
    }
  },
  components: {avatar}
}
</script>

<style lang="scss" scoped>
</style>
