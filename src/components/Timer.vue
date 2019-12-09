<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Contact Manger</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <b-card>
          <form @submit.prevent="saveTime">
            <b-button variant="success">Start</b-button>
            <b-button variant="success">Stop</b-button>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { chunkAPI, customerAPI } from "@/api";
let timer = Object.assign({ start: null, stop: null, cust: null, desc: "" });
export default {
  data() {
    return { loading: false, chunks: [], customers: [], model: timer };
  },
  async created() {},
  methods: {
    async startChunk() {},
    async stopChunk() {}
  }
};
</script>