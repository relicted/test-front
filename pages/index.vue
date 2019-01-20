<template>
  <div class="container-fluid">
    <div class="row" style="margin-bottom: 50px; height: 60px;">
      <a v-show="$store.state.auth" @click="logout" href="#">logout</a>

    </div>
    <div class="row">
      <div class="btn-group">
        <!--<button class="btn btn-info" data-toggle="modal" data-target="#createColumnModal">New Column</button>-->
      </div>
    </div>
    <div class="row">
      <Column v-for="column in $store.state.columns"
              :key="column.id"
              :column="column"
              />
    </div>
  </div>
</template>

<style>
  .card-body-column {
    overflow: scroll;
  }
</style>
<script>
import axios from 'axios';

import {HOST_NAME, routes} from "~/constants";
import Column from '~/components/todo/Column';
import {getHeaders} from "../helpers";
import {actions} from "../store";

export default {
  beforeMount: function () {
    let user = JSON.parse(localStorage.getItem('vuex'));
    if (user && user.auth) {
    } else {
      this.$router.push('/accounts/login/')
    }
  },

  components: {
    Column,
  },
  data() {
    return {
      loading: true,
      columns: this.$store.state.columns,
    }

  },
  methods: {
    logout: function () {
      axios
        .post(`${HOST_NAME}${routes.logout}`, {headers: getHeaders()})
        .then(response => {
          this.$store.commit('removeUser')
          this.$router.push('/accounts/login')

        })
        .catch(error => {
          // console.log(error.data);
          // this.errored = true;
        })
        .finally(() => (this.loading = false));
    }

  },

  mounted() {
    axios
      .get(`${HOST_NAME}${routes.columns}`, {headers: getHeaders()})
      .then(response => {

        // this.columns = response.data;
        this.$store.commit('setColumns', response.data)
        // console.log(this.$store.state.columns)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => (this.loading = false));
  }
}
</script>

<style>

</style>

