import { pagination_actions } from '../actions/pagination'
import { pagination_mutations } from '../mutations/pagination'

const pagination = {
  state: {
    count: 0,
    next: '',
    previous: '',
    page: 1,
    page_size: 20,
    error: ''
  },
  actions: pagination_actions,
  mutations: pagination_mutations
}

export default pagination
