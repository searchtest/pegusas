import * as types from '../constants/types'

export const host_mutations = {
  [types.UPDATE_HOSTS_STATE] (state, action) {
    console.log('####HOSTS_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.hosts = action.data
    console.log('####HOSTS_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  },
  [types.UPDATE_HOST_STATE] (state, action) {
    console.log('####HOST_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.host = action.data
    console.log('####HOST_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
