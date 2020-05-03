import { logstash_actions } from '../actions/logstash'
import { logstash_mutations } from '../mutations/logstash'

const logstash = {
  state: {
    logstashList: {
      count: 0,
      results: [
        {
          id: 1,
          description: 'weq',
          logstash_es_index: 'weq',
          logstash_kafka: 'weq',
          logstash_kafka_topic: 'weq'
        }
      ]
    },
    logstash: {}
  },
  actions: logstash_actions,
  mutations: logstash_mutations
}

export default logstash
