<template>
  <div class="container">
    <icon name="search" ></icon>
    <input placeholder="Skriv inn stedsnavn" ref="searchField" v-model="searchInput" @keyup.enter="fetchArea()">
    <button @click="fetchArea()">Kjør</button>

    <p v-if="noResults">Fant ingen steder med det navnet!</p>
    <p v-if="toggleError"> {{errorMsg}} </p>
    <div v-else>
      <template v-if="results.stedsnavn">
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
              {{this.waterTemp}}
            </p>
          </div>
        </div>
        <div class="map" id="map" v-if="Object.keys(this.longLatObj).length > 0"></div>
      </template>
    </div>
  </div>
</template>

<script>

import { fetchTemperature, transformUTMtoLatLng, parseXML, fetchWaterTemp, fetchAreaName } from '../services/APIcalls.js';
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
        longLatObj: {},
        errorMsg: "Du må skrive inn stedsnavn",
        toggleError: false,
        noResults: false,
        waterTemp: null,
        globalMap: '',
        globalMarker: null,
    };
  },
  methods:{
    fetchArea(){
        if(this.searchInput.length < 1){
          this.toggleError = true
          this.results = []
        } else {
          this.toggleError = false
          fetchAreaName(this.searchInput)
            .then(res => this.results = res)
            .catch(err => console.error(err))
            .finally(() => this.fetchTemp())
        }
    },
    fetchTemp(){
        if(this.results.stedsnavn){
          this.noResults = false
          const easting = this.results.aust.toString();
          const northing = this.results.nord.toString();
          this.longLatObj = transformUTMtoLatLng(easting, northing);

          fetchTemperature(this.longLatObj.lat, this.longLatObj.lng)
            .then(res => this.airTemp = res)
            .catch(err => console.error(err))
            .finally(() => this.renderMap())
        } else {
          this.noResults = true
        }
    },
    renderMap(){
        let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

        mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
        var globalMap = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.longLatObj.lng, this.longLatObj.lat],
            zoom: 11
        });

        globalMap.addControl(new mapboxgl.NavigationControl());

        this.globalMarker = new mapboxgl.Marker({
          draggable: true
          })
          .setLngLat([this.longLatObj.lng, this.longLatObj.lat])
          .addTo(globalMap);
        fetchWaterTemp(this.longLatObj.lat, this.longLatObj.lng)
          .then(res => this.waterTemp = res)
        this.globalMarker.on('dragend', this.onDragEnd);
    },
    onDragEnd() {
        let lngLat = this.globalMarker.getLngLat();
        console.log("marker lng lat drop: ", lngLat)
        fetchWaterTemp(lngLat.lat, lngLat.lng)
          .then(res => this.waterTemp = res)
      }
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
    margin: 25px auto;
    text-align: center;
  }
.map{
  height:25em;
  width:25em;
  padding:1em;
  top:0px;
  margin: auto;

}

</style>