import * as types from '../constants/types'
import axios from '../../http-common'

export const system_actions = {
  fetchSystems ({commit, state}, { url, params }) {
    console.log('###FETCHING_SYSTEMS###', url, params)
    url = url || '/api/v1/systems/'
    axios.get(url, {params: params}).then((res) => {
      console.log('####FETCH_SYSTEMS_RES####', res)
      let data = res.data
      console.log('####FETCH_SYSTEMS_DATA####', data)
      commit(types.UPDATE_SYSTEMS_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
