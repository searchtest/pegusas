import * as types from '../constants/types'

export const appBatch_mutations = {
  [types.UPDATE_APPBATCHES_STATE] (state, action) {
    console.log('####APPBATCHES_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.APPBATCHES = action.data
    console.log('####APPBATCHES_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  },
  [types.UPDATE_APPBATCH_STATE] (state, action) {
    console.log('####APPBATCH_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.appBatchDetail = action.data
    console.log('####APPBATCH_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  },
  [types.UPDATE_BATCHHOSTS_STATE] (state, action) {
    console.log('####UNHOSTS_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.hosts = action.data
    console.log('####UNHOSTS_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  },
  [types.UPDATE_BATCHTEMPLATES_STATE] (state, action) {
    console.log('####BATCHTEMPLATES_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.templates = action.data
    console.log('####BATCHTEMPLATES_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  },
  [types.FETCH_AWXJOB_SUCC] (state, action) {
    console.log('####AWXJOB_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.awxJob = action.data
    console.log('####AWXJOB_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  },
  [types.FETCH_AWXJOB_FAIL] (state, action) {
    console.log('####AWXJOB_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.awxJob = action.data
    console.log('####AWXJOB_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
