import * as types from '../constants/types'

export const pagination_mutations = {
  [types.UPDATE_PAGINATION] (state, data) {
    state.count = data.count
    state.next = data.next
    state.previous = data.previous
    state.page = data.page
    state.page_size = data.page_size
  }
}
