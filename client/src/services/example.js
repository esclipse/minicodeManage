import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function queryRepairList(){
  return request('http://localhost/getRepaireLog');
}

export function putRepairList(params){
  return request('http://localhost/putRepaireLog',{
    method: 'put',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}
