<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead">{{`${entity} Mangement`}}</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Start</th>
              <th>Stop</th>
              <th>Customer</th>
              <th>Desctiption</th>
              <th>Tags</th>
              <th>Owner</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="chunk in chunks" :key="chunk.id">
              <td>{{ chunk.id }}</td>
              <td>{{ chunk.start }}</td>
              <td>{{ chunk.stop }}</td>
              <td>{{ chunk.customer }}</td>
              <td>{{ chunk.body }}</td>
              <td>{{ chunk.tag }}</td>
              <td>{{ chunk.owner }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateChunkToEdit(chunk)">Edit</a>
                <a href="#" @click.prevent="deleteChunk(chunk.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="chunk.id ? `Edit ${entity} ID#` + model.id : `New ${entity}`">
          <form @submit.prevent="saveChunk">
            <b-form-group label="Customer">
              <b-form-select
                v-model="chunk.customer"
                :options="customers"
              ></b-form-select>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-textarea rows="4" v-model="chunk.body"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Tags">
              <b-form-input type="text" v-model="chunk.tag"></b-form-input>
            </b-form-group>
            <div>
              <b-button type="submit" variant="success">Save</b-button>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { chunkAPI, customerAPI } from '@/api'
import router from '../router'

const NewChunk = {
  start: new Date(),
  open: true
}

export default {
  data() {
    return {
      entity:`Chunk`,
      loading: false,
      chunks: [],
      customers: [],
      chunk: NewChunk,
      account: {}
    }
  },
  async created() {
    this.refreshChunks()
  },
  methods: {
    async refreshChunks() {
      let localAccount = JSON.parse(localStorage.getItem('account'))
      if (!localAccount) {
        router.push({ name: 'Login' })
      } else {
        this.account = localAccount
      }
      this.loading = true
      let custs = await customerAPI.getCustomers()
      this.customers = custs.map(cust => {
        return { value: cust.id, text: cust.name }
      })
      // let chks = await chunkAPI.getChunks()
      let chks = await chunkAPI.getChunksByAccount(this.account.id)
      this.chunks = chks.map(chunk => {
        let c = custs.filter(cust => cust.id === chunk.customer)
        if (c.length != 0) {
          chunk.customer = c[0].name
        }
        return chunk
      })
      this.loading = false
    },
    async populateChunkToEdit(chunk) {
      let selected = this.customers.filter(cust => cust.text === chunk.customer)
      this.chunk = Object.assign({}, chunk)
      if (selected.length != 0) {
        this.chunk = Object.assign(this.chunk, { customer: selected[0].value })
      }
    },
    async saveChunk() {
      this.chunk.open = false
      this.chunk.stop = new Date()
      if (this.chunk.id) {
        await chunkAPI.updateChunk(this.chunk.id, this.chunk)
      } else {
        await chunkAPI.createChunk(this.chunk)
      }
      this.chunk = NewChunk
      await this.refreshChunks()
    },
    async deleteChunk(id) {
      if (confirm('Are you sure you want to delete it ???')) {
        if (this.chunk.id === id) {
          this.chunk = NewChunk
        }
        await chunkAPI.deleteChunk(id)
        await this.refreshChunks()
      }
    }
  }
}
</script>
