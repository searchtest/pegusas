import * as types from '../constants/types'
import axios from '../../http-common'

export const appBatch_actions = {
  fetchAppBatchs ({commit, state}, { url, params }) {
    console.log('###FETCHING_APPBATCH###', url, params)
    url = url || '/api/v1/appBatch/'
    axios.get(url, {params: params}).then((res) => {
      console.log('####FETCH_APPBATCH_RES####', res)
      let data = res.data
      console.log('####FETCH_APPBATCH_DATA####', data)
      commit(types.UPDATE_APPBATCHS_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  resetAppBatchDetail ({commit, state}) {
    console.log('###RESETING_APPBATCH###')
    let data = {}
    console.log('###RESET_APPBATCH_DATA###', data)
    commit(types.UPDATE_APPBATCH_STATE, {
      data
    })
  },
  fetchAppBatchDetail ({commit, state}, batchId) {
    console.log('###FETCHING_APPBATCH_DETAIL###', batchId)
    axios.get('/api/v1/appBatch/' + batchId + '/').then((res) => {
      console.log('####FETCH_APPBATCH_DETAIL_RES####', res)
      let data = res.data
      console.log('####FETCH_APPBATCH_DETAIL_DATA####', data)
      commit(types.UPDATE_APPBATCH_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  fetchHosts ({commit, state}) {
    console.log('###FETCHING_HOSTS_DETAIL###')
    axios.get('/api/v1/hosts/').then((res) => {
      console.log('####FETCH_HOSTS_DETAIL_RES####', res)
      let data = res.data
      console.log('####FETCH_HOSTS_DETAIL_DATA####', data)
      commit(types.UPDATE_UNHOSTS_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  resetAppBatch ({commit, state}) {
    console.log('###RESETING_APPBATCH###')
    let data = {}
    console.log('###RESET_APPBATCH_DATA###', data)
    commit(types.UPDATE_APPBATCH_STATE, {
      data
    })
  },
  updateAppBatch ({commit, state}, params) {
    console.log('###UPDATING_APPBATCH###', params)
    axios.put('/api/v1/APPBATCHs/' + params.id + '/', params).then((res) => {
      console.log('####UPDATE_APPBATCH_RES####', res)
      let data = res.data
      console.log('####UPDATE_APPBATCH_DATA####', data)
      commit(types.UPDATE_APPBATCH_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  createAppBatch ({commit, state}, params) {
    console.log('###CREATING_APPBATCH###', params)
    axios.post('/api/v1/APPBATCHs/', params).then((res) => {
      console.log('####CREATE_APPBATCH_RES####', res)
      let data = res.data
      console.log('####CREATE_APPBATCH_DATA####', data)
      commit(types.UPDATE_APPBATCH_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  fetchAwxJobDetail ({ commit, state }) {
    console.log('####FETCHING_AWXJOB_PARAMS####')
    axios.get('/api/v2/jobs/')
      .then((res) => {
        console.log('####FETCH_AWXJOB_RES####', res)
        let data = res.data
        console.log('####FETCH_AWXJOB_DATA####', data)
        commit(types.FETCH_AWXJOB_SUCC, {
          data
        })
      }).catch((error) => {
        commit(types.FETCH_AWXJOB_FAIL, {
          error
        })
        console.log(error)
      })
  }
}
