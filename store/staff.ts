import { $axios } from '~/utils/api'

const API_ENDPOINT = 'https://627c8a29bf2deb7174dc340a.mockapi.io/staff'

export const state = () => {
  staffsList: []
}

export const getters = {
  all(state: any) {
    return state.staffsList
  }
}

export const mutations = {
  store(state: any, data: any) {
    state.staffsList = data
  },

  add(state: any, content: any) {
    state.staffsList.push(content)
  },
  
  edit(state: any, content: any) {
    const index = state.staffsList.findIndex(
      (staff: any) => staff.id === content.id
    )
    state.staffsList[index] = content
  },

  remove(state: any, content: any) {
    const index = state.staffsList.findIndex(
      (staff: any) => staff.id === content.id
    )
    state.staffsList.splice(index, 1)
  }
}

export const actions = {
  async getStaffsList(vuexContext: any) {
    const res = await $axios.$get(API_ENDPOINT)
    vuexContext.commit('store', res)
  },

  async addStaff(vuexContext: any, content: any) {
    try {
      const res = await $axios.$post(API_ENDPOINT, content)
      vuexContext.commit('add', res)
    } catch (err) {
      console.log(err)
    }
  },

  async editStaff(vuexContext: any, content: any) {
    try {
      const res = await $axios.$put(API_ENDPOINT + '/' + content.id, content)
      vuexContext.commit('edit', res)
    } catch (err) {
      console.log(err)
    }
  },

  async deleteStaff(vuexContext: any, content: any) {
    try {
      const res = await $axios.$delete(API_ENDPOINT + '/' + content.id)
      vuexContext.commit('remove', res)
    } catch (err) {
      console.log(err)
    }
  }
}