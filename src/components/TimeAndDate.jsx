import React, { useState, useEffect } from 'react';

function TimeAndDate() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className='section section__time'>
      <h4>Date: {formatDate(dateTime)} | Time: {formatTime(dateTime)}</h4>
    </div>
  );
}

export default TimeAndDate;
