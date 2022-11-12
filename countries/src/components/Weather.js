import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [capitalWeather, setCapitalWeather] = useState({});

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;

    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`
      )
      .then((response) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=${api_key}`
          )
          .then((response) => {
            console.log(response.data);
            setCapitalWeather(response.data);
          });
      });
  }, [capital]);

  console.log(capitalWeather);

  if (Object.keys(capitalWeather).length !== 0) {
    console.log(capitalWeather);
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <div>temperature {capitalWeather.main.temp} Celcius</div>
        <img
          src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}
          alt={capitalWeather.weather[0].description}
        ></img>
        <div>wind {capitalWeather.wind.speed} m/s</div>
      </div>
    );
  } else {
    return <div></div>
  }
};

export default Weather;
