<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead bg-dark">
      {{ ` ${entity} :: ${context.account.id}-${context.account.uname}` }}
    </h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col sm="12" md="6" lg="8" xl="10">
        <b-card>
          <b-card-title>Instance</b-card-title>
          <b-card-text>Start: {{ timer.start }}</b-card-text>
          <b-card-text>Stop: {{ timer.stop }}</b-card-text>
          <b-input
            type="text"
            v-model="timer.body"
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
            :disabled="!timer.open"
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
import router from "../router";
import * as moment from "moment";
import Context from "../context";
import Chunk from "../Chunk";
import { CheckLoggedIn } from "../auth";
// const cleanChunk = new Chunk();
export default {
  data() {
    return {
      entity: `Timer`,
      loading: false,
      timer: new Chunk(),
      time: 0,
      interval: null,
      showStart: true,
      context: new Context()
    };
  },
  async created() {
    await this.refreshForm();
  },
  methods: {
    isLoggedIn() {
      CheckLoggedIn(
        () => {},
        () => {
          router.push({ name: "Login" });
        }
      );
    },
    async refreshForm() {
      this.loading = true;
      this.isLoggedIn();
      try {
        this.context = await this.context.load(); // = Object.assign(this.context, ctx);
        // console.log(this.context.account)
        this.timer.setRefID(this.context.account.id); //Object.assign(cleanChunk);
      } catch (e) {
        console.log("not able to load Timer");
      }
      this.loading = false;
    },
    updateTime() {
      this.time = moment(this.timer.start).fromNow("mm");
    },
    updateBody() {
      this.timer.body = this.timer.body;
    },
    async startChunk(evt) {
      // this.refreshForm();
      evt.preventDefault();
      this.timer = new Chunk();
      this.timer.start = new Date();
      this.timer.open = true;
      this.timer.refID = this.context.account.id;
      this.timer = await chunkAPI.createChunk(this.timer);
      this.showStart = this.timer.start ? false : true;
      this.interval = setInterval(() => {
        this.updateTime();
        // console.log("StartedTime");
      }, 1000);
    },
    async nextChunk(evt) {
      if (this.timer.open) {
        await this.stopChunk(evt);
      }
      this.refreshForm();
      await this.startChunk(evt);
    },

    async stopChunk(evt) {
      evt.preventDefault();
      clearInterval(this.interval);
      this.timer.stop = new Date();
      this.timer.open = false;
      this.timer = await chunkAPI.updateChunk(this.timer.id, this.timer);
    }
  }
};
</script>
