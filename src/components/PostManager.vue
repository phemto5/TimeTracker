<template>
  <div class="container-fluid mt-4">
    <h1 class="h1"> Time Manger</h1>
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
              <td class="text-right">
                <a href="#" @click.prevent="populateChunkToEdit(chunk)">Edit</a>
                <a href="#" @click.prevent="deleteChunk(chunk.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ?'Edit Post ID#' + model.id:'New Post')">
          <form @submit.prevent="saveChunk">
            <b-form-group label="Customer">
              <b-form-input type="text" v-model="model.customer"></b-form-input>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-textarea rows="4" v-model="model.body"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Tags">
              <b-form-input type="text" v-model="model.tag"></b-form-input>
            </b-form-group>
            <div>
              <b-button type="submit" variant="sucess">Save Chunk of Time</b-button>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
const NewChunk = {
  start: new Date()
}
export default {
  data () {
    return { loading: false, chunks: [], model: NewChunk }
  },
  async created () {
    this.refreshChunks()
  },
  methods: {
    async refreshChunks () {
      this.loading = true
      this.chunks = await api.getChunks()
      this.loading = false
    },
    async populateChunkToEdit (chunk) {
      this.model = Object.assign({}, chunk)
    },
    async saveChunk () {
      this.model.stop = new Date()
      if (this.model.id) {
        await api.updateChunk(this.model.id, this.model)
      } else {
        await api.createChunk(this.model)
      }
      this.model = NewChunk
      await this.refreshChunks()
    },
    async deleteChunk (id) {
      if (confirm('Are you sure you want to delete it ???')) {
        if (this.model.id === id) {
          this.model = NewChunk
        }
        await api.deleteChunk(id)
        await this.refreshChunks()
      }
    }
  }
}
</script>
