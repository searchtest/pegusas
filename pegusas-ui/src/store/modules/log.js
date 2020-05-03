import { log_actions } from '../actions/log'
import { log_mutations } from '../mutations/log'

const log = {
  state: {
    logs: {
      count: 0,
      results: []
    }
  },
  actions: log_actions,
  mutations: log_mutations
}

export default log
