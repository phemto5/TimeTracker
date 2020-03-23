<template>
  <div class="container-fluid mt-4">
    <h1 class="bg-dark">{{ `${entity}` }}</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <h2>Time Traking Starts Here</h2>
        <p>
          <em>
            This is a small app to track time in chunks quickly with some tools
            to keep it organized as you are moving though a day.</em
          >
        </p>
        <b-card>
          <b-card-text>
            <p class="lead">
              To tack time just save the current one empty and then a new time
              chunk will start the old ones are stored so that you can go back
              and fill them out when you need to.
            </p>
            <p>
              Time starts when you load the Chunks page and if you leave the
              page you will loose the current chunk it is meant to be left up
              all the time and minimized when you are doing other tasks.
            </p>
            <p>
              Let me know if you would like to see other improvements to the app
              it is mostly accidemic for me and it might be fun to takel some
              more difficult features.
            </p>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style>
.hero {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero .lead {
  font-weight: 200;
  font-size: 1.5rem;
}
</style>

<script>
export default {
  data() {
    return { entity: `Help` };
  }
};
</script>
