<template>
  <div>
    
    <router-link to="/">Home</router-link>
    <hr>
    <AddTodo
        @add-todo="addTodo"
    />
    <select v-model="filter">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="not-completed">Not Completed</option>
    </select>
    <hr>
    <Loader v-if="loading" />
    <TodoList
        v-else-if="filteredTodos.length"
        v-bind:todos="filteredTodos"
        @update-todo="updateTodo"
        @remove-todo="removeTodo"
    />
    <p v-else>No todos!</p>
  </div>
</template>

<script>
import PostService from '@/PostService'
import TodoList from '@/components/TodoList'
import AddTodo from '@/components/AddTodo'
import Loader from '@/components/Loader'
export default {
  name: 'app',
  data() {
    return {

      todos: [],
      loading: true,
      filter: 'all',
      error:'',
    }
  },
  async created() {
    try{
       this.todos = await PostService.get()
       this.loading = false
       console.log (this.todos)
    }catch(err){
      this.error = err.message
    }
  },
   mounted() {
    /*fetch('http://localhost:3000/api/todos')
      .then(response => response.json())
      .then(json => {
        this.todos = json
        this.loading = false
        console.log(this.todos)
      })*/
     
  },
  // watch: {
  //   filter(value) {
  //     console.log(value)
  //   }
  // },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos
      }

      if (this.filter === 'completed') {
        return this.todos.filter(t => t.completed)
      }

      if (this.filter === 'not-completed') {
        return this.todos.filter(t => !t.completed)
      }
    }
  },
  methods: {
    async updateTodo(todo) {
      //this.todos = this.todos.filter(t => t._id != id)
      await PostService.update(todo)
      this.todos = await PostService.get()
    },
   async removeTodo(id) {
      //this.todos = this.todos.filter(t => t._id != id)
      await PostService.delete(id)
      this.todos = await PostService.get()
    },
   async addTodo(todo) {
      //this.todos.push(todo)
      await PostService.insert(todo)
      this.todos = await PostService.get()
    }
  },
  components: {
    TodoList, AddTodo, Loader
  }
}
</script>