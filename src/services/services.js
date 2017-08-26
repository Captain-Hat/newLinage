import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
import axios from 'axios';


export function fetch({ page }) {
  // return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return axios.get(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`, {
  })
}
export function sumit(values) {
  // return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return axios.post(`/api/sumit`,
    values, {}
  )
}
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}