import * as types from '../constants/types'

export const queryset_mutations = {
  [types.UPDATE_QUERYSET_STATE] (state, {iterator, queryset}) {
    console.log('####QUERYSET_STATE_UPDATING####', JSON.parse(JSON.stringify(state)), iterator, queryset)
    state.querysets = {
      ...state.querysets,
      [iterator]: queryset
    }
    console.log('####QUERYSET_STATE_UPDATED####', JSON.parse(JSON.stringify(state)))
  }
}
