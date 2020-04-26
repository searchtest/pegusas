import * as types from '../constants/types'
import axios from '../../http-common'

export const job_actions = {
  fetchApps ({commit, state}, { url, params }) {
    console.log('###FETCHING_JOB###', url, params)
    url = url || '/api/v1/jobs/'
    axios.get(url, {params: params}).then((res) => {
      console.log('####FETCH_JOB_RES####', res)
      let data = res.data
      console.log('####FETCH_JOB_DATA####', data)
      commit(types.UPDATE_JOBS_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
