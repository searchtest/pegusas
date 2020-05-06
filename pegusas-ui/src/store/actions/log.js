import * as types from '../constants/types'
import axios from '../../http-common'

export const log_actions = {
  fetchLogs ({commit, state}, { url, params }) {
    console.log('###FETCHING_LOG###', url, params)
    url = url || '/api/v1/logs'
    axios.get(url, {params: params}).then((res) => {
      console.log('####FETCH_LOG_RES####', res)
      let data = res.data
      console.log('####FETCH_LOG_DATA####', data)
      commit(types.UPDATE_LOGS_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  fetchLogDetail ({commit, state}, logId) {
    console.log('###FETCHING_LOG_DETAIL###', logId)
    axios.get('/api/v1/log/' + logId + '/').then((res) => {
      console.log('####FETCH_LOG_DETAIL_RES####', res)
      let data = res.data
      console.log('####FETCH_LOG_DETAIL_DATA####', data)
      commit(types.UPDATE_LOG_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  resetLog ({commit, state}) {
    console.log('###RESETING_LOG###')
    let data = {}
    console.log('###RESET_LOG_DATA###', data)
    commit(types.UPDATE_LOG_STATE, {
      data
    })
  },
  updateLOG ({commit, state}, params) {
    console.log('###UPDATING_LOG###', params)
    axios.put('/api/v1/log/' + params.id + '/', params).then((res) => {
      console.log('####UPDATE_LOG_RES####', res)
      let data = res.data
      console.log('####UPDATE_LOG_DATA####', data)
      commit(types.UPDATE_LOG_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  createLog ({commit, state}, params) {
    console.log('###CREATING_LOG###', params)
    axios.post('/api/v1/log/', params).then((res) => {
      console.log('####CREATE_LOG_RES####', res)
      let data = res.data
      console.log('####CREATE_LOG_DATA####', data)
      commit(types.UPDATE_LOG_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
