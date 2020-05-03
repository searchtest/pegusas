import * as types from '../constants/types'

export const flume_mutations = {
  [types.UPDATE_FLUMES_STATE] (state, action) {
    console.log('####FLUME_STATE_UPDATING1####', JSON.parse(JSON.stringify(state)), action)
    state.flumes = action.data
    console.log('####FLUME_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  },
  [types.UPDATE_FLUME_STATE] (state, action) {
    console.log('####FLUME_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.flume = action.data
    console.log('####FLUME_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
