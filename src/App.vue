<template>
  <div class="main-container">
    <h1>Weather</h1>
    <FeaturedCards />
    <AreaSearch />
  </div>
</template>

<script>
import AreaSearch from "./components/AreaSearch.vue";
import FeaturedCards from "./FeaturedCards.vue"

export default {
  name: 'App',
  components: {
      AreaSearch,
      FeaturedCards
  },
};
</script>

<style lang="scss">
body
{
  background-color:#f2f2f2;
  font-family: 'RobotoDraft', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
}
*
{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.main-container{
    margin: auto;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1{
        text-align: center;
    }
}

</style>