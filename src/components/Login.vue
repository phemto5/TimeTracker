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
import { accountAPI, loginAPI } from '@/api'
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
      this.clearForm()
      this.loading = false
    },
    clearForm() {},
    async login() {
      let token = { msg: '', account: null, token: null, expires: null }
      token = await loginAPI.login(this.model.uname, this.model.password)
      if (token.account) {
        localStorage.setItem('loggedin', true)
        localStorage.setItem('token', token.token)
        localStorage.setItem('expires', token.expires)
        localStorage.setItem('account', token.account)
      }
    }
  }
}
</script>
