<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Timer</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col sm="12" md="6" lg="8" xl="10">
        <b-card>
          <b-card-title>Instance</b-card-title>
          <b-card-text>Start: {{ model.start }}</b-card-text>
          <b-card-text>Stop: {{ model.stop }}</b-card-text>
          <b-input
            type="text"
            v-model="model.body"
            placeholder="Short Description"
            @blur="updateBody"
          ></b-input>
        </b-card>
      </b-col>
      <b-col>
        <b-card>
          <b-card-title>Time</b-card-title>
          <h1>{{ time }}</h1>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button-group size="lg">
          <b-button
            type="button"
            @click="startChunk"
            v-if="showStart"
            variant="success"
            >Start</b-button
          >
          <b-button type="button" @click="nextChunk" v-else variant="warning"
            >Next</b-button
          >
          <b-button
            type="button"
            @click="stopChunk"
            :disabled="!model.open"
            variant="danger"
            >Stop</b-button
          >
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { chunkAPI } from "@/api";
import * as moment from "moment";
let timer = Object.assign({
  start: null,
  open: false,
  stop: null,
  cust: null,
  body: ""
});
export default {
  data() {
    return {
      loading: false,
      model: timer,
      time: 0,
      interval: null,
      showStart: true
    };
  },
  async created() {
    this.refreshForm();
  },
  methods: {
    refreshForm() {
      this.loading = true;
      this.model = timer;
      this.loading = false;
    },
    updateTime() {
      this.time = moment(this.model.start).fromNow("mm");
    },
    updateBody() {
      this.model.body = this.model.body;
    },
    async startChunk(evt) {
      this.refreshForm();
      evt.preventDefault();
      this.model.start = new Date();
      this.model.open = true;
      this.model = await chunkAPI.createChunk(this.model);
      this.showStart = this.model.start ? false : true;
      this.interval = setInterval(() => {
        this.updateTime();
        console.log("StartedTime");
      }, 1000);
    },
    async nextChunk(evt) {
      if (this.model.open) {
        await this.stopChunk(evt);
      }
      this.refreshForm();
      await this.startChunk(evt);
    },

    async stopChunk(evt) {
      evt.preventDefault();
      clearInterval(this.interval);
      this.model.stop = new Date();
      this.model.open = false;
      this.model = await chunkAPI.updateChunk(this.model.id, this.model);

      // this.model = timer;
    }
  }
};
</script>
