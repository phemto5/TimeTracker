// import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})
export default {
  async execute (method, resource, data) {
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
  },
  getChunks () {
    return this.execute('get', '/chunks')
  },
  getChunk (id) {
    return this.execute('get', `/chunks/${id}`)
  },
  createChunk (data) {
    return this.execute('post', '/chunks', data)
  },
  updateChunk (id, data) {
    return this.execute('put', `/chunks/${id}`, data)
  },
  deleteChunk (id) {
    return this.execute('delete', `/chunks/${id}`)
  }
}
