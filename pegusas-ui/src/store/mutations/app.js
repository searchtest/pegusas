import * as types from '../constants/types'

export const app_mutations = {
  [types.UPDATE_APPS_STATE] (state, action) {
    console.log('####APP_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.apps = action.data
    console.log('####APP_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
