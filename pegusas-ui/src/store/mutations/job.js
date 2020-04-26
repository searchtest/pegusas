import * as types from '../constants/types'

export const job_mutations = {
  [types.UPDATE_JOBS_STATE] (state, action) {
    console.log('####JOB_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.jobs = action.data
    console.log('####JOB_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
