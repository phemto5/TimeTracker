
<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Account</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col sm="12" md="6" lg="8" xl="10">
        <b-card>
          <b-card-title>Profile</b-card-title>
          <b-card-text></b-card-text>
          <b-input
            type="text"
            v-model="model.username"
            placeholder="User Name"
            @blur="updateBody"
          ></b-input>
          <b-input
            type="password"
            v-model="model.password"
            placeholder="Password"
            @blur="updateBody"
          ></b-input>
        </b-card>
      </b-col>
      <b-row>
        <b-card>
          <b-card-title>Profile</b-card-title>
          <b-card-text></b-card-text>
          <b-input
            type="email"
            v-model="model.email"
            placeholder="Email"
            @blur="updateBody"
          ></b-input>
        </b-card>
      </b-row>
    </b-row>
  </div>
</template>

<script>
import { accountAPI } from "@/api";
let account = {
    username:"",
    password:"",
    email:""
}
export default {
  data() {
    return {
      loading: false,
      model: Object.assign({}, account),
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
    clearForm(){
        
    }
    // updateTime() {
    //   this.time = moment(this.model.start).fromNow("mm");
    // },
    // updateBody() {
    //   this.model.body = this.model.body;
    },
    // async startChunk(evt) {
    //   this.refreshForm();
    //   evt.preventDefault();
    //   this.model.start = new Date();
    //   this.model.open = true;
    //   this.model = await chunkAPI.createChunk(this.model);
    //   this.showStart = this.model.start ? false : true;
    //   this.interval = setInterval(() => {
    //     this.updateTime();
    //     console.log("StartedTime");
    //   }, 1000);
    // },
    // async nextChunk(evt) {
    //   if (this.model.open) {
    //     await this.stopChunk(evt);
    //   }
    //   this.refreshForm();
    //   await this.startChunk(evt);
    // },

    // async stopChunk(evt) {
    //   evt.preventDefault();
    //   clearInterval(this.interval);
    //   this.model.stop = new Date();
    //   this.model.open = false;
    //   this.model = await chunkAPI.updateChunk(this.model.id, this.model);

      // this.model = timer;
    // }
  }
};
</script>
