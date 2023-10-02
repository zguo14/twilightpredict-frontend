import React, { useState } from 'react'
import axios from 'axios'

import SearchBar from './SearchBar'; // 引入新的搜索框组件
import './SearchBar.css';  // 也确保你有这个CSS文件

function App() {
  const [data, setData] = useState({})
  const [sunsetProbability, setSunsetProbability] = useState(null);
  const [sunsetDescription, setSunsetDescription] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b51325554e1adbdfb37ec4cbed1dcfd5`

  // Search
  const handleCityChange = (location) => {
    const url = `https://twilightpredict.com/api/quality/${location}`;
    axios.get(url).then((response) => {
      setData(response.data.openWeatherResponse);
      setSunsetProbability(response.data.sunsetProbability);
      setSunsetDescription(response.data.sunsetDescription);
    });
  };

  
  return (
    <div className="app">
      
      
      <div className="app-title">
        Sunset Predictor {/* 或其他您希望的标题 */}
      </div>

      <div className="help-icon" 
          onMouseEnter={() => setShowTooltip(true)} 
          onMouseLeave={() => setShowTooltip(false)}>
        <span>?</span>
        {showTooltip && <div className="tooltip">The prediction is based on machine learning models.</div>}
      </div>

      <SearchBar setCity={handleCityChange} />
      
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
                  <h2>Sunset Quality Index</h2>
                  <h1 style={{ fontSize: '70px' }}>{`${Math.round(sunsetProbability * 100)}%`}</h1>

                  <h3>{sunsetDescription}</h3>
                </div>
              )
            } 
          </div>        
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2023 Sunset Predictor. All rights reserved.</p>
      </div>

    </div>
  );
}

export default App;
