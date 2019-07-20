<template>
 <div class="container mx-auto h-full flex justify-center items-center py-16">
        <div class="w-full md:w-1/2">
            <div class="border-primary p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
                <div v-if="error.length > 0" class="rounded font-bold background-red-600">
                  {{error}}
                </div>
                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Email</label>
                    <input type="text" v-model="email" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Username">
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
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data () {
    return {
        email: '',
        error: ''
    }
  },
  methods: {
      sendReset: function() {
        if(this.email.length == 0) {
            this.error = 'Please enter an email.'
        }
        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
            alert("success");
        })
        .catch((err) => {
            this.error = err.message;
        });
      }
  }
}
</script>

<style lang="scss" scoped>
</style>
