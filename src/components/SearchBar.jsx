import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city.trim());  
      setCity("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Search for a city (e.g., London, New York, Tokyo)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        aria-label="City search"
      />
      <button type="submit" aria-label="Search">
        <Search size={18} />
        Search
      </button>
    </form>
  )
}
