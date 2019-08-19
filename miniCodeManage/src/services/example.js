import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function queryRepairList(){
  return request('/api/repairList');
}
