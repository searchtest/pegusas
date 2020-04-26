import { job_actions } from '../actions/job'
import { job_mutations } from '../mutations/job'

const job = {
  state: {
    jobs: {
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
  actions: job_actions,
  mutations: job_mutations
}

export default job
