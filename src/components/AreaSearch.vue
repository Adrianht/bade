<template>
  <div>
    <input placeholder="Skriv inn stedsnavn" ref="searchField" v-model="searchInput">
    <button @click="fetchArea()">Kjør</button>
    <div v-if="this.results.length != 0" >
        {{results.stedsnavn.toString()}}, {{results.kommunenavn.toString()}}
    </div>
    <div v-if="this.weatherObj.length != 0">
        {{this.weatherObj}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AreaSearch',
  data() {
    return {
        searchInput: '',
        results: [],
        weatherObj: []
    };
  },
  methods:{
    fetchArea(){
        const parseString = require('xml2js').parseString;    
        let testRes = []
        fetch(`https://ws.geonorge.no/SKWS3Index/ssr/sok?navn=${this.searchInput}*`)
            .then(response => response.text())
            .then((responseText) => {
                parseString(responseText, function (err, result) {
                    testRes = result.sokRes.stedsnavn[0]
                    console.log(result)
                });
            })
            .then(() => this.results = testRes)
            .finally(() => this.fetchTemp())
    },
    fetchTemp(){
        let utmObj = require('utm-latlng');
        let utm = new utmObj('EUREF89');
        const easting = this.results.aust.toString();
        const northing = this.results.nord.toString();
        const zone = this.results.epsgKode.toString();


        const longLatObj = utm.convertUtmToLatLng(easting, northing, 33, 'V')
        const url = ''
        fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${longLatObj.lat}&lon=${longLatObj.lng}`)
            .then(response => response.json())
            .then(weather => this.weatherObj = weather.properties.timeseries[0].data.instant.details.air_temperature)
    }
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