import Vue from 'vue'
import Vuex from 'vuex'

import * as staff from './staff'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    modules: {
      [staff.name]: staff
    }
  })