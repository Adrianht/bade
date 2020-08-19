<template>
  <div class="container">
    <icon name="search" class="custom-icon"></icon>
    <input placeholder="Skriv inn stedsnavn" ref="searchField" v-model="searchInput">
    <button v-if="searchInput.length > 0" @click="fetchArea()">Kjør</button>
    <div v-if="this.results.length != 0">
        {{results.stedsnavn.toString()}}, {{results.kommunenavn.toString()}}
      <div class="temp-div">
        <div class="temp">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-temperature" width="42" height="42" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><line x1="10" y1="9" x2="14" y2="9" /></svg>
          <p>
            {{ this.airTemp }}
          </p>
        </div>
        <div class="temp">
          <icon name="pool" class="custom-icon"></icon>
          <p>
            13.7
          </p>
        </div>
      </div>
      <div class="map" id="map" v-if="Object.keys(this.longLatObj).length > 0"></div>
    </div>
  </div>
</template>

<script>

import { fetchTemperature, transformUTMtoLatLng, parseXML } from '../services/APIcalls.js';
import Icon from './Icon.vue';
export default {
  name: 'AreaSearch',
  components: {
    Icon
  },
  data() {
    return {
        searchInput: '',
        results: [],
        airTemp: '',
        longLatObj: {}
    };
  },
  methods:{
    async fetchArea(){
        // const parseString = require('xml2js').parseString;    
        // let testRes = []
        let response = await fetch(`https://ws.geonorge.no/SKWS3Index/ssr/sok?navn=${this.searchInput}*`)
        let responseText = await response.text()
        let parsedXML = await parseXML(responseText)
        this.results = parsedXML.sokRes.stedsnavn[0]
        this.fetchTemp()
    },
    async fetchTemp(){
        const easting = this.results.aust.toString();
        const northing = this.results.nord.toString();
        this.longLatObj = transformUTMtoLatLng(easting, northing);
        this.airTemp = await fetchTemperature(this.longLatObj.lat, this.longLatObj.lng)
        this.renderMap()
    },
    renderMap(){
        require('dotenv').config()
        let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

        mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
        let map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.longLatObj.lng, this.longLatObj.lat],
            zoom: 11
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.temp{
  display: flex;
  justify-content: center;
  align-items: center;
  &-div{
    margin-bottom: 1em;
  }
}
.custom-icon{
  font-size: 42px;
}

.container {
    margin: 50px auto;
    text-align: center;
  }
.map{
  height:25em;
  width:25em;
  padding:1em;
  top:0px;

}

</style>