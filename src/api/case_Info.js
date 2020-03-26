
import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/caseInfo/page',
    method: 'get',
    params: query
  })
}

export function pageByBatch(query) {
  return request({
    url: '/admin/caseInfo/pageByBatch',
    method: 'get',
    params: query
  })
}

export function telList(query) {
  return request({
    url: '/admin/telRecord/page',
    method: 'get',
    params: query
  })
}
export function contactsList(query) {
  return request({
    url: '/admin/admin/caseContacts/page',
    method: 'get',
    params: query
  })
}

export function backmoneyList(cid) {
  return request({
    url:'/admin/backMoney/getBackMoneyById',
    method:'get',
    params:cid
  })
}

export function getCaseObj(id) {
  return request({
    url: '/admin/caseInfo/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/dict/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dict/' + id,
    method: 'get'
  })
}

export function delObj(row) {
  return request({
    url: '/admin/dict/' + row.id + '/' + row.type,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/dict/',
    method: 'put',
    data: obj
  })
}

export function distributionObj(obj) {
  return request({
    url: '/admin/caseInfo/distributionCase',
    method: 'post',
    data: obj
  })
}

export function pageRoles(query) {
  return request({
    url: '/admin/dept/tree',
    method: 'get',
    data: query
  })
}
export function pageContactsUpdate(query){
  return request({
    url: '/admin/admin/caseContacts/update',
    method: 'post',
    data:query
  })
}
export function sortByMoney(query){
  return request({
    url: '/admin/caseInfo/page',
    method: 'get',
    params:query
  })
}
export function sortByTimes(query){
  return request({
    url: '/admin/telRecord/page',
    method: 'get',
    params:query
  })
}
export function exportTemplate() {
  return request({
    url:'/admin/caseInfo/excel',
    method:'get'
  })
}


