# Weather Dashboard - Frontend

A modern React weather application featuring real-time weather data, 5-day forecasts, and geolocation support with a clean, responsive interface.

## Overview

This is a client-side weather application built with React 18 and Vite. The project demonstrates modern frontend development practices including custom React hooks, API integration, browser geolocation, local storage persistence, and responsive design. The app integrates with the OpenWeatherMap API to provide accurate weather information for any city worldwide or the user's current location. The clean, card-based UI features gradient accents, smooth transitions, and comprehensive weather metrics.

## Live Demo

**Live Site:** [Your deployed frontend URL]  
**GitHub Repository:** [Your repository URL]

## Features

### Core Functionality
- **City Search** - Search weather by city name with autocomplete-ready input
- **Geolocation** - One-click access to local weather using browser location
- **Unit Toggle** - Switch between Celsius and Fahrenheit
- **Current Weather** - Real-time temperature, conditions, and detailed metrics
- **5-Day Forecast** - Daily predictions with icons and descriptions
- **Data Persistence** - Remembers last city and preferred units

### Weather Display
- **Temperature Display** - Large, gradient-styled temperature with degree symbol
- **Weather Icons** - OpenWeatherMap icons for visual representation
- **Feels Like** - Apparent temperature based on conditions
- **Detailed Metrics:**
  - Humidity percentage
  - Wind speed (m/s or mph)
  - Atmospheric pressure (hPa)
  - Cloud coverage percentage

### User Experience
- **Loading States** - Visual feedback during API calls
- **Error Messages** - User-friendly error handling with styled alerts
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Accessibility** - ARIA labels and semantic HTML
- **Modern UI** - Card-based layout with gradients and shadows
- **Smooth Animations** - Transitions and hover effects

### Technical Features
- **Custom Hook** - useWeather for all weather logic and state
- **LocalStorage** - Persistent preferences across sessions
- **Browser APIs** - Geolocation and storage integration
- **Icon Library** - Lucide React for clean, consistent icons
- **CSS Variables** - Easy theming and color customization

## Architecture

```
┌─────────────────────────────────────┐
│         App Component               │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Header                       │ │
│  │  - Title                      │ │
│  │  - Location display           │ │
│  │  - UnitToggle component       │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  SearchBar Component          │ │
│  │  - City input                 │ │
│  │  - Search button              │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Location Button              │ │
│  │  - Geolocation trigger        │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Status Display               │ │
│  │  - Loading state              │ │
│  │  - Error messages             │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Weather Display              │ │
│  │  - Current conditions         │ │
│  │  - Weather details grid       │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Forecast Display             │ │
│  │  - 5-day forecast grid        │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
         │
         │ useWeather Hook
         │
         ▼
┌─────────────────────────────────────┐
│     API Layer (api/weather.js)      │
│     - fetchWeatherByCity            │
│     - fetchWeatherByCoords          │
│     - fetchForecastByCity           │
└────────────┬────────────────────────┘
             │
             │ Fetch API
             ▼
┌─────────────────────────────────────┐
│      OpenWeatherMap API             │
│      - Current Weather              │
│      - 5-Day Forecast               │
└─────────────────────────────────────┘
```

### Component Hierarchy

```
App.jsx (Main Component)
  ├── UnitToggle.jsx (Temperature units)
  ├── SearchBar.jsx (City search)
  └── useWeather.js (Custom hook)
      └── api/weather.js (API calls)
```

### State Flow

1. **User Action** - Search city or click location button
2. **State Update** - useWeather hook updates city or coords
3. **Effect Trigger** - useEffect detects state change
4. **API Call** - Fetches data from OpenWeatherMap
5. **State Update** - weather and forecast state updated
6. **Re-render** - React updates UI with new data
7. **Persistence** - Save to localStorage

### Custom Hook: useWeather

**Purpose:** Centralize all weather-related state and logic

**State:**
```javascript
{
  city: string,              // Current city name
  coords: {lat, lon},        // Geolocation coordinates
  units: "metric" | "imperial",
  weather: object,           // Current weather data
  forecast: array,           // Forecast list
  status: string,            // "idle" | "loading" | "success" | "error"
  error: string | null       // Error message
}
```

**Methods:**
```javascript
{
  searchCity(city),          // Search weather by city
  setUnits(units),           // Change temperature units
  useLocation()              // Get weather by geolocation
}
```

## Tech Stack

### Core Technologies
- **React 18.3** - UI library with concurrent features
- **JavaScript ES6+** - Modern JavaScript features
- **Vite 5** - Fast build tool and dev server
- **CSS3** - Custom styling with variables and Grid

### React Patterns
- **Custom Hooks** - useWeather for logic separation
- **Controlled Components** - Form inputs managed by state
- **useEffect** - Side effects for API calls and persistence
- **useState** - Local and global state management
- **Conditional Rendering** - Dynamic UI based on state

### External APIs
- **OpenWeatherMap API** - Weather data provider
  - Current Weather Data (2.5)
  - 5-Day / 3-Hour Forecast (2.5)

### Browser APIs
- **Fetch API** - HTTP requests
- **Geolocation API** - User location access
- **localStorage API** - Data persistence

### UI Libraries
- **Lucide React** - Icon components
  - Search, Navigation, MapPin, Cloud, Wind, etc.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key (free)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API Key**
   
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for free account
   - Go to API Keys section
   - Copy your API key

4. **Create environment file**
   
   Create `.env` in project root:
   ```env
   VITE_OPENWEATHERMAP_KEY=your_api_key_here
   ```

   **Important:** Must start with `VITE_` prefix

5. **Start development server**
   ```bash
   npm run dev
   ```

   App runs on `http://localhost:5173`

6. **Build for production**
   ```bash
   npm run build
   ```

   Output in `dist/` directory

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your repository
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variable**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_OPENWEATHERMAP_KEY` = `your_key`
   - Redeploy

4. **Automatic Deployments**
   - Push to main branch triggers deploy
   - Pull requests get preview URLs

### Netlify

1. **Via Git:**
   - Connect repository on Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable in settings

2. **Via CLI:**
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod
   ```

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.js**
   ```javascript
   export default {
     base: '/weather-dashboard/',
   }
   ```

3. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

### Other Platforms
- **Render** - Static site
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **Surge.sh**

## Project Structure

```
weather-dashboard/
├── public/
│   ├── vite.svg              # Vite logo
│   └── weather.svg           # App icon
│
├── src/
│   ├── api/
│   │   └── weather.js        # OpenWeatherMap API functions
│   │
│   ├── components/
│   │   ├── SearchBar.jsx     # City search component
│   │   └── UnitToggle.jsx    # Temperature unit toggle
│   │
│   ├── hooks/
│   │   └── useWeather.js     # Custom weather hook
│   │
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # React DOM entry point
│   └── styles.css            # Global styles
│
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js          # Linting rules
└── .env                      # Environment variables
```

## Component Documentation

### App.jsx

Main application component that orchestrates all features.

**Responsibilities:**
- Layout structure
- State management via useWeather
- Rendering all child components
- Handling user interactions
- Processing forecast data

**Key Functions:**
```javascript
function getDailyForecast(list) {
  // Filters 3-hour forecast to daily summaries
  // Returns first 5 unique days
}

const handleUseLocation = () => {
  setUsingLocation(true);
  useLocation();
}

const handleSearch = (city) => {
  setUsingLocation(false);
  searchCity(city);
}
```

**State:**
- `usingLocation` - Boolean to show appropriate loading message

### SearchBar.jsx

Controlled form component for city search.

**Props:**
```typescript
interface SearchBarProps {
  onSearch: (city: string) => void;
}
```

**Features:**
- Controlled input with local state
- Form submission handling
- Whitespace trimming
- Empty input prevention
- Clears after successful search

**Implementation:**
```javascript
function handleSubmit(e) {
  e.preventDefault();
  if (city.trim() !== "") {
    onSearch(city.trim());
    setCity("");
  }
}
```

### UnitToggle.jsx

Radio button group for temperature unit selection.

**Props:**
```typescript
interface UnitToggleProps {
  units: "metric" | "imperial";
  onChange: (units: string) => void;
}
```

**Features:**
- Radio button group
- Controlled by parent state
- Visual feedback for selected unit
- Accessible with proper labels

### useWeather.js

Custom hook managing all weather-related state and logic.

**Purpose:**
- Centralize weather state
- Handle API calls
- Manage loading/error states
- Persist preferences
- Support geolocation

**State Variables:**
```javascript
const [city, setCity] = useState("London");
const [coords, setCoords] = useState(null);
const [units, setUnits] = useState("metric");
const [weather, setWeather] = useState(null);
const [forecast, setForecast] = useState([]);
const [status, setStatus] = useState("idle");
const [error, setError] = useState(null);
```

**Effect Dependencies:**
```javascript
useEffect(() => {
  // Runs when city, coords, or units change
  loadWeather();
}, [city, coords, units]);
```

**Return Value:**
```javascript
return {
  weather,        // Current weather object
  forecast,       // Forecast array
  status,         // Loading state
  error,          // Error message
  units,          // Current units
  searchCity,     // Function
  setUnits,       // Function
  useLocation     // Function
};
```

## API Integration

### api/weather.js

Handles all OpenWeatherMap API calls.

**Functions:**

**fetchWeatherByCity(city, units)**
```javascript
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${KEY}`
);
```

**fetchWeatherByCoords(lat, lon, units)**
```javascript
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`
);
```

**fetchForecastByCity(city, units)**
```javascript
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${KEY}`
);
```

**Error Handling:**
```javascript
if (!res.ok) {
  const msg = body?.message || res.statusText;
  const err = new Error(msg);
  err.status = res.status;
  throw err;
}
```

### API Response Structure

**Current Weather:**
```javascript
{
  name: "London",
  sys: { country: "GB" },
  main: {
    temp: 15,
    feels_like: 14,
    humidity: 65,
    pressure: 1013,
    temp_min: 14,
    temp_max: 16
  },
  weather: [{
    id: 801,
    main: "Clouds",
    description: "few clouds",
    icon: "02d"
  }],
  wind: {
    speed: 4.5,
    deg: 180
  },
  clouds: { all: 20 }
}
```

**5-Day Forecast:**
```javascript
{
  list: [
    {
      dt: 1234567890,
      dt_txt: "2025-02-15 12:00:00",
      main: { temp: 15, humidity: 60 },
      weather: [{ icon: "02d", description: "few clouds" }]
    },
    // ... 39 more 3-hour intervals
  ]
}
```

## Styling

### CSS Architecture

**Global Variables:**
```css
:root {
  --bg: #f6f8fb;           /* Background color */
  --card: #ffffff;          /* Card background */
  --text: #111827;          /* Primary text */
  --muted: #6b7280;         /* Secondary text */
  --accent: #2563eb;        /* Brand color */
  --accent-hover: #1d4ed8;  /* Hover state */
  --border: #e5e7eb;        /* Border color */
  --success: #10b981;       /* Success messages */
  --error: #ef4444;         /* Error messages */
}
```

**Layout System:**
```css
.app {
  max-width: 520px;
  margin: 40px auto;
  padding: 20px;
}

.card {
  background: var(--card);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
```

**Responsive Breakpoints:**
```css
@media (max-width: 600px) {
  /* Tablet styles */
}

@media (max-width: 400px) {
  /* Mobile styles */
}
```

**Gradient Effects:**
```css
h1 {
  background: linear-gradient(135deg, var(--accent), #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Animations:**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading::after {
  animation: spin 1s linear infinite;
}
```

### Component Styles

**Weather Display:**
- Large gradient temperature
- Flexbox layout with icon
- Responsive flex direction

**Forecast Grid:**
- CSS Grid (5 columns desktop, 3 tablet, 2 mobile)
- Card items with hover effects
- Centered content

**Form Elements:**
- Custom styled inputs and buttons
- Focus states with box-shadow
- Smooth transitions

## LocalStorage Integration

### Saved Data

**Keys:**
- `weather:city` - Last searched city
- `weather:units` - Preferred units ("metric" or "imperial")

**Implementation:**
```javascript
// Save on change
localStorage.setItem("weather:city", city);
localStorage.setItem("weather:units", units);

// Load on mount
const [city, setCity] = useState(
  localStorage.getItem("weather:city") || "London"
);
const [units, setUnits] = useState(
  localStorage.getItem("weather:units") || "metric"
);
```

## Geolocation Implementation

### Permission Handling

```javascript
function useLocation() {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      });
      setCity(""); // Clear city search
    },
    (err) => {
      setError("Location permission denied");
    }
  );
}
```

### Browser Compatibility

- Chrome ✓
- Firefox ✓
- Safari ✓ (requires HTTPS)
- Edge ✓

**Note:** Geolocation requires HTTPS in production.

## Error Handling

### API Errors

**Types:**
- City not found (404)
- Invalid API key (401)
- Rate limit exceeded (429)
- Network errors

**Display:**
```jsx
{status === "error" && (
  <div className="error-message" role="alert">
    ⚠️ {error}
  </div>
)}
```

### Geolocation Errors

**Types:**
- Permission denied
- Position unavailable
- Timeout
- Not supported

**User Feedback:**
Clear error messages explaining the issue and alternatives.

## Performance Optimization

### Current Optimizations

1. **Vite Build** - Fast HMR and optimized builds
2. **LocalStorage** - Reduces API calls on reload
3. **Conditional Rendering** - Only renders necessary components
4. **Code Splitting** - Automatic by Vite

### Recommended Improvements

- [ ] Debounce search input (500ms delay)
- [ ] Memoize forecast processing with useMemo
- [ ] Implement React.lazy for code splitting
- [ ] Add service worker for offline support
- [ ] Cache API responses with expiry time
- [ ] Optimize images (use WebP)
- [ ] Add skeleton loaders for better UX

## Accessibility

### Implemented Features

- **Semantic HTML** - Proper element usage
- **ARIA Labels** - aria-label on inputs and buttons
- **ARIA Roles** - role="alert" for errors
- **Keyboard Navigation** - All interactive elements accessible
- **Focus States** - Visible focus indicators
- **Alt Text** - Descriptive text for weather icons

### Testing Checklist

- [ ] Tab navigation works
- [ ] Screen reader announces errors
- [ ] Form labels properly associated
- [ ] Color contrast meets WCAG AA
- [ ] Interactive elements have focus states

## Browser Compatibility

### Supported Features

- **ES6+** - Arrow functions, async/await, destructuring
- **Fetch API** - All modern browsers
- **Geolocation** - All modern browsers (HTTPS required)
- **localStorage** - All modern browsers
- **CSS Grid** - All modern browsers
- **CSS Variables** - All modern browsers

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS 14+, Android 5+)

## Troubleshooting

### Development Issues

**Issue:** API key not working

**Solutions:**
- Verify key in `.env` starts with `VITE_`
- Restart dev server after adding key
- Check key is valid on OpenWeatherMap
- Ensure no spaces in .env file

---

**Issue:** City search returns 404

**Solutions:**
- Check spelling of city name
- Try with country code: "London,UK"
- Use official city names
- Verify city exists in OpenWeatherMap database

---

**Issue:** Geolocation not working

**Solutions:**
- Allow location permission in browser
- Check browser location settings
- Requires HTTPS in production
- Try different browser if blocked

---

**Issue:** Weather not persisting

**Solutions:**
- Check localStorage not disabled
- Verify localStorage code syntax
- Clear cache and try again
- Check browser privacy settings

### Production Issues

**Issue:** Environment variable not found

**Solutions:**
- Add `VITE_OPENWEATHERMAP_KEY` in deployment platform
- Rebuild and redeploy
- Check capitalization matches exactly
- Verify no extra spaces in value

---

**Issue:** CORS errors

**Solutions:**
- OpenWeatherMap doesn't require CORS config
- Check API key is valid
- Verify using correct API endpoints
- Check network tab for actual error

## Testing

### Manual Testing

**Search Functionality:**
1. Enter valid city name
2. Click search or press Enter
3. Verify weather loads
4. Check all metrics display
5. Confirm forecast appears

**Geolocation:**
1. Click "Use my current location"
2. Allow permission
3. Verify weather loads for location
4. Check city name updates

**Unit Toggle:**
1. Click °C button
2. Verify temperature updates
3. Click °F button
4. Verify all units change
5. Reload page, verify persists

**Error Handling:**
1. Search invalid city
2. Verify error message
3. Deny location permission
4. Verify error message
5. Check messages are user-friendly

### Automated Testing (Future)

**Framework:** Vitest + React Testing Library

```bash
npm install -D vitest @testing-library/react
```

**Example test:**
```javascript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByLabelText('City search')).toBeInTheDocument();
  });
});
```

## Future Enhancements

- [ ] Hourly forecast (24-hour view)
- [ ] Multiple city comparison
- [ ] Favorite cities list
- [ ] Weather alerts and warnings
- [ ] Air quality index (AQI)
- [ ] UV index display
- [ ] Sunrise/sunset times
- [ ] Moon phase information
- [ ] Historical weather data
- [ ] Weather maps overlay
- [ ] Dark mode toggle
- [ ] Multiple language support
- [ ] Voice search integration
- [ ] Share weather functionality
- [ ] PWA with offline support
- [ ] Push notifications for alerts

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Follow existing code style
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- **Weather Data:** [OpenWeatherMap](https://openweathermap.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Built with:** [React](https://react.dev/) & [Vite](https://vitejs.dev/)

## Contact

**Harold Durant**  
Email: [Your Email]  
GitHub: [@ROIEngineer](https://github.com/ROIEngineer)  
Portfolio: [Your Portfolio URL]

---

Built with ❤️ using React, Vite, and OpenWeatherMap API
