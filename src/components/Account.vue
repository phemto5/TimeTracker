<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Account</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col sm="12">
        <b-card>
          <b-card-title>Account</b-card-title>
          <b-card-text
            type="text"
            v-model="model.uname"
            placeholder="User Name"
            @blur="updateBody"
          ></b-card-text>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="4">
        <b-card>
          <b-card-title>Name</b-card-title>
          <b-card-text>First</b-card-text>
          <b-input
            type="text"
            v-model="model.fname"
            placeholder="First"
            @blur="updateBody"
          ></b-input>
          <b-card-text>Middle</b-card-text>
          <b-input
            type="text"
            v-model="model.mname"
            placeholder="Middle"
            @blur="updateBody"
          ></b-input>
          <b-card-text>Last</b-card-text>
          <b-input
            type="text"
            v-model="model.lname"
            placeholder="Last"
            @blur="updateBody"
          ></b-input>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="4">
        <b-card>
          <b-card-title>Profile</b-card-title>
          <b-card-text>Email</b-card-text>
          <b-input
            type="email"
            v-model="model.email"
            placeholder="Email"
            @blur="updateBody"
          ></b-input>
          <b-card-text>Address</b-card-text>
          <b-input
            type="text"
            v-model="model.address"
            placeholder="Mailing Address"
            @blur="updateBody"
          ></b-input>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { accountAPI } from '@/api'
let account = {
  uname: '',
  fname: '',
  lname: '',
  mname: '',
  address: '',
  email: '',
  password: ''
}
export default {
  data() {
    return {
      loading: false,
      model: Object.assign({}, account)
    }
  },
  async created() {
    this.refreshForm()
  },
  methods: {
    async refreshForm() {
      this.loading = true
      this.model = localStorage.getItem('Account')
      localStorage.setItem(
        'Account',
        await accountAPI.getAccount(this.model.id)
      )
      this.model = localStorage.getItem('Account')
      this.loading = false
    },
    clearForm() {
      this.loading = true
      this.model = Object.assign({}, account)
      this.loading = false
    },
    updateBody() {}
    // updateTime() {
    //   this.time = moment(this.model.start).fromNow("mm");
    // },
    // updateBody() {
    //   this.model.body = this.model.body;
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
}
</script>
