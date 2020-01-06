<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Home</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Timer</b-nav-item>
          <b-nav-item to="/chunks">Chunks</b-nav-item>
          <b-nav-item to="/customers">Customers</b-nav-item>
          <b-nav-item to="/contacts">Contacts</b-nav-item>
          <b-nav-item to="/help">Help</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
