import { $axios } from '~/utils/api'

const API_ENDPOINT = 'https://627c8a29bf2deb7174dc340a.mockapi.io/staff'

import { ActionContext, ActionTree } from 'vuex'
import { State, UpdateStaffBody } from '~/type/staff.type'

export interface Actions<S, R> extends ActionTree<S, R> {
  getStaffsList: (context: ActionContext<S, R>) => void

  addStaff: (
    context: ActionContext<S, R>,
    body: UpdateStaffBody
  ) => void

  editStaff: (
    context: ActionContext<S, R>,
    params: {
      body: UpdateStaffBody,
      id: string
    }
  ) => void

  deleteStaff: (
    context: ActionContext<S, R>,
    id: string
  ) => void
}

export const actions: Actions<State, State> = {
  getStaffsList: async ({ commit }) => {
    const res = await $axios.$get(API_ENDPOINT)
    commit('store', res)
  },

  addStaff: async ({ commit }, body) => {
    const res = await $axios.$post(API_ENDPOINT, body)
    commit('add', res)
  },

  editStaff: async ({ commit }, {body, id}) => {
    const res = await $axios.$put(API_ENDPOINT + '/' + id, body)
    commit('edit', res)
  },

  deleteStaff: async ({ commit }, id) => {
    const res = await $axios.$delete(API_ENDPOINT + '/' + id)
    commit('remove', res)
  }
}

