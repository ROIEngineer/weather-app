import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchWeatherByCity } from "./api/weather";

export default function App() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  async function handleSearch(city) {
    setStatus("loading");
    setError(null);
    setWeather(null);

    try {
      const data = await fetchWeatherByCity(city, "metric");
      setWeather(data);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Failed to fetch");
      setStatus("error");
    }
  }

  return (
    <div style={{maxWidth:640, margin:"24px auto", padding:20}}>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />

      {status === "idle" && <p>Type a city and press Search.</p>}
      {status === "loading" && <p>Loading…</p>}
      {status === "error" && <p role="alert" style={{color:"crimson"}}>Error: {error}</p>}

      {status === "success" && weather && (
        <div style={{marginTop:16, padding:12, borderRadius:8, background:"#fff"}}>
          <h2>{weather.name}, {weather.sys?.country}</h2>
          <p style={{fontSize:24, margin:6}}>
            {Math.round(weather.main.temp)}°C — {weather.weather?.[0]?.description}
          </p>
          <p style={{margin:0}}>Humidity: {weather.main.humidity}%</p>
          <p style={{margin:0}}>Wind: {Math.round(weather.wind.speed)} m/s</p>
        </div>
      )}
    </div>
  );
}
