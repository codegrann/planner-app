import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/weatherWidget.css';
const API_KEY=process.env.REACT_APP_WEATHER_API_KEY;


export default function MyCustomWidget() {
    const [weatherData, setWeatherData] = useState(null);
  
    useEffect(() => {
      const fetchWeatherData = async (latitude, longitude) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&lat=${latitude}&lon=${longitude}`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.log('Error fetching weather data:', error);
        }
      };
  
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              fetchWeatherData(latitude, longitude);
            },
            (error) => {
              console.log('Error getting location:', error);
            }
          );
        } else {
          console.log('Geolocation is not supported by this browser.');
        }
      };
  
      getLocation();
    }, []);

    const convertKelvinToFahrenheit = (kelvin) => {
        return (kelvin - 273.15) * (9 / 5) + 32;
      };
  
    return (
      <div style={{ minWidth: 300 }}>
        {weatherData && (
          <div>
            <h2>Current Weather</h2>
            <p>Temperature: {convertKelvinToFahrenheit(weatherData.main.temp).toFixed(1)}°F</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}
      </div>
    );
  }
  

