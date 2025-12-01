import { useState, useEffect } from 'react'

const API_KEY = 'VOTRE_CLE_API' // Remplacez par votre clé API

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données météo')
      }
      
      const data = await response.json()
      setWeather(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const getLocation = () => {
    setLoading(true)
    setError(null)
    
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        fetchWeather(latitude, longitude)
      },
      (err) => {
        setError('Impossible d\'obtenir votre position. Veuillez autoriser la géolocalisation.')
        setLoading(false)
      }
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  const getWeatherEmoji = (weatherCode) => {
    const weatherEmojis = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    }
    return weatherEmojis[weatherCode] || '🌡️'
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <p>Recherche de votre position...</p>
          <p>Chargement de la météo...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <p>❌ {error}</p>
          <button onClick={getLocation}>Réessayer</button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="weather-card">
        <h1>Météo</h1>
        <p className="location">{weather.name}, {weather.sys.country}</p>
        
        <div className="weather-icon">
          {getWeatherEmoji(weather.weather[0].icon)}
        </div>
        
        <div className="temperature">
          {Math.round(weather.main.temp)}°C
        </div>
        
        <p className="description">
          {weather.weather[0].description}
        </p>
        
        <div className="weather-details">
          <div className="detail-item">
            <span>Ressenti</span>
            <strong>{Math.round(weather.main.feels_like)}°C</strong>
          </div>
          <div className="detail-item">
            <span>Humidité</span>
            <strong>{weather.main.humidity}%</strong>
          </div>
          <div className="detail-item">
            <span>Vent</span>
            <strong>{Math.round(weather.wind.speed * 3.6)} km/h</strong>
          </div>
          <div className="detail-item">
            <span>Visibilité</span>
            <strong>{(weather.visibility / 1000).toFixed(1)} km</strong>
          </div>
        </div>
        
        <button className="refresh-btn" onClick={getLocation}>
          Actualiser
        </button>
      </div>
    </div>
  )
}

export default App
