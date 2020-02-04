<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Login</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col sm="12" md="6" lg="8" xl="10">
        <b-form @submit="login" @reset="clearForm">
          <b-form-group id="login" label="LoginName" label-for="login">
            <b-form-input
              id="login"
              v-model="model.uname"
              type="text"
              required
              placeholder="UserName"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="pass" label="Password" label-for="pass">
            <b-form-input
              id="pass"
              v-model="model.password"
              type="password"
              required
              placeholder="Password"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Login</b-button>
          <b-button type="reset" variant="danger">Clear</b-button>
        </b-form>
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
    refreshForm() {
      this.loading = true
      this.clearForm();
      this.loading = false
    },
    clearForm() {},
    login(){
      let hashPass = this.model.password+'7766s';
      // let tokenObj ={token:'',expires:new Date()};
      // let tokenObj = await accountAPI.getLoginToken(this.model.uname,hashPass);
      localStorage.setItem('loggedin',true);
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
