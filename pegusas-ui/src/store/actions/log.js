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
  }
}
