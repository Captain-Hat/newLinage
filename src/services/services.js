import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
import axios from 'axios';
import qs from 'qs';

export function fetch({ page }) {
  // return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return axios.get(`/api/showAnnouncement`, {
    id: 2
  })
}
export function sumit(values) {
  // return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return axios.post(`/api/registration`,
    qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  )
}
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
export function patch(id, values) {
  return request(`/newlineage/api/showAnnouncement${id}`, {
    method: 'GET',
    body: JSON.stringify(values),
  });
}