<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Home</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-if="loggedin" to="/account">Account</b-nav-item>
          <b-nav-item v-if="loggedin" to="/timer">Timer</b-nav-item>
          <b-nav-item v-if="loggedin" to="/chunks">Chunks</b-nav-item>
          <b-nav-item v-if="loggedin" to="/customers">Customers</b-nav-item>
          <b-nav-item v-if="loggedin" to="/contacts">Contacts</b-nav-item>
          <b-nav-item v-else to="/">Login</b-nav-item>
          <b-nav-item to="/help">Help</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>
<script>


export default {
  data() {
    return { name: 'TimeTracker', loggedin: false }
  },
  async created() {
    this.refreshPage()
  },
  methods: {
    getLoginToken() {
      this.loggedin = localStorage.getItem('loggedin') //get has token from cookies. and it valid from cookies.
    },
    refreshPage() {
      this.getLoginToken()
      //get account token from Cokies
    }
  }
}
</script>
