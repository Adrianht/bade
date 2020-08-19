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
                    locationName: 'Kadetttangen',
                    municipality: 'Bærum',
                    easting: 250054.31,
                    northing: 6647323.83
                },
                {
                    id: 1,
                    locationName: 'Sørenga',
                    municipality: 'Oslo',
                    easting: 262867.84,
                    northing: 6648225.23
                },
                {
                    id: 2,
                    locationName: 'Ingierstrand',
                    municipality: 'Nordre Follo',
                    easting: 261661.47,
                    northing: 6638826.08
                },
                {
                    id: 3,
                    locationName: 'Tangen',
                    municipality: 'Fredrikstad',
                    easting: 267552.52,
                    northing: 6562420.16
                },
                {
                    id: 4,
                    locationName: 'Vauer',
                    municipality: 'Hvaler',
                    easting: 262757.98,
                    northing: 6559123.76
                },
                {
                    id: 5,
                    locationName: 'Røa',
                    municipality: 'Hvaler',
                    easting: 263040.95,
                    northing: 6557841.16
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