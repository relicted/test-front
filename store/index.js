import {HOST_NAME, routes} from "../constants";
import {getHeaders} from "../helpers";


export const state = () => ({
  counter: 0,
  columns: []
});

export const mutations = {
  increment (state) {
    state.counter++
  },
  setUser (state, auth) {
    state.auth = auth
  },
  removeUser(state) {
    state.auth = null

  },
  setColumns (state, columns) {
    state.columns = columns
  },
  removeTask(state, task) {
    let state_columns = state.columns;
    for (let i in state_columns) {
      if (state_columns[i]['id'] === task.column) {
          state_columns[i].tasks = state_columns[i].tasks.filter(function(list_item) {
            console.log('filter task', list_item)
          return list_item.id !== task.id;
        })
      }

    }

    state.columns = state_columns
  },

  addTask(state, task) {
    let state_columns = state.columns
    for (let i in state_columns) {
      if (state_columns[i]['id'] === task.column) {

        state_columns[i].tasks.push(task)
      }
    }
    state.columns = state_columns
  },

  moveTask(state, task) {
    let state_columns = state.columns

    for (let i in state_columns) {
      if (state_columns[i]['id'] === task.column) {
        state_columns[i].tasks = state_columns[i].tasks.filter(function(list_item) {
          return list_item.id !== task.id;
        })
      }
    }

    for (let k in state_columns) {
      if (state_columns[k]['id'] === task.new_column) {

        task.column = task.new_column
        state_columns[k].tasks.push(task)
      }
    }
    state.columns = state_columns


  },
  editTask(state, task) {
    let state_columns = state.columns

    for (let i in state_columns) {
      if (state_columns[i]['id'] === task.column) {
        let tasks =  state_columns[i].tasks
        for (let k in tasks) {
          if (tasks[k]['id'] === task.id) {
            state_columns[i].tasks[k] = task
          }
        }
      }
    }
    state.columns = state_columns

  }
};

export const getters = {
  getUser: (state) => {
    return state.auth
  }

}


