<template>
  <div class="property-card">
    <div class="property-description">
        <h5>
        {{locationName}}, {{municipality}}
        </h5>
        <p>
        {{this.airTemp}}
        </p>
        <p>
            badeTemp
        </p>
    </div>
  </div>
</template>

<script>
import { fetchTemperature, transformUTMtoLatLng } from '../services/APIcalls.js';

export default {
    name: 'LocationCard',
    data(){
        return {
            airTemp: '',
            transformedToLatLng: []
        }
    },
    props: {
        easting: {
            required: true,
            type: Number,
        },
        northing: {
            required: true,
            type: Number,
        },
        locationName: {
            required: true,
            type: String
        },
        municipality: {
            required: true,
            type: String
        }
    },
    methods:{
        transformUTM(){
        }
    },
    async created(){
        this.transformedToLatLng = transformUTMtoLatLng(this.easting, this.northing)
        this.airTemp = await fetchTemperature(this.transformedToLatLng.lat, this.transformedToLatLng.lng)
    },
}
</script>

<style lang="scss" scoped>
//https://codepen.io/markelrayes/pen/ZEGVBZm

h5
{
  margin:5px;
  font-size:1.4em;
  font-weight:700;
}

p
{
  font-size:12px;
}

.center
{
  height:100vh;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.property-card
{
  height:8em;
  width:14em;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
  -ms-flex-direction:column;
  flex-direction:column;
  position:relative;
  -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius:16px;
  overflow:hidden;
  -webkit-box-shadow:  15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff;
  box-shadow:  15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff;
  margin: 1em;
}

.property-description
{
  background-color: #FAFAFC;
  height:8em;
  width:14em;
  position:absolute;
  bottom:0em;
  -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0.5em 1em;
  text-align:center;
}


</style>