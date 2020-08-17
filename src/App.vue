<template>
  <div class="container">
    <AreaSearch />
  </div>
</template>

<script>
import AreaSearch from "./components/AreaSearch.vue";

export default {
  name: 'App',
  components: {
      AreaSearch
  },
  data() {
    return {
      message: 'Using Parcel In A Vue.js App',
    };
  },
};
</script>

<style scoped>
  .container {
    width: 600px;
    margin: 50px auto;
    text-align: center;
  }
</style>