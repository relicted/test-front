<template>
  <div class="col-sm-6 col-md-3">
    <div class="card" style="">
      <div class="card-header">
        <h5 class="card-title">{{column.name}}</h5>

      </div>
      <div class="card-body card-body-column" style="height: 600px;">
        <Task v-for="task in tasks" :key="task.id" :task="task"/>

      </div>
      <div class="card-footer">
        <a href="#" @click="show_create = true" v-show="!show_create">+ add task</a>
        <div class="" v-show="show_create" style="margin-top: 15px;">
          <div class="form-group">
            <input v-model="task_name" placeholder="Name" v-bind:id="'taskNameColumn' + column.id" type="text" class="form-control">
          </div>
          <div class="form-group">
            <textarea v-model="task_description" placeholder="Description" name="description" rows="5" class="form-control"></textarea>
          </div>
          <div class="btn-group" style="margin-top: 10px;">
            <button @click="createNewTask" class="btn btn-success">Create</button>
            <button @click="show_create = false" class="btn btn-gray">Cancel</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from '~/components/todo/Task';
  import axios from 'axios';
  import {HOST_NAME, routes} from "~/constants";
  import {getHeaders} from "../../helpers";

  export default {
    components: {
      Task
    },
    data () {
      return {
        tasks: this.column.tasks,
        task_name: '',
        task_description: '',
        show_create: false,
      }
    },
    name: "Column",
    props: ['column'],
    methods: {
      checkData: function () {
      },
      createNewTask: function () {
        let data = {
          name: this.task_name,
          description: this.task_description,
          column: this.column.id
        }
        axios
          .post(`${HOST_NAME}${routes.create_task}`, data, {headers: getHeaders()})
          .then(response => {
            this.tasks.push(response.data)
            this.$store.commit('addTask', response.data)

            this.show_create = false
          })
          .catch(error => {
            // console.log(error.data);
            // this.errored = true;
          })
          .finally(() => (this.loading = false));
      }
    }

  }
</script>

<style scoped>

</style>
