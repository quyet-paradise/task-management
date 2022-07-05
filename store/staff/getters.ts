import { State } from '~/type/staff.type'
import { GetterTree } from 'vuex'

export const getters: GetterTree<State, State> = {
  all: (state: State) => state.staffsList
}