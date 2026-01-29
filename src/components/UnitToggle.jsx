export default function UnitToggle({ units, onChange }) {
  return (
    <div className="units">
      <label>
        <input 
          type="radio"
          name="units"
          value="metric"
          checked={units === "metric"}
          onChange={() => onChange("metric")}
        />
        <span>°C</span>
      </label>
      <label>
        <input 
          type="radio"
          name="units"
          value="imperial"
          checked={units === "imperial"}
          onChange={() => onChange("imperial")}
        />
        <span>°F</span>
      </label>
    </div>
  );
}
