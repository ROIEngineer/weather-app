import { useEffect, useState } from "react";
// Mock API functions since the actual api/weather.js doesn't exist yet
const mockWeather = {
  name: "London",
  sys: { country: "GB" },
  main: {
    temp: 15,
    feels_like: 14,
    humidity: 65,
    pressure: 1013,
    temp_max: 16,
    temp_min: 14
  },
  weather: [{ 
    id: 801, 
    main: "Clouds", 
    description: "few clouds", 
    icon: "02d" 
  }],
  wind: { speed: 4.5, deg: 180 },
  clouds: { all: 20 }
};

const mockForecast = {
  list: Array(40).fill(null).map((_, i) => ({
    dt: i,
    dt_txt: new Date(Date.now() + i * 3 * 60 * 60 * 1000).toISOString(),
    main: {
      temp: 15 + Math.sin(i) * 5,
      feels_like: 14 + Math.sin(i) * 5,
      humidity: 60 + Math.sin(i) * 10,
      pressure: 1010 + Math.sin(i) * 5
    },
    weather: [{
      id: 800 + (i % 3),
      main: ["Clear", "Clouds", "Rain"][i % 3],
      description: ["clear sky", "scattered clouds", "light rain"][i % 3],
      icon: ["01d", "02d", "10d"][i % 3]
    }]
  }))
};

async function fetchWeatherByCity(city, units) {
  console.log(`Fetching weather for ${city} in ${units}`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ...mockWeather, name: city, main: { ...mockWeather.main, temp: 15 + Math.random() * 10 } };
}

async function fetchWeatherByCoords(lat, lon, units) {
  console.log(`Fetching weather for coordinates ${lat},${lon} in ${units}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ...mockWeather, name: "Your Location" };
}

async function fetchForecastByCity(city, units) {
  console.log(`Fetching forecast for ${city} in ${units}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockForecast;
}

export default function useWeather() {
  const [city, setCity] = useState(
    localStorage.getItem("weather:city") || "London"
  );
  const [coords, setCoords] = useState(null);
  const [units, setUnits] = useState(
    localStorage.getItem("weather:units") || "metric"
  );

  const [weather, setWeather] = useState(mockWeather);
  const [forecast, setForecast] = useState(mockForecast.list);
  const [status, setStatus] = useState("success");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWeather() {
      if (!city && !coords) {
        setStatus("idle");
        return;
      }

      setStatus("loading");
      setError(null);

      try {
        let current;

        if (coords) {
          current = await fetchWeatherByCoords(coords.lat, coords.lon, units);
        } else {
          current = await fetchWeatherByCity(city, units);
        }

        setWeather(current);

        if (city) {
          const forecastData = await fetchForecastByCity(city, units);
          setForecast(forecastData.list);
        } else {
          setForecast(mockForecast.list);
        }

        setStatus("success");

        if (city) localStorage.setItem("weather:city", city);
        localStorage.setItem("weather:units", units);
      } catch (err) {
        setError(err.message || "Failed to fetch weather data. Please try again.");
        setStatus("error");
      }
    }

    loadWeather();
  }, [city, coords, units]);

  function searchCity(newCity) {
    setCoords(null);
    setCity(newCity);
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setStatus("error");
      return;
    }

    setStatus("loading");
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setCity("");
        setStatus("success");
      },
      (err) => {
        setError("Location permission denied. Please allow location access or search for a city.");
        setStatus("error");
      }
    );
  }

  return {
    weather,
    forecast,
    status,
    error,
    units,
    searchCity,
    setUnits,
    useLocation,
  };
}
