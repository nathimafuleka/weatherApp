import React from 'react'
import "./forecast.css"
import moment from "moment";



const Forecast = ({ forecast }) => {

  const tempUnit  = "metric" ? "°C" : "°F";

    return (
      <div className="section section__forecast">
        {forecast.map((data) => (
          <div className="card">
            <div className="forecast__card-icon">
            <img src={data.iconURL} alt="weatherIcon" />
            </div>
            <small>{moment(data.dt_txt).format('dddd')}</small>
            <br />
            <h2>{`${data.temp.toFixed()} ${tempUnit}`}</h2>
            <small>{data.description}</small>
          </div>
        ))}
      </div>
    );
  };
  

export default Forecast
