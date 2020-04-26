import { host_actions } from '../actions/host'
import { host_mutations } from '../mutations/host'

const host = {
  state: {
    hosts: {
      count: 0,
      results: [{
        ip: 'sad1',
        team: 'sad',
        app: 'sad',
        idc: 'sad',
        moban: 'sad',
        fuwu: 'sad',
        status: 'sad',
        banben: 'sad'
      },
      {
        ip: 'sad2',
        team: 'sad',
        app: 'sad',
        idc: 'sad',
        moban: 'sad',
        fuwu: 'sad',
        status: 'sad',
        banben: 'sad'
      },
      {
        ip: 'sad3',
        team: 'sad',
        app: 'sad',
        idc: 'sad',
        moban: 'sad',
        fuwu: 'sad',
        status: 'sad',
        banben: 'sad'
      },
      {
        ip: 'sad4',
        team: 'sad',
        app: 'sad',
        idc: 'sad',
        moban: 'sad',
        fuwu: 'sad',
        status: 'sad',
        banben: 'sad'
      }]
    },
    host: {}
  },
  actions: host_actions,
  mutations: host_mutations
}

export default host
