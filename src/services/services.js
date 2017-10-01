import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
import axios from 'axios';
import qs from 'qs';

export function fetch({ page }) {
  // return request(`/newlineage/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return axios.get(`/newlineage/api/showAnnouncement`, {
    params: { type: 1 }
  })
}
export function getGamerInfo({ page }) {
  // return request(`/newlineage/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return axios.get(`/newlineage/api/getonline`, {

  })
}
export function getGamerInfo2({ page }) {
  // return request(`/newlineage/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return axios.post(`/newlineage/api/getonline`, {

  })
}
export function changeNotice(key) {
  // return request(`/newlineage/api/users?_page=${page}&_limit=${PAGE_SIZE}`); 
  return axios.post(`/newlineage/api/showAnnouncement`, qs.stringify({
    current: 1,
    pageSize: 10,
    type: key
  }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
}
export function sumit(values) {
  // return request(`/newlineage/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return axios.post(`/newlineage/api/registration`,
    qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  )
}
export function getUpdate(values) {
  // return request(`/newlineage/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return axios.post(`/newlineage/api/showAnnouncement`,
    qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  )
}
export function remove(id) {
  return request(`/newlineage/api/users/${id}`, {
    method: 'DELETE',
  });
}
export function patch(id, values) {
  return request(`/newlineage/api/showAnnouncement${id}`, {
    method: 'GET',
    body: JSON.stringify(values),
  });
}