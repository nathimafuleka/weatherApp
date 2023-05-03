import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import sunSet from "./assets/sunset.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getCurrentWeatherData, getForecastData } from "./weatherEngine"; // Import the getForecastData function
import Forecast from "./components/Forecast";
import TimeAndDate from "./components/TimeAndDate";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]); // Add state for forecast data
  const [city, setCity] = useState(null);
  const [bg, setBg] = useState(sunSet);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      let data;

      if (currentLocation) {
        data = await getCurrentWeatherData(
          currentLocation.lat,
          currentLocation.lon
        );
      } else {
        data = await getCurrentWeatherData(city);
      }

      setWeather(data);

      const threshold = "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);

      // Call the getForecastData function and set the forecast state with the result
      const forecastData = await getForecastData(city);
      setForecast(forecastData);
    };

    fetchWeatherData();
  }, [city, currentLocation]);

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      if (currentLocation) {
        setCurrentLocation(null);
      }
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    };

    fetchCurrentLocation();
  }, []);

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        <div className="container">
          <div className="section section__inputs">
            <input
              onKeyDown={enterKeyPressed}
              type="text"
              name="zip"
              placeholder="Search using city or zip code and press enter"
            />
              <TimeAndDate />
          </div>
          {weather && (
            <>
              <div className="section section__temperature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperature">
                  <h1>{`${weather.temp.toFixed()} °C`}</h1>
                </div>
              </div>
              <Descriptions weather={weather} />
              <hr className="line" />
              <h2 className="section__heading"> Daily Forecast</h2>
              <Forecast forecast={forecast} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
