import { app_actions } from '../actions/app'
import { app_mutations } from '../mutations/app'

const app = {
  state: {
    apps: {
      count: 0,
      results: [{
        name: 'dsf',
        team: 'dsf',
        time: 'dsf',
        description: 'dsf'
      }
      ]
    }
  },
  actions: app_actions,
  mutations: app_mutations
}

export default app
