import { useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import './App.css';
import CurrentWeather from './components/search/currentWeather/currentWeather';
import Search from './components/search/search';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setCurrentForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setCurrentForecast({city: searchData.label, ...forecastResponse});
      })
      .catch(err => console.log(err))
  }
  console.log(forecast);
  console.log(currentWeather);

  return (
    <div className="container">
     <Search onSearchChange={handleOnSearchChange}/>
     {currentWeather && <CurrentWeather data={currentWeather}/>}
    </div>
  );
}

export default App;
