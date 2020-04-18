import { template_actions } from '../actions/template'
import { template_mutations } from '../mutations/template'

const template = {
  state: {
    templates: {
      count: 0,
      results: []
    },
    activeTemplate: {
      name: null,
      description: null,
      team: null,
      jira_key: null,
      related_template: []
    }
  },
  actions: template_actions,
  mutations: template_mutations
}

export default template
