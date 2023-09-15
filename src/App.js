import React, { useState , useEffect} from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const [qualityData, setQualityData] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        
        const fetchedQualityData = await fetchQualityData(accessToken);
        setQualityData(fetchedQualityData);
      }
    };

    fetchData();
  }, []);

  const getAccessToken = async () => {
    const config = {
      headers: {
        Authorization: 'Basic ' + btoa('z7guo@uwaterloo.ca:Aa112211!')
      }
    };
    const body = { grant_type: 'password' };
  
    try {
      const response = await axios.post('https://sunburst.sunsetwx.com/v1/login', body, config);
      console.log(response);
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  };


  const fetchQualityData = async (accessToken) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
  
    const body = [
      {
        "type": "sunrise",
        "coords": [-77.8600012, 40.7933949]
      }
    ];
  
    try {
      const response = await axios.post('https://sunburst.sunsetwx.com/v1/quality', body, config);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching quality data:', error);
      return null;
    }
  };
  

  


  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
{/* 
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        } */}

        {qualityData && (
                <div className="quality">
                  <p>Quality: {qualityData[0].collection.features[0].properties.quality}</p>
                  <p>Quality Percent: {qualityData[0].collection.features[0].properties.quality_percent}</p>
                </div>
              )}

      </div>
    </div>
  );
}

export default App;
