<template>
  <div id="app">
    <!-- <Login></Login> -->
     <router-view></router-view>
  </div>
</template>

<script>
// import Login from '@/views/Login'
// import Home from '@/views/Home'
export default {
  name: 'App',
  // components: {
  //   Login,
  //   Home,
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body {
  margin:0 !important;
}
</style>
