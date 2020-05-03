import * as types from '../constants/types'

export const logstash_mutations = {
  [types.UPDATE_LOGSTASHLIST_STATE] (state, action) {
    console.log('####LOGSTASH_STATE_UPDATING1####', JSON.parse(JSON.stringify(state)), action)
    state.logstashList = action.data
    console.log('####LOGSTASH_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  },
  [types.UPDATE_LOGSTASH_STATE] (state, action) {
    console.log('####LOGSTASH_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.logstash = action.data
    console.log('####LOGSTASH_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
