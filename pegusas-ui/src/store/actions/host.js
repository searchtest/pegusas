import * as types from '../constants/types'
import axios from '../../http-common'

export const host_actions = {
  fetchApps ({commit, state}, { url, params }) {
    console.log('###FETCHING_APP###', url, params)
    url = url || '/api/v1/hosts/'
    axios.get(url, {params: params}).then((res) => {
      console.log('####FETCH_HOST_RES####', res)
      let data = res.data
      console.log('####FETCH_HOST_DATA####', data)
      commit(types.UPDATE_HOSTS_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  operateHost ({commit, state}, params) {
    console.log('###OPERATE_HOST###', params)
    axios.post('/api/v1/host/', params).then((res) => {
      console.log('####OPERATE_HOST_RES####', res)
      let data = res.data
      console.log('####OPERATE_HOST_DATA####', data)
      commit(types.UPDATE_HOST_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
