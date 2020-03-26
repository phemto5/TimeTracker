<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead bg-dark">
      {{
        ` Mangement : ${entity} :: ${context.account.id}-${context.account.uname}`
      }}
    </h1>
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
              <th>refID</th>
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
              <td>{{ chunk.refID }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateChunkToEdit(chunk)">Edit</a>
                <a href="#" @click.prevent="deleteChunk(chunk.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card
          :title="chunk.id ? `Edit ${entity} ID#` + model.id : `New ${entity}`"
        >
          <form @submit.prevent="saveChunk">
            <b-form-group label="Customer">
              <!-- <b-form-select
                v-model="chunk.customer"
                :options="customers"
              ></b-form-select> -->
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
import { chunkAPI, customerAPI } from "@/api";
import router from "../router";
import Chunk from "../Chunk";
import Context from "../context";
import { CheckLoggedIn } from "../auth";

export default {
  data() {
    return {
      entity: `Chunk`,
      loading: false,
      chunks: [],
      customers: [],
      chunk: new Chunk(),
      context: new Context()
    };
  },
  async created() {
    console.log('Created!')
    await this.refreshForm();
    // await this.isLoggedIn();
  },
  methods: {
    isLoggedIn() {
      CheckLoggedIn(
        async () => {
          await this.refreshForm()
        },
        () => {
          router.push({ name: "Login" });
        }
      );
    },
    async refreshForm() {
      this.loading = true;
      // this.isLoggedIn();
      try {
        this.context = await this.context.load();
        console.log('Account loaded')
        this.chunks = await chunkAPI.getPerAccount(this.context.account.id);
        this.chunk = this.chunk.setRefID(this.context.account.id);
        // this.customers = await customerAPI.getPerAccount(
        //   this.context.account.id
        // );
      } catch (e) {
        console.log(`failed to get Chunks from online`, e);
      }
      this.loading = false;
    },
    async populateChunkToEdit(chunk) {
      this.chunk = chunk;
    },
    async saveChunk() {
      this.chunk.open = false;
      this.chunk.stop = new Date();
      if (this.chunk.id) {
        this.chunk = await chunkAPI.updateChunk(this.chunk.id, this.chunk);
      } else {
        this.chunk = await chunkAPI.createChunk(this.chunk);
      }
      this.chunk = new Chunk();
      await this.refreshForm();
    },
    async deleteChunk(id) {
      if (confirm("Are you sure you want to delete it ???")) {
        if (this.chunk.id === id) {
          this.chunk = NewChunk;
        }
        await chunkAPI.deleteChunk(id);
        await this.refreshChunks();
      }
    }
  }
};
</script>
