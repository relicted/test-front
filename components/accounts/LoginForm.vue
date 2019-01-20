<template>
  <form @submit.prevent="handleLogin">
    <h2>Login page</h2>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div v-if="errors.length" class="alert alert-danger" role="alert">
      <ul>
        <li v-for="(error, index) in errors" v-bind:key="index">{{error}}</li>
      </ul>
    </div>
    <button type="submit" class="btn btn-primary">Sign In</button>
    <nuxt-link to="/accounts/register">Sign Up</nuxt-link>
  </form>
</template>

<script>
  import axios from 'axios'
  import {HOST_NAME, routes} from "~/constants";
  import {getHeaders} from "~/helpers";

  export default {
    name: "Login",
    data() {
      return {
        errors: [],
        email: '',
        password: ''
      }
    },
    beforeMount: function () {
      let user = JSON.parse(localStorage.getItem('vuex'));
      if (user && user.auth) {
        this.$router.push('/')
      }
    },
    methods: {
      handleLogin: async function (e) {

        let data = {
          email: this.email,
          password: this.password
        };

        await axios.post(`${HOST_NAME + routes.login}`, data, {headers: getHeaders()})
          .then((response) => {
            // console.log(this.$store.state.auth)
            this.$store.commit('setUser', response.data)
            this.$router.push('/')
          })
          .catch((error) => {
            // Error
            this.errors = ['error ok da?']

          });

      }
    }
  }
</script>

<style scoped>

</style>
