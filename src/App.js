import React, { useState } from 'react'
import axios from 'axios'

import SearchBar from './SearchBar'; // 引入新的搜索框组件
import './SearchBar.css';  // 也确保你有这个CSS文件

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [sunsetProbability, setSunsetProbability] = useState(null);
  const [sunsetDescription, setSunsetDescription] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b51325554e1adbdfb37ec4cbed1dcfd5`
  const url = `https://twilightpredict.com/api/quality/${location}`
  
  // const searchLocation = (event) => {
  //   if (event.key === 'Enter') {
  //     axios.get(url).then((response) => {
  //       setData(response.data.openWeatherResponse); // adjust to get the nested data
  //       setSunsetProbability(response.data.sunsetProbability);
  //       setSunsetDescription(response.data.sunsetDescription);
  //       // console.log(response.data);
  //     })
  //     setLocation('')
  //   }
  // }

  // 更新这个函数来使用新的搜索框
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
        <h1>Sunset Predictor</h1> {/* 或其他您希望的标题 */}
      </div>

      {/* <div className="help-icon">
        <span>?</span>
        <div className="tooltip">这里是提示消息的内容。</div>
      </div> */}

      <div className="help-icon" 
          onMouseEnter={() => setShowTooltip(true)} 
          onMouseLeave={() => setShowTooltip(false)}>
        <span>?</span>
        {showTooltip && <div className="tooltip">The prediction is based on machine learning models.</div>}
      </div>

      {/* <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location  e.g. Toronto'
          type="text" />
      </div> */}
      
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
