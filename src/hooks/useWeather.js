import { useEffect, useState } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords, fetchForecastByCity } from "../api/weather";

export default function useWeather() {
  const [city, setCity] = useState(
    localStorage.getItem("weather:city") || ""
  );
  const [coords, setCoords] = useState(null);
  const [units, setUnits] = useState(
    localStorage.getItem("weather:units") || "metric"
  );

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

