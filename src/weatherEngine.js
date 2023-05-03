const API_KEY = "a92d0591ad210621165bf2503e50144d";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getCurrentWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  const data = await fetch(URL).then((res) => res.json());
  
  const {
    weather: [{ description, icon }],
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

const getForecastData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&exclude=hourly,minutely&appid=${API_KEY}&units=${units}&cnt=5`;
  const data = await fetch(URL).then((res) => res.json());

  const forecastData = data.list.map((forecast) => {
    const {
      weather: [{ description, icon }],
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      dt_txt,
    } = forecast;

    return {
      description,
      iconURL: makeIconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      dt_txt,
    };
  });

  return forecastData;
};

export { getCurrentWeatherData, getForecastData };
