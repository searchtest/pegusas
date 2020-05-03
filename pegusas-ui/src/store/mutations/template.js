import * as types from '../constants/types'

export const template_mutations = {
  [types.UPDATE_TEMPLATES_STATE] (state, action) {
    console.log('####TEMPLATE_STATE_UPDATING1####', JSON.parse(JSON.stringify(state)), action)
    state.templates = action.data
    console.log('####TEMPLATE_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  },
  [types.UPDATE_TEMPLATE_STATE] (state, action) {
    console.log('####TEMPLATE_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), action)
    state.template = action.data
    console.log('####TEMPLATE_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
