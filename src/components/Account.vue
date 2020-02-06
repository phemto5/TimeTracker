<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Account</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col sm="12">
        <b-card>
          <b-card-title>Account</b-card-title>
          <b-input
            type="text"
            v-model="account.uname"
            placeholder="UserName"
            v-if="!account.id"
          ></b-input>
          <b-card-text
            v-else
            type="text"
            v-model="account.uname"
            placeholder="User Name"
          ></b-card-text>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="4">
        <b-card>
          <b-card-title>Name</b-card-title>
          <b-card-text>First</b-card-text>
          <b-input
            type="text"
            v-model="account.fname"
            placeholder="First"
          ></b-input>
          <b-card-text>Middle</b-card-text>
          <b-input
            type="text"
            v-model="account.mname"
            placeholder="Middle"
          ></b-input>
          <b-card-text>Last</b-card-text>
          <b-input
            type="text"
            v-model="account.lname"
            placeholder="Last"
          ></b-input>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="4">
        <b-card>
          <b-card-title>Profile</b-card-title>
          <b-card-text>Email</b-card-text>
          <b-input
            type="email"
            v-model="account.email"
            placeholder="Email"
          ></b-input>
          <b-card-text>Address</b-card-text>
          <b-input
            type="text"
            v-model="account.address"
            placeholder="Mailing Address"
          ></b-input>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-button type="button" @click="createAccount" variant="success">
          Save
        </b-button>
        <b-button type="button" @click="refreshForm" variant="warning">
          Refresh
        </b-button>
        <b-button type="button" @click="clearForm" variant="danger">
          Clear
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { accountAPI } from '@/api'
let cleanAccount = {
  uname: '',
  fname: '',
  lname: '',
  mname: '',
  address: '',
  email: ''
}
export default {
  data() {
    return {
      loading: false,
      account: Object.assign({}, cleanAccount)
    }
  },
  async created() {
    this.refreshForm()
  },
  methods: {
    async refreshForm() {
      this.loading = true
      const localAccount = localStorage.getItem('Account')
      if (localAccount) {
        this.account = localAccount
        if (localAccount.id) {
          try {
            this.account = await accountAPI.getAccount(this.account.id)
            localStorage.setItem('Account', this.account)
          } catch (e) {
            console.log(`failed to get Account from on line`, e)
          }
        }
      }
      this.loading = false
    },
    clearForm() {
      this.loading = true
      this.account = Object.assign({}, cleanAccount)
      this.loading = false
    },
    async createAccount() {
      this.account = await accountAPI.createAccount(this.account)
    }
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
