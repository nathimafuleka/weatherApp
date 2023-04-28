import React from 'react'
import './descriptions.css'

import { FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

const Descriptions = ({ weather }) => {
    const tempUnit  = "metric" ? "°C" : "°F";
    const windUnit  = "metric" ? "m/s" : "m/h";
  
    const cards = [
      {
        id: 1,
        icon: <BiHappy />,
        title: "feels like",
        data: weather.feels_like.toFixed(),
        unit: tempUnit,
      },
      {
        id: 2,
        icon: <MdCompress />,
        title: "pressure",
        data: weather.pressure,
        unit: "hPa",
      },
      {
        id: 3,
        icon: <MdOutlineWaterDrop />,
        title: "humidity",
        data: weather.humidity,
        unit: "%",
      },
      {
        id: 4,
        icon: <FaWind />,
        title: "wind speed",
        data: weather.speed.toFixed(),
        unit: windUnit,
      },
    ];
    return (
      <div className="section section__descriptions">
        {cards.map(({ id, icon, title, data, unit }) => (
          <div key={id} className="card">
            <div className="description__card-icon">
              {icon}
              <small>{title}</small>
            </div>
            <h2>{`${data} ${unit}`}</h2>
          </div>
        ))}
      </div>
    );
  };
  

export default Descriptions
