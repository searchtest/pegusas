import { template_actions } from '../actions/template'
import { template_mutations } from '../mutations/template'

const template = {
  state: {
    templates: {
      count: 0,
      results: [
        {
          id: 1,
          name: 'afasdsd323',
          description: 'afasd',
          team: 'afasd',
          jira_key: 'afasd',
          template_type: 'flume'
        }
      ]
    },
    template: {}
  },
  actions: template_actions,
  mutations: template_mutations
}

export default template
