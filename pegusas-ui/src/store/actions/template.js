import * as types from '../constants/types'
import axios from '../../http-common'

export const template_actions = {
  fetchTemplates ({commit, state}, { url, params }) {
    console.log('###FETCHING_TEMPLATE###', url, params)
    url = url || '/api/v1/templates/'
    axios.get(url, {params: params}).then((res) => {
      console.log('####FETCH_TEMPLATE_RES####', res)
      let data = res.data
      console.log('####FETCH_TEMPLATE_DATA####', data)
      commit(types.UPDATE_TEMPLATES_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  fetchTemplateDetail ({commit, state}, templateId) {
    console.log('###FETCHING_TEMPLATE_DETAIL###', templateId)
    axios.get('/api/v1/templates/' + templateId + '/').then((res) => {
      console.log('####FETCH_TEMPLATE_DETAIL_RES####', res)
      let data = res.data
      console.log('####FETCH_TEMPLATE_DETAIL_DATA####', data)
      commit(types.UPDATE_TEMPLATE_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  updateTemplate ({commit, state}, params) {
    console.log('###UPDATING_TEMPLATE###', params)
    axios.put('/api/v1/templates/' + params.id + '/', params).then((res) => {
      console.log('####UPDATE_TEMPLATE_RES####', res)
      let data = res.data
      console.log('####UPDATE_TEMPLATE_DATA####', data)
      commit(types.UPDATE_TEMPLATE_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  createTemplate ({commit, state}, params) {
    console.log('###CREATING_TEMPLATE###', params)
    axios.post('/api/v1/templates/', params).then((res) => {
      console.log('####CREATE_TEMPLATE_RES####', res)
      let data = res.data
      console.log('####CREATE_TEMPLATE_DATA####', data)
      commit(types.UPDATE_TEMPLATE_STATE, {
        data
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
