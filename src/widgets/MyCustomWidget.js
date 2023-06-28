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
            <h2 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Today's Weather</h2>
            <p>
              Temperature: 
              <span style={{ fontSize: '1.2rem' }}>
                {convertKelvinToFahrenheit(weatherData.main.temp).toFixed(1)}°F  
                <i className="bi bi-thermometer-half" style={{ color: 'blue' }}></i>
              </span>
            </p>
            <p>
              Humidity: 
              <span style={{ fontSize: '1.2rem' }}>
                {weatherData.main.humidity}%  
                <i className="bi bi-droplet" style={{ color: 'blue' }}></i>
              </span>
            </p>
            <p>
              Weather Conditions: 
              <span style={{ fontSize: '1.2rem' }}>
                {weatherData.weather[0].main}  
                <i className="bi bi-cloud-sun" style={{ color: 'blue' }}></i>
              </span>
            </p>
            <p>
              Visibility: 
              <span style={{ fontSize: '1.2rem' }}>
                {weatherData.visibility} m  
                <i className="bi bi-eye" style={{ color: 'blue' }}></i>
              </span>
            </p>
            <p>
              Wind Speed: 
              <span style={{ fontSize: '1.2rem' }}>
                {weatherData.wind.speed} m/s  
                <i className="bi bi-wind" style={{ color: 'blue' }}></i>
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }
  

