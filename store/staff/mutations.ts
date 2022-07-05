import { Staff, State } from '~/type/staff.type'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<State> = {
  store(state: State, data: Staff[]) {
    state.staffsList = data
  },
  
  add(state: State, content: Staff) {
    state.staffsList.push(content)
  },
    
  edit(state: State, content: Staff) {
    const index = state.staffsList.findIndex(
      (staff: Staff) => staff.id === content.id
    )
    state.staffsList[index] = content
  },
  
  remove(state: State, content: Staff) {
    const index = state.staffsList.findIndex(
      (staff: Staff) => staff.id === content.id
    )
    state.staffsList.splice(index, 1)
  }
}