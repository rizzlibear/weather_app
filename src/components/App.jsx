import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  useEffect(() => {
    if (isSubmitted && city) {
      const apiKey = "0d1d6dec1c55bc357591bda10da3148a";
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Unable to connect to server");
          }
          return res.json();
        })
        .then((data) => {
          setWeatherData(data);
          setError(null); // Clear previous errors if any
          setIsSubmitted(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsSubmitted(false);
        });
    }
  }, [isSubmitted, city]);

  return (
    <div className="form-container">
      <h2>Weather App</h2>
      <form>
        <div className="form-group">
          <label htmlFor="city">City Name:</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            onChange={handleChange}
            value={city}
          />
        </div>
        <div className="form-group">
          <button type="submit" onClick={handleClick}>
            Submit
          </button>
        </div>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>
            Wind: {weatherData.wind.speed} m/s at {weatherData.wind.deg}°
          </p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
