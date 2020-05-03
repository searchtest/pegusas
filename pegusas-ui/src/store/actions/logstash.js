import * as types from '../constants/types'
import axios from '../../http-common'

export const logstash_actions = {
  fetchLogstashList ({commit, state}, { url, params }) {
    console.log('###FETCHING_LOGSTASH###', url, params)
    url = url || '/api/v1/templates/logstash'
    axios.get(url, {params: params}).then((res) => {
      console.log('####FETCH_LOGSTASH_RES####', res)
      let data = res.data
      console.log('####FETCH_LOGSTASH_DATA####', data)
      commit(types.UPDATE_LOGSTASHLIST_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  fetchLogstashDetail ({commit, state}, logstashId) {
    console.log('###FETCHING_LOGSTASH_DETAIL###', logstashId)
    axios.get('/api/v1/templates/logstash/' + logstashId + '/').then((res) => {
      console.log('####FETCH_LOGSTASH_DETAIL_RES####', res)
      let data = res.data
      console.log('####FETCH_LOGSTASH_DETAIL_DATA####', data)
      commit(types.UPDATE_LOGSTASH_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  resetLogstash ({commit, state}) {
    console.log('###RESETING_LOGSTASH###')
    let data = {}
    console.log('###RESET_LOGSTASH_DATA###', data)
    commit(types.UPDATE_LOGSTASH_STATE, {
      data
    })
  },
  updateLogstash ({commit, state}, params) {
    console.log('###UPDATING_LOGSTASH###', params)
    axios.put('/api/v1/templates/logstash/' + params.id + '/', params).then((res) => {
      console.log('####UPDATE_LOGSTASH_RES####', res)
      let data = res.data
      console.log('####UPDATE_LOGSTASH_DATA####', data)
      commit(types.UPDATE_LOGSTASH_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  createLogstash ({commit, state}, params) {
    console.log('###CREATING_LOGSTASH###', params)
    axios.post('/api/v1/templates/logstash/', params).then((res) => {
      console.log('####CREATE_LOGSTASH_RES####', res)
      let data = res.data
      console.log('####CREATE_LOGSTASH_DATA####', data)
      commit(types.UPDATE_LOGSTASH_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
