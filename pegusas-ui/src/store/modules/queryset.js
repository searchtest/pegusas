import { queryset_mutations } from '../mutations/queryset'

const queryset = {
  state: {
    querysets: {
      template: null,
      app: null,
      appBatch: null,
      host: null,
      jobs: null
    }
  },
  actions: null,
  mutations: queryset_mutations
}

export default queryset
