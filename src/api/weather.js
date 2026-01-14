const BASE = "https://api.openweathermap.org/data/2.5/weather";
const KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY;

export async function fetchWeatherByCity(city, units = "metric") {
  if (!KEY) throw new Error("Missing OpenWeatherMap API key (VITE_OPENWEATHER_KEY)");

  const q = encodeURIComponent(city);
  const url = `${BASE}?q=${q}&units=${units}&appid=${KEY}`;

  const res = await fetch(url);
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = body?.message || res.statusText || "Unknown error";
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  return body;
}
