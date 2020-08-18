export async function fetchTemperature(easting, northing ) {
    let temp = '';
    let utmObj = require('utm-latlng');
    let utm = new utmObj('EUREF89');

    const longLatObj = utm.convertUtmToLatLng(easting, northing, 33, 'V')
    const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${longLatObj.lat}&lon=${longLatObj.lng}`)
    const json = await response.json()
    
    // .then(response => response.json())
    //     .then(weather => temp = weather.properties.timeseries[0].data.instant.details.air_temperature)
    //     .finally(() => console.log(temp))

    return json.properties.timeseries[0].data.instant.details.air_temperature
}