import { queryRepairList } from '../services/example'
export default {
    namespace: 'products',
    state: [],
    reducers: {
      'delete'(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
    },
    effects:{
      *queryList({ payload }, { call, put }) {  // eslint-disable-line
        console.log('hello world')
        yield call(queryRepairList);
      },
    }
};