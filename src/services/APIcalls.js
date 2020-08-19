export async function fetchTemperature(lat, lng) {
    try{
        const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`)
        const json = await response.json()
        //console.log(json)
        return json.properties.timeseries[0].data.instant.details.air_temperature
    } catch(err){
        console.log(err)
        return 'error'
    }
}

export function transformUTMtoLatLng(easting, northing){
    let utmObj = require('utm-latlng');
    let utm = new utmObj('EUREF89');

    const longLatObj = utm.convertUtmToLatLng(easting, northing, 33, 'V')
    return longLatObj;
}

export function parseXML(xml){
    // const parseString = require('xml2js').parseString;    
    // const parser = new xml2js.Parser(/* options */);
    // let testRes = []
    // parseString(responseText, function (err, result) {
    //     testRes = result.sokRes.stedsnavn[0]
    // });

    const parseString = require('xml2js').parseString;
    let res = ''
    parseString(xml, function (err, result) {
        res = result;
    });

    return res
}

// fetchArea(){
//     const parseString = require('xml2js').parseString;    
//     let testRes = []
//     fetch(`https://ws.geonorge.no/SKWS3Index/ssr/sok?navn=${this.searchInput}*`)
//         .then(response => response.text())
//         .then((responseText) => {
//             parseString(responseText, function (err, result) {
//                 testRes = result.sokRes.stedsnavn[0]
//             });
//         })
//         .then(() => this.results = testRes)
//         .finally(() => this.fetchTemp())
// },