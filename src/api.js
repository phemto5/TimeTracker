import axios from 'axios'
import * as md5 from 'md5'

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
export const loginAPI = {
  execute: exebase,
  hashPassword(password) {
    let md5p = md5(password)
    return md5p
  },
  login(username, password) {
    let md5p = this.hashPassword(password)
    let data = { uname: username, pass: md5p }
    return this.execute('post', '/login', data)
  }
}
export const passwordAPI = {
  execute: exebase,
  getPassword() {
    return this.execute('get', '/password')
  },
  getPassword(id) {
    return this.execute('get', `/password/${id}`)
  },
  getPerAccount(unameid) {
    return this.execute('get', `/password?unameid=${unameid}`)
  },
  createPassword(data) {
    return this.execute('post', '/password', data)
  },
  updatePassword(id, data) {
    return this.execute('put', `/password/${id}`, data)
  },
  deletePassword(id) {
    return this.execute('delete', `/password/${id}`)
  }
}
export const accountAPI = {
  execute: exebase,
  getAccount() {
    return this.execute('get', '/account')
  },
  getAccount(id) {
    return this.execute('get', `/account/${id}`)
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
  getPerAccount(account) {
    return this.execute('get', `/chunks?refID=${account}`)
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
  getPerAccount(accountid) {
    return this.execute('get', `/customers/?refID=${accountid}`)
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
  getPerAccount(accountid) {
    return this.execute('get', `/contacts/?refID=${accountid}`)
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
export const addressAPI = {
  execute: exebase,
  getAddresses() {
    return this.execute('get', '/addresses')
  },
  getPerAccount(accountid) {
    return this.execute('get', `/addresses/?refID=${accountid}`)
  },
  getAddress(id) {
    return this.execute('get', `/addresses/${id}`)
  },
  createAddress(data) {
    return this.execute('post', `/addresses`, data)
  },
  updateAddress(id, data) {
    return this.execute('put', `/addresses/${id}`, data)
  },
  deleteAddress(id) {
    return this.execute('delete', `/addresses/${id}`)
  }
}
export const emailAPI = {
  execute: exebase,
  getEmails() {
    return this.execute('get', '/emails')
  },
  getPerAccount(accountid) {
    return this.execute('get', `/emails/?refID=${accountid}`)
  },
  getEmail(id) {
    return this.execute('get', `/emails/${id}`)
  },
  createEmail(dara) {
    return this.execute('get', `/emails`, data)
  },
  updateEmail(id, data) {
    return this.execute('get', `/emails/${id}`, data)
  },
  deleteEmail(id) {
    return this.execute('get', `/emails/${id}`)
  }
}
export const matterAPI = {
  execute: exebase,
  getMatters() {
    return this.execute('get', '/matters')
  },
  getPerAccount(accountid) {
    return this.execute('get', `/matters/?refID=${accountid}`)
  },
  getMatter(id) {
    return this.execute('get', `/matters/${id}`)
  },
  createMatter(data) {
    return this.execute('post', `/matters`, data)
  },
  updateMatter(id, data) {
    return this.execute('put', `/matters/${id}`, data)
  },
  deleteMatter(id) {
    return this.execute('delete', `/matters/${id}`)
  }
}

export const endtypeAPI = {
  execute: exebase,
  getEndTypes() {
    return this.execute('get', '/endtypes')
  },
  getPerAccount(accountid) {
    return this.execute('get', `/endtypes/?refID=${accountid}`)
  },
  getEndType(id) {
    return this.execute('get', `/endtypes/${id}`)
  },
  createEndType(data) {
    return this.execute('post', `/endtypes`, data)
  },
  updateEndType(id, data) {
    return this.execute('put', `/endtypes/${id}`, data)
  },
  deleteEndType(id) {
    return this.execute('delete', `/endtypes/${id}`)
  }
}
