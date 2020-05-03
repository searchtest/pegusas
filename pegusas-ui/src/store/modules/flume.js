import { flume_actions } from '../actions/flume'
import { flume_mutations } from '../mutations/flume'

const flume = {
  state: {
    flumes: {
      count: 0,
      results: [
        {
          id: 1,
          description: 'weq',
          flume_log_dir: 'weq',
          flume_kafka: 'weq',
          flume_kafka_topic: 'weq'
        }
      ]
    },
    flume: {}
  },
  actions: flume_actions,
  mutations: flume_mutations
}

export default flume
