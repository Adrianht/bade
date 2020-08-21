import Vue from 'vue'
import App from './App'
require('dotenv').config()


new Vue({
  el: '#app',
  render: h => h(App)
})

