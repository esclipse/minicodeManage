import { queryRepairList, putRepairList } from '../services/example'
export default {
    namespace: 'products',
    state: {
      reqaireList: []
    },
    reducers: {
      'delete'(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
      'putList'(state,{payload:{ reqaireList }}) {
        
        return state.reqaireList = reqaireList
      }
    },
    effects:{
      *queryList({ payload }, { call, put }) {  // eslint-disable-line
        const {data:{reqaireList}} =  yield call(queryRepairList);
        yield put({
          type: "putList",
          payload: {
            reqaireList
          }
        })
      },
      *putList({ payload },{ call, put}){
        const params = {
          school: "JUST A TEST"
        }
        const response = yield call(putRepairList,params);
        console.log(response,'response')
      }
    }
};