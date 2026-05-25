import { useState, useEffect, useRef } from 'react'

// ── AQI level config (European AQI scale) ────────────────────────────────────
const AQI_LEVELS = [
  { max: 20,  label: 'Good',        color: '#2D8C4E', dotCls: 'aqi-good',  badge: 'Safe to go out 👍',       emoji: '🌿' },
  { max: 40,  label: 'Fair',        color: '#5BB8F5', dotCls: 'aqi-fair',  badge: 'Air is fairly clean 😊',  emoji: '😊' },
  { max: 60,  label: 'Moderate',    color: '#B8860B', dotCls: 'aqi-mod',   badge: 'Mask recommended 😐',     emoji: '😐' },
  { max: 80,  label: 'Poor',        color: '#E07B39', dotCls: 'aqi-poor',  badge: 'Limit outdoor time 😷',   emoji: '😷' },
  { max: 100, label: 'Very Poor',   color: '#C0392B', dotCls: 'aqi-vpoor', badge: 'Stay indoors ⚠️',         emoji: '⚠️' },
  { max: 999, label: 'Hazardous',   color: '#7B2D8B', dotCls: 'aqi-haz',  badge: 'Hazardous air ☠️',        emoji: '☠️' },
]

function aqiInfo(aqi: number) {
  return AQI_LEVELS.find(l => aqi <= l.max) ?? AQI_LEVELS[AQI_LEVELS.length - 1]
}

export interface WeatherData {
  aqi:       number
  aqiLabel:  string
  aqiColor:  string
  aqiBadge:  string
  aqiEmoji:  string
  aqiDotCls: string
  humidity:  number
  windKmh:   number
  tempC:     number
  pm25:      number
  loading:   boolean
  error:     boolean
}

const DEFAULT_STATE: WeatherData = {
  aqi: 0, aqiLabel: '--', aqiColor: '#2D8C4E', aqiBadge: 'Loading…',
  aqiEmoji: '🌿', aqiDotCls: 'aqi-good',
  humidity: 0, windKmh: 0, tempC: 0, pm25: 0,
  loading: true, error: false,
}

export function useWeather(city: string): WeatherData {
  const [data, setData] = useState<WeatherData>(DEFAULT_STATE)
  const lastCity = useRef('')

  useEffect(() => {
    const trimmed = city.trim()
    if (!trimmed || trimmed === lastCity.current) return
    lastCity.current = trimmed

    let cancelled = false
    setData(d => ({ ...d, loading: true, error: false }))

    async function load() {
      try {
        // 1. Geocode city → lat/lon
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1&language=en&format=json`
        )
        const geo = await geoRes.json()
        const loc = geo.results?.[0]
        if (!loc) throw new Error('City not found')

        const { latitude: lat, longitude: lon } = loc

        // 2. Fetch weather + air-quality in parallel
        const [wxRes, aqRes] = await Promise.all([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`),
          fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5`),
        ])
        const wx = await wxRes.json()
        const aq = await aqRes.json()

        if (cancelled) return

        const aqi      = Math.round(aq.current?.european_aqi ?? 0)
        const pm25     = Math.round((aq.current?.pm2_5 ?? 0) * 10) / 10
        const humidity = Math.round(wx.current?.relative_humidity_2m ?? 0)
        const windKmh  = Math.round(wx.current?.wind_speed_10m ?? 0)
        const tempC    = Math.round(wx.current?.temperature_2m ?? 0)
        const info     = aqiInfo(aqi)

        setData({
          aqi, pm25, humidity, windKmh, tempC,
          aqiLabel:  info.label,
          aqiColor:  info.color,
          aqiBadge:  info.badge,
          aqiEmoji:  info.emoji,
          aqiDotCls: info.dotCls,
          loading: false, error: false,
        })
      } catch {
        if (!cancelled) setData(d => ({ ...d, loading: false, error: true }))
      }
    }

    load()
    return () => { cancelled = true }
  }, [city])

  return data
}
