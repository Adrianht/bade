export async function fetchTemperature(lat, lng) {
    try{
        const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`)
        const json = await response.json()
        return json.properties.timeseries[0].data.instant.details.air_temperature
    } catch(err){
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
    const parseString = require('xml2js').parseString;
    let res = ''
    parseString(xml, function (err, result) {
        res = result;
    });

    return res
}

export function fetchWaterTemp(lat, lng){
    
    return fetch(`https://api.met.no/weatherapi/oceanforecast/0.9/?lat=${lat}&lon=${lng}`)
        .then(response => response.text())
        .then(responseText => parseXML(responseText))
        .then(val => {
            if(val["mox:Forecasts"]["mox:forecast"]){
                if(val["mox:Forecasts"]["mox:forecast"][0]["metno:OceanForecast"][0]["mox:seaTemperature"]){
                    return val["mox:Forecasts"]["mox:forecast"][0]["metno:OceanForecast"][0]["mox:seaTemperature"][0]._
                } 
            }
            return "Prøv å dra markøren lenger ut mot vannet"
        })
        .catch(err => {
            console.error(err)
            return "Noe skjedde med det janky apiet til met"
        })
}