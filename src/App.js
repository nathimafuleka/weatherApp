import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import sunSet from "./assets/sunset.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherEngine";
import TimeAndDate from "./components/TimeAndDate";
import Forecast from "./components/Forecast";

function App() {
  const [weather, setWeather] = useState(null);
  const [zip, setZip] = useState(null);
  const [bg, setBg] = useState(sunSet);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      let data;

      if (currentLocation) {
        data = await getFormattedWeatherData(
          currentLocation.lat,
          currentLocation.lon
        );
      } else {
        data = await getFormattedWeatherData(zip);
      }

      setWeather(data);

      const threshold = "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [zip, currentLocation]);

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      if (currentLocation) {
        setCurrentLocation(null);
      }
      setZip(e.currentTarget.value);
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
          </div>
          {weather && (
            <>
              <TimeAndDate />
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
              <hr className="line"/>
              <h3>Daily Forecast</h3>
              <Forecast weather={weather} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
