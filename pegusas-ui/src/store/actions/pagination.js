import * as types from '../constants/types'
import axios from '../../http-common'

export const pagination_actions = {
  updatePagination ({ commit, state }, params) {
    commit(types.UPDATE_PAGINATION, {
      ...params
    })
  }
}
