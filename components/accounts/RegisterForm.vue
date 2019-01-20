<template>
  <form @submit.prevent="handleRegistration" id="registerForm">
    <h2>Registration page</h2>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="passwordField1">Password</label>
      <input v-model="password1" type="password" class="form-control" id="passwordField1" placeholder="Password" required>
    </div>
    <div class="form-group">
      <label for="passwordField1">Password</label>
      <input v-model="password2" type="password" class="form-control" id="passwordField2" placeholder="Repeat password" required>
    </div>

    <div v-if="errors.length" class="alert alert-danger" role="alert">
      <ul>
        <li v-for="(error, index) in errors" v-bind:key="index">{{error}}</li>
      </ul>
    </div>
    <button type="submit" class="btn btn-primary">Sign Up</button>
    <nuxt-link to="/accounts/login" class="">Sign In</nuxt-link>
  </form>
</template>

<script>

  import VueTelInput from 'vue-tel-input';
  import {HOST_NAME, routes} from "~/constants";
  import {getHeaders} from "../../helpers";
  import axios from 'axios';
  import {post} from '~/helpers'

  export default {
    name: "RegisterForm",
    components: {VueTelInput},
    data() {
      return {
        errors: [],
        password1: '',
        password2: '',
        phone_number: '',
        email: '',
      }
    },
    methods: {
      async handleRegistration (e) {

        let data = {
          "email": this.email,
          "password1": this.password1,
          "password2": this.password2,
        };

        await axios.post(`${HOST_NAME + routes.register}`, data)
          .then((response) => {
            this.$router.push('/accounts/login/')
          })
          .catch((error) => {
            // this.errors = this.errors.push(error.response.data)
            for (let k in error.response.data) {
              this.errors = error.response.data[k]
            }
          });
      },
      phoneFieldFocus: function () {

        this.$store.state.counter ++
        console.log(this.$store.state.counter)
      }
    },
  }
</script>

<style scoped>

</style>
