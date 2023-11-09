import React, { useState } from 'react';
import './weatherapp.css';

import search_icon from '../assets/search.png';
import cloud_icon from '../assets/cloud.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const WeatherApp = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  
  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const api_key = '7db02ec1a810c45949efa092debab257';

  const search = async () => {
    if (cityName === '') {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        console.error('City not found');
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  return (
    <div className="container">
      <div className="top">
        <input
          type="text"
          className="cityname"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      {weatherData && (
        <div>
          <div className="wti">
            <img src={cloud_icon} alt="" />
          </div>
          <div className="wtemp">{weatherData.main.temp}°C</div>
          <div className="wloc">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="hper">{weatherData.main.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="windr">{weatherData.wind.speed} kmph</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
