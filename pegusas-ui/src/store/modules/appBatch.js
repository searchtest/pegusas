import { appBatch_actions } from '../actions/appBatch'
import { appBatch_mutations } from '../mutations/appBatch'

const appBatch = {
  state: {
    appBatchs: {
      count: 0,
      results: [
        {
          id: 1,
          name: 'eeesa',
          updateTime: 'eeesa',
          time: 'eeesa',
          type: 'eeesa',
          rate: 'eeesa',
          description: 'eeesa',
          status: 'running'
        },
        {
          id: 2,
          name: 'wee',
          updateTime: 'eeesa',
          time: 'eeesa',
          type: 'eeesa',
          rate: 'eeesa',
          description: 'eeesa',
          status: 'start'
        }
      ]
    },
    hosts: {
      count: 0,
      results: [
        {
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
        }
      ]
    },
    appBatchDetail: {
      hosts: []
    },
    awxJob: {}
  },
  actions: appBatch_actions,
  mutations: appBatch_mutations
}

export default appBatch
