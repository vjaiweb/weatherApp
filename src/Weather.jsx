import React, { useState } from 'react';
import axios from 'axios';

const Weather = (props) => {
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchWData = async () => {
  setIsLoading(true);
  const options = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    params: {
      location: city,
      format: 'json',
      u: 'f'
    },
    headers: {
      'X-RapidAPI-Key': 'a1ca92e85fmshc0004fcf8b5af6cp16c748jsn74e1850f2af0',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    props.setWData(response.data);
    setError(null);
    setIsLoading(false);
  } catch (error) {
    props.setWData(null);
    setError('Failed to fetch weather data');
    setIsLoading(false);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWData();
    }
  };

  return (
    <div className="container mt-4" >
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div >
          <input
            type="text"
            className="form-control"
            placeholder="Enter a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {props.wData && Array.isArray(props.wData) ? (
            <ul>
              {props.wData.map((weather, index) => (
                <li key={index}>
                  <h2>{weather.name}</h2>
                  <p>Temperature: {weather.main.temp}°C</p>
                  <p>Description: {weather.weather[0].description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {props.wData && (
                <div>
                  <h2>{props.wData.name}</h2>
                  <p>Temperature: {props.wData.main.temp}°C</p>
                  <p>Description: {props.wData.weather[0].description}</p>
                </div>
              )}
              {error && <p className="text-danger">{error}</p>}
            </>
          )}
        </>
      )}
      </div>
      
    </div>
  );
};

export default Weather;
