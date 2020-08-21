<template>
  <div class="container">
      <div v-for="card in cards" :key="card.id" class="container-div">
        <LocationCard 
            :easting="card.easting" 
            :northing="card.northing" 
            :locationName="card.locationName" 
            :municipality="card.municipality"
            :waterLat="card.waterLat"
            :waterLng="card.waterLng"
        />  
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
                    id: 3,
                    locationName: 'Glufsa',
                    municipality: 'Fredrikstad',
                    easting: 264733.24,
                    northing: 6566992.51,
                    waterLat: 59.177201731280405,
                    waterLng: 10.881546572933985
                },
                {
                    id: 4,
                    locationName: 'Papperhavn',
                    municipality: 'Hvaler',
                    easting: 262035.91,
                    northing: 6559174.47,
                    waterLat: 59.1045335685333,
                    waterLng: 10.840397713056092
                },
                {
                    id: 1,
                    locationName: 'Sørenga',
                    municipality: 'Oslo',
                    easting: 262867.84,
                    northing: 6648225.23,
                    waterLat: 59.9007532006228,
                    waterLng: 10.746646137452672
                },
                {
                    id: 5,
                    locationName: 'Flåtavika',
                    municipality: 'Fredrikstad',
                    easting: 256774.77,
                    northing: 6575054.89,
                    waterLat: 59.24385548989673,
                    waterLng: 10.734867641837525
                },
                {
                    id: 2,
                    locationName: 'Ingierstrand',
                    municipality: 'Nordre Follo',
                    easting: 261661.47,
                    northing: 6638826.08,
                    waterLat: 59.8179602646978,
                    waterLng: 10.747654858923312
                },
                {   
                    id: 0,
                    locationName: 'Kadetttangen',
                    municipality: 'Bærum',
                    easting: 250054.31,
                    northing: 6647323.83,
                    waterLat: 59.88772318620656,
                    waterLng: 10.540484220563144
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    display: flex;
    width: 100%;
    justify-items: center;
    flex-wrap: wrap;
    &-div{
        flex-grow: 3;
    }
}

</style>