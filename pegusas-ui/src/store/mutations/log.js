import * as types from '../constants/types'

export const log_mutations = {
  [types.UPDATE_LOGS_STATE] (state, action) {
    console.log('####LOGS_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.logs = action.data
    console.log('####LOGS_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
