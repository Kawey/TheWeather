
  let lat, lon;
  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weather, air;
      try {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      console.log(lat, lon);
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
      const api_url = `weather/${lat},${lon}`;

      //const api_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=SVKGD4MHBGNC3F3QSVTZM7AMA`
      
      response = await fetch(api_url);
      const json = await response.json();
      console.log(json);
      weather = json.weather.currentConditions
      air = json.air_quality.results[0].measurements[0];
      document.getElementById('summary').textContent = weather.conditions;
      document.getElementById('aq_parameter').textContent = air.parameter;
      document.getElementById('aq_value').textContent = air.value;
      document.getElementById('aq_units').textContent = air.unit;
      document.getElementById('aq_date').textContent = air.lastUpdated;

      

      } catch (error) {
        console.error(error);
      air = { value: -1 };
      document.getElementById('aq_value').textContent = 'NO READING';
      }
      
      const data = { lat, lon, weather, air };
      const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      };
      const db_response = await fetch('/api', options);
      const db_json = await db_response.json();
      console.log(db_json);
      
    });
  } else {
    console.log('geolocation not available');
  }

