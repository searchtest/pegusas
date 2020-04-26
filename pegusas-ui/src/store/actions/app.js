import * as types from '../constants/types'
import axios from '../../http-common'

export const app_actions = {
  fetchApps ({commit, state}, { url, params }) {
    console.log('###FETCHING_APP###', url, params)
    url = url || '/api/v1/apps/standard'
    axios.get(url, {params: params}).then((res) => {
      console.log('####FETCH_APP_RES####', res)
      let data = res.data
      console.log('####FETCH_APP_DATA####', data)
      commit(types.UPDATE_APPS_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
