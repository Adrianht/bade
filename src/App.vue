<template>
  <div class="main-container">
    <h3>Husk solkrem</h3>
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
    width: 80%;
    display: flex;
    flex-direction: column;
    color: $color-text;
    h3{
        margin-top: 1em;
        text-align: center;
    }
}

</style>