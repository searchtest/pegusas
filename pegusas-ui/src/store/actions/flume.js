import * as types from '../constants/types'
import axios from '../../http-common'

export const flume_actions = {
  fetchFlumes ({commit, state}, { url, params }) {
    console.log('###FETCHING_FLUME###', url, params)
    url = url || '/api/v1/templates/flume'
    axios.get(url, {params: params}).then((res) => {
      console.log('####FETCH_FLUME_RES####', res)
      let data = res.data
      console.log('####FETCH_FLUME_DATA####', data)
      commit(types.UPDATE_FLUMES_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  fetchFlumeDetail ({commit, state}, id) {
    console.log('###FETCHING_FLUME_DETAIL###', id)
    axios.get('/api/v1/templates/flume/' + id + '/').then((res) => {
      console.log('####FETCH_FLUME_DETAIL_RES####', res)
      let data = res.data
      console.log('####FETCH_FLUME_DETAIL_DATA####', data)
      commit(types.UPDATE_FLUME_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  resetFlume ({commit, state}) {
    console.log('###RESETING_FLUME###')
    let data = {}
    console.log('###RESET_FLUME_DATA###', data)
    commit(types.UPDATE_FLUME_STATE, {
      data
    })
  },
  updateFlume ({commit, state}, params) {
    console.log('###UPDATING_FLUME###', params)
    axios.put('/api/v1/templates/flume/' + params.id + '/', params).then((res) => {
      console.log('####UPDATE_FLUME_RES####', res)
      let data = res.data
      console.log('####UPDATE_FLUME_DATA####', data)
      commit(types.UPDATE_FLUME_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  createFlume ({commit, state}, params) {
    console.log('###CREATING_FLUME###', params)
    axios.post('/api/v1/templates/flume/', params).then((res) => {
      console.log('####CREATE_FLUME_RES####', res)
      let data = res.data
      console.log('####CREATE_FLUME_DATA####', data)
      commit(types.UPDATE_FLUME_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
