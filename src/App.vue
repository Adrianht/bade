<template>
  <div class="main-container">
    <h1>Weather</h1>
    <area-search></area-search>
    <featured-cards></featured-cards>
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
@import "./style/base.scss";

.main-container{
    margin: auto;
    width: 70%;
    display: flex;
    flex-direction: column;
    color: $color-text;
    h1{
        text-align: center;
    }
}

</style>