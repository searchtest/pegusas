import * as types from '../constants/types'

export const system_mutations = {
  [types.UPDATE_SYSTEMS_STATE] (state, action) {
    console.log('####SYSTEMS_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.systems = action.data
    console.log('####SYSTEMS_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
