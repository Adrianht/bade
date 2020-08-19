<template>
  <div class="property-card">
    <div class="property-description">
        <h5>
            {{locationName}}, {{municipality}}
        </h5>
        <div class="temp-div">
        <div class="temp">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-temperature" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><line x1="10" y1="9" x2="14" y2="9" /></svg>
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
    </div>
  </div>
</template>

<script>
import { fetchTemperature, transformUTMtoLatLng } from '../services/APIcalls.js';
import Icon from './Icon.vue';

export default {
    name: 'LocationCard',
    components: {
        Icon
    },
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
.temp{
  display: flex;
  justify-content: center;
  align-items: center;
  &-div{
    margin-bottom: 1em;
  }
}

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