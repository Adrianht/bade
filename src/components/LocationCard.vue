<template>
  <div class="property-card">
    <div class="map" :id="'map' + this.id">
    </div>
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

import { fetchTemperature } from '../services/APIcalls.js';

export default {
    name: 'LocationCard',
    data(){
        return {
            airTemp: ''
        }
    },
    props: {
        id: {
            required: true,
            type: Number
        },
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
        renderMap(){
            require('dotenv').config()
            let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
     
            mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
            let map = new mapboxgl.Map({
                container: "map" + this.id,
                style: 'mapbox://styles/mapbox/streets-v11'
            });

        }
    },
    async created(){
        this.airTemp = await fetchTemperature(this.easting, this.northing)
        this.renderMap()
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
//https://codepen.io/markelrayes/pen/ZEGVBZm

h5
{
  margin:0px;
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
  height:18em;
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
  margin-bottom: 1rem;
}

.map{
  height:10em;
  width:14em;
  padding:1em 2em;
  top:0px;
  position: absolute;
}
// .property-image
// {
//   -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
//   -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
//   transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
//   background-image:url('https://cdn.photographylife.com/wp-content/uploads/2017/01/What-is-landscape-photography.jpg');
//   background-size:cover;
//   background-repeat:no-repeat;
// }
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
// .property-card:hover .property-description
// {
//   height:0em;
//   padding:0px 1em;
// }
// .property-card:hover .property-image
// {
//   height:18em;
// }

// .property-card:hover .property-social-icons
// {
//   background-color:white;
// }

// .property-card:hover .property-social-icons:hover
// {
//   background-color:blue;
//   cursor:pointer;
// }


</style>>

curl 'https://www.f-b.no/vis/datasak/tools/badetemperaturer/v1/api/?key=1GAKZaRfye3RRmOdXltNdmf9ODFcyWoqDVj9yyeQjfMc&gid=0' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:79.0) Gecko/20100101 Firefox/79.0' -H 'Accept: application/json,*/*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'DNT: 1' -H 'Referer: https://www.f-b.no/hopp-i-sjoen-her-er-dagens-badetemperaturer/s/5-59-1884666?access=granted' -H 'Connection: keep-alive' -H 'Cookie: amedia%3Avisitid=71805739-b8f9-46cf-a587-20bac570b6b6|1597669608915; amedia%3Afpbid=259e6ed5-f928-4604-abe8-3f707482e303; aid.cookies=enabled; aid.session=i7es4s585njp16kitcrfcbl6kbtha530zjtlvc6yylyshafo8lfjvxex1hjkfzkpfrg9vb6sflys8aeg9lnugj9p4pvlqsytrhs; VSTOKEN=3462a2b11c:1597842392:newspaper:cdbad702-a023-417e-a0e6-ccca2436a693:f-b:jupiter; aid-reload-article=https://www.f-b.no/hopp-i-sjoen-her-er-dagens-badetemperaturer/s/5-59-1884666?access=granted; daxsub=a_sub_id=3460364&a_sub_id_source=Amedia&a_sub_class=owner&a_sub_type=FB_DP&a_sub_status=active&a_sub_key=6c2dde8a4c0dd9c9c9bbd74ed1ffa7afb08349f05ac8e72b17645c0f3d7b92d6&a_user_key=a5fc4473-b41d-4414-8045-b4f6ab2405a0&a_user_age=64&a_user_gender=M&a_user_staff=false&daxsub_cookie_created=1597669593354' -H 'Cache-Control: max-age=0'