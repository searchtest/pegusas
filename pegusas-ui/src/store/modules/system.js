import { system_actions } from '../actions/system'
import { system_mutations } from '../mutations/system'

const system = {
  state: {
    systems: {
      count: 0,
      results: [{
        name: 'afsdf',
        description: 'afsdf',
        updateBy: 'afsdf',
        updateTime: 'afsdf'
      }
      ]
    }
  },
  actions: system_actions,
  mutations: system_mutations
}

export default system
