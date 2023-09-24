import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [sunsetProbability, setSunsetProbability] = useState(null);
  const [sunsetDescription, setSunsetDescription] = useState(null);

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b51325554e1adbdfb37ec4cbed1dcfd5`
  const url = `http://20.151.234.62:8080/quality/${location}`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data.openWeatherResponse); // adjust to get the nested data
        setSunsetProbability(response.data.sunsetProbability);
        setSunsetDescription(response.data.sunsetDescription);
        console.log(response.data);
      })
      setLocation('')
    }
  }
  
  return (
    <div className="app">
      
      <div className="app-title">
        <h1>Sunset Predictor</h1> {/* 或其他您希望的标题 */}
      </div>

      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location  e.g. Toronto'
          type="text" />
      </div>

      <div className="container">
        <div className="top">
          <div className="left-side">
            <div className="location">
              <h2 style={{ fontSize: '40px' }}>{data.name}</h2>
              {data.main ? <h2>{data.main.temp.toFixed()}°C, {data.weather[0].main}</h2> : null}
            </div>
        
          </div>
          <div className="right-side">
            {
              sunsetProbability !== null && (
                <div className="sunset">
                  <h2>Sunset quality index:</h2>
                  <h1 style={{ fontSize: '70px' }}>{`${(sunsetProbability * 100).toFixed(2)}%`}</h1>
                  <h3>{sunsetDescription}</h3>
                </div>
              )
            } 
          </div>        
        </div>
      </div>

    </div>
  );
}

export default App;
