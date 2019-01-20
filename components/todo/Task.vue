<template>
    <div v-if="!deleted" class="">
      <div class="card bg-light mb-3" style="">
        <div class="card-header">
          <button class="btn btn-danger" @click="removeTask">X</button>
          <button v-show="!showSelect" class="btn btn-info" @click="showSelect = true">Move</button>
          <!--<div v-show="showSelect" class="form-group">-->
            <select  @change="moveTask" class="form-control" v-show="showSelect" id="">
              <option value="">----</option>
              <option v-for="col in columns" :key="col.id" v-bind:value="col.id">{{col.name}}</option>
            </select>
          <!--</div>-->
          <button v-show="!showEdit" class="btn btn-success" @click="showEdit = true">Edit</button>

        </div>
        <div v-if="!showEdit" class="card-body">
          <h5 class="card-title">{{cardName}}</h5>
          <p class="card-text">{{cardDescription}}</p>
        </div>
        <div v-if="showEdit" class="card-body">
          <div class="form-group">
              <input type="text" v-model="cardName" class="form-control">
          </div>
          <div class="form-group">
            <textarea class="form-control" v-model="cardDescription" rows="5"></textarea>
          </div>
          <button @click="saveTask" class="btn btn-success">Save</button>

        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import {HOST_NAME, routes} from "~/constants";
  import {getHeaders} from "../../helpers";

    export default {
        props: ['task'],
        name: "Task",
        data () {
          return {
            columns: this.$store.state.columns.filter(item => item.id !== this.task.column),
            // columns: [],
            moveTo: '',
            'showSelect': false,
            'deleted': false,
            showEdit: false,
            cardName: this.task.name,
            cardDescription: this.task.description,
          }
        },
        mounted() {
          // console.log(this.$store.state.columns)
          // console.log(this.task)
        },
        methods: {
          removeTask: function (e) {
            let id = this.task.id
            this.$store.commit('removeTask', this.task)

              axios
              .delete(`${HOST_NAME}${routes.archive_task(id)}`, {headers: getHeaders()})
              .then(response => {
                this.$store.commit('removeTask', this.task)

                this.deleted = true
                this.$emit(`tasks = []`)

              })
              .catch(error => {
                // console.log(error);
                // this.errored = true;
              })
              .finally(() => (this.loading = false));

          },
          moveTask: function (e) {
            let move_to_column = parseInt(e.target.value)
            if (!move_to_column) {
              return
            }
            let data = {'column': move_to_column}
            axios
              .put(`${HOST_NAME}${routes.move_task(this.task.id)}`, data, {headers: getHeaders()})
              .then(response => {
                this.task['new_column'] = response.data.column
                this.$store.commit('moveTask', this.task)
                location.reload()

              })
              .catch(error => {
                // console.log(error);
                // this.errored = true;
              })
              .finally(() => (this.loading = false));
          },


          saveTask: function (e) {
            let data = {
              name: this.cardName,
              description: this.cardDescription,
            };
            axios
              .put(`${HOST_NAME}${routes.edit_task(this.task.id)}`, data, {headers: getHeaders()})
              .then(response => {
                this.$store.commit('editTask', response.data)
                this.showEdit = false
              })
              .catch(error => {
                console.log(error.response.data);
                // this.errored = true;
              })
              .finally(() => (this.loading = false));
          }
        }
    }
</script>

<style scoped>

</style>
