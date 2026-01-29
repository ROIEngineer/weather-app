import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle";
import useWeather from "./hooks/useWeather";
import { Cloud, Droplets, Wind, Thermometer, Navigation, MapPin } from "lucide-react";

export default function App() {
  const {
    weather,
    forecast,
    status,
    error,
    units,
    searchCity,
    setUnits,
    useLocation,
  } = useWeather();

  const [usingLocation, setUsingLocation] = useState(false);

  function getDailyForecast(list) {
    const days = {};
    list?.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!days[date]) {
        days[date] = item;
      }
    });
    return Object.values(days).slice(0, 5);
  }

  const handleUseLocation = () => {
    setUsingLocation(true);
    useLocation();
  };

  const handleSearch = (city) => {
    setUsingLocation(false);
    searchCity(city);
  };

  const dailyForecast = getDailyForecast(forecast);

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <div>
            <h1>🌤️ Weather App</h1>
            {weather && (
              <div className="location">
                <MapPin size={16} />
                <span>{weather.name}, {weather.sys?.country}</span>
              </div>
            )}
          </div>
          <UnitToggle units={units} onChange={setUnits} />
        </div>

        <SearchBar onSearch={handleSearch} />

        <button className="location-button" onClick={handleUseLocation}>
          <Navigation size={18} />
          Use my current location
        </button>

        {status === "loading" && (
          <div className="loading">
            {usingLocation ? "Detecting your location..." : "Loading weather data..."}
          </div>
        )}
        
        {status === "error" && (
          <div className="error-message" role="alert">
            ⚠️ {error}
          </div>
        )}

        {status === "success" && weather && (
          <>
            <div className="weather">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
              />
              <div>
                <div className="temp">
                  {Math.round(weather.main.temp)}
                  {units === "metric" ? "°C" : "°F"}
                </div>
                <div className="desc">{weather.weather[0].description}</div>
                <div>Feels like {Math.round(weather.main.feels_like)}{units === "metric" ? "°C" : "°F"}</div>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <Thermometer className="detail-icon" />
                <div>
                  <div className="detail-label">Humidity</div>
                  <div className="detail-value">{weather.main.humidity}%</div>
                </div>
              </div>
              <div className="detail-item">
                <Wind className="detail-icon" />
                <div>
                  <div className="detail-label">Wind Speed</div>
                  <div className="detail-value">
                    {weather.wind.speed} {units === "metric" ? "m/s" : "mph"}
                  </div>
                </div>
              </div>
              <div className="detail-item">
                <Droplets className="detail-icon" />
                <div>
                  <div className="detail-label">Pressure</div>
                  <div className="detail-value">{weather.main.pressure} hPa</div>
                </div>
              </div>
              <div className="detail-item">
                <Cloud className="detail-icon" />
                <div>
                  <div className="detail-label">Cloudiness</div>
                  <div className="detail-value">{weather.clouds?.all || 0}%</div>
                </div>
              </div>
            </div>
          </>
        )}

        {dailyForecast.length > 0 && (
          <div className="forecast-container">
            <h3>📅 5-Day Forecast</h3>
            <div className="forecast-grid">
              {dailyForecast.map((day) => (
                <div key={day.dt} className="forecast-item">
                  <div className="forecast-day">
                    {new Date(day.dt_txt).toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
                  </div>
                  <img
                    className="forecast-icon"
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <div className="forecast-temp">
                    {Math.round(day.main.temp)}
                    {units === "metric" ? "°C" : "°F"}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                    {day.weather[0].description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div style={{
        textAlign: "center",
        marginTop: "20px",
        color: "var(--muted)",
        fontSize: "0.9rem"
      }}>
        Search for a city or use your location to see weather
      </div>
    </div>
  );
}
