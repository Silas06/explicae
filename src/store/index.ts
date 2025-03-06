import { createStore } from 'vuex'
import auth from './auth'
import books from './books'

const store = createStore({
  modules: {
    auth,
    books
  }
})

export default store
