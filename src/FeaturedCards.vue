<template>
  <div class="container">
      <div v-for="card in cards" :key="card.id" class="container-div">
        <LocationCard :easting=card.easting :northing=card.northing :locationName=card.locationName :municipality=card.municipality />  
      </div>
  </div>
</template>

<script>
import LocationCard from './components/LocationCard.vue'
export default {
    components: {
        LocationCard
    },
    data(){
        return {
            cards: [
                {   
                    id: 0,
                    locationName: 'Fredrikstad',
                    municipality: 'Fredrikstad',
                    easting: 5847613.245,
                    northing: 1671917.799
                },
                {
                    id: 1,
                    locationName: 'Sørenga',
                    municipality: 'Oslo',
                    easting: 5954350.972,
                    northing: 1664184.122
                },
                {
                    id: 2,
                    locationName: 'Test2',
                    municipality: 'Oslo',
                    easting: 5954350.972,
                    northing: 1664184.122
                },
                {
                    id: 3,
                    locationName: 'test3',
                    municipality: 'Oslo',
                    easting: 5954350.972,
                    northing: 1664184.122
                },
                {
                    id: 4,
                    locationName: 'test4',
                    municipality: 'Oslo',
                    easting: 5954350.972,
                    northing: 1664184.122
                },
                {
                    id: 5,
                    locationName: 'test5',
                    municipality: 'Oslo',
                    easting: 5954350.972,
                    northing: 1664184.122
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    display: flex;
    width: 60%;
    flex-wrap: wrap;
    margin: auto;
    &-div{
        flex-grow: 3;
    }
}

</style>