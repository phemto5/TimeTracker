// import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL:
    'http://' + window.location.hostname + ':8081/' || 'http://localhost:8081/',
  json: true
})
const exebase = async (method, resource, data) => {
  return client({
    method,
    url: resource,
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(req => {
    return req.data
  })
}
export const accountAPI = {
  execute: exebase,
  getAccount() {
    return this.execute('get', '/account')
  },
  getAccount(id) {
    return this.execute('get', `/account/${id}`)
  },
  getAccountByUserName(name) {
    return this.execute('get', `/account/user/${name}`)
  },
  getLoginToken(name, passhash) {
    return this.execute('get', `/account/token/${name}/${passhash}`)
  },
  createAccount(data) {
    return this.execute('post', '/account', data)
  },
  updateAccount(id, data) {
    return this.execute('put', `/account/${id}`, data)
  },
  deleteAccount(id) {
    return this.execute('delete', `/account/${id}`)
  }
}
export const chunkAPI = {
  execute: exebase,
  getChunks() {
    return this.execute('get', '/chunks')
  },
  getChunk(id) {
    return this.execute('get', `/chunks/${id}`)
  },
  createChunk(data) {
    return this.execute('post', '/chunks', data)
  },
  updateChunk(id, data) {
    return this.execute('put', `/chunks/${id}`, data)
  },
  deleteChunk(id) {
    return this.execute('delete', `/chunks/${id}`)
  }
}

export const customerAPI = {
  execute: exebase,
  getCustomers() {
    return this.execute('get', '/customers')
  },
  getCustomer(id) {
    return this.execute('get', `/customers/${id}`)
  },
  createCustomer(data) {
    return this.execute('post', '/customers', data)
  },
  updateCustomer(id, data) {
    return this.execute('put', `/customers/${id}`, data)
  },
  deleteCustomer(id) {
    return this.execute('delete', `/customers/${id}`)
  }
}
export const contactAPI = {
  execute: exebase,
  getContacts() {
    return this.execute('get', '/contacts')
  },
  getContact(id) {
    return this.execute('get', `/contacts/${id}`)
  },
  createContact(data) {
    return this.execute('post', '/contacts', data)
  },
  updateContact(id, data) {
    return this.execute('put', `/contacts/${id}`, data)
  },
  deleteContact(id) {
    return this.execute('delete', `/contacts/${id}`)
  }
}
