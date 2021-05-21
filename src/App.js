import React, {useState} from 'react';
import {fetchWeather} from './api/fetchWeather';
import './App.css';

const  App =()=> {

  const [query,setQuery]= useState("");
  const [weather, setWeather]= useState("")
  const [time, setTime]= useState("")
  const convertTime=(dt)=>{
    let unix_timestamp = dt
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime

  }
  const search = async (e) =>{
    if (e.key=== 'Enter'){
      console.log(query)
      const data= await fetchWeather(query);
      setWeather(data);
      console.log(convertTime(data.dt));
      setTime(convertTime(data.dt))
      setQuery("");

      console.log(data);
    }
  }
  

  return (
    <div className="main-container">
     <strong className="search"> Weather Search</strong>
      <input
      type="text"
      className="search"
      placeholder="Search City..."
      value={query}
      onChange={(e)=> setQuery(e.target.value)}
      onKeyPress={search}
      />

      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>
              {weather.name}
            </span>
            <sup>
              {weather.sys.country}
            </sup>
          </h2>
          <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                        <br></br>
                        <p>{time} </p>
                    </div>

          </div>
      )}

      
    </div>
  );
}

export default App;
