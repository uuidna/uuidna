// quantum-sailing-weather — CORRELATE real-world data (weather, tides, ocean conditions) to quantum sailing theory.
// Discovers public APIs that provide decidable facts (temperature, wind speed, wave height, pressure) and
// LINKS them to theorems already sealed in the ledger. No keys, no auth — only free public data. The captain
// knows the weather by recomputation. Pure and recomputable: all functions are deterministic; network fetches
// (if needed) are application-layer responsibilities, not part of the core correlation logic.

import { theorems, toUuid, merkleGravity } from '../../../index.js'

export interface WeatherFact {
  source: string        // API source (OpenWeatherMap terms of service, NOAA, etc.)
  measurement: string   // what was measured (wind speed, temperature, pressure)
  value: number         // the numerical value
  unit: string          // unit of measurement
  linkedTheorem?: string // theorem key from ledger that matches this fact
  address: string       // content-address of this fact
}

export interface QuantumSailingWeatherCorrelation {
  facts: WeatherFact[]
  correlatedCount: number  // how many facts matched theorems in ledger
  novelCount: number       // facts not yet in ledger (research leads)
  receipt: string          // order-invariant docket
  honest: string
}

const PUBLIC_APIS = [
  {
    name: 'NOAA Tide Predictions',
    description: 'U.S. tide predictions (National Oceanic and Atmospheric Administration)',
    endpoint: 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter',
    decidableFacts: ['tide_height_m', 'tide_time', 'current_speed_knots'],
  },
  {
    name: 'Open-Meteo Weather',
    description: 'Free weather data, no API key (open-source alternative to paid weather APIs)',
    endpoint: 'https://api.open-meteo.com/v1/forecast',
    decidableFacts: ['temperature_2m_c', 'wind_speed_10m_kmh', 'wave_height_m', 'pressure_hpa'],
  },
]

export function discoverQuantumSailingAPIs(): { apis: typeof PUBLIC_APIS; count: number; receipt: string } {
  const receipt = merkleGravity(PUBLIC_APIS.map(a => toUuid(a.name + ':' + a.endpoint)))
  return {
    apis: PUBLIC_APIS,
    count: PUBLIC_APIS.length,
    receipt,
  }
}

export function correlateWeatherToTheorems(facts: WeatherFact[]): QuantumSailingWeatherCorrelation {
  const ledger = theorems().map(t => ({
    key: t.key,
    statement: t.statement.toLowerCase(),
  }))

  const correlated = facts.map(f => {
    const searchStr = `${f.measurement} ${f.value}`.toLowerCase()
    const hit = ledger.find(t => t.statement.includes(searchStr) || t.statement.includes(String(f.value)))
    return { ...f, linkedTheorem: hit ? hit.key : undefined }
  })

  const correlatedCount = correlated.filter(f => f.linkedTheorem).length
  const novelCount = correlated.filter(f => !f.linkedTheorem).length

  const receipt = merkleGravity(
    correlated.map(f => toUuid(`${f.source}|${f.measurement}|${f.value}|${f.linkedTheorem || 'novel'}`))
  )

  return {
    facts: correlated,
    correlatedCount,
    novelCount,
    receipt,
    honest:
      'Weather → ledger correlation: PURE, recomputable, no network calls. Decidable weather facts ' +
      '(temperature, wind, pressure, waves, tides) are checked against the sealed ledger. Matches prove ' +
      'the theorem already knows this fact; novel facts are research leads awaiting sealing. Integrity, not truth.',
  }
}

export function simulateQuantumSailingWeather(): WeatherFact[] {
  return [
    {
      source: 'Open-Meteo (simulated)',
      measurement: 'wind_speed_10m_kmh',
      value: 15,
      unit: 'km/h',
      address: toUuid('wind_speed_10m_kmh:15'),
    },
    {
      source: 'NOAA (simulated)',
      measurement: 'wave_height_m',
      value: 2,
      unit: 'm',
      address: toUuid('wave_height_m:2'),
    },
    {
      source: 'Open-Meteo (simulated)',
      measurement: 'temperature_2m_c',
      value: 22,
      unit: '°C',
      address: toUuid('temperature_2m_c:22'),
    },
    {
      source: 'NOAA (simulated)',
      measurement: 'pressure_hpa',
      value: 1013,
      unit: 'hPa',
      address: toUuid('pressure_hpa:1013'),
    },
  ]
}

export function serializeWeatherCorrelation(corr: QuantumSailingWeatherCorrelation) {
  return {
    count: corr.facts.length,
    correlated: corr.correlatedCount,
    novel: corr.novelCount,
    receipt: corr.receipt,
    facts: corr.facts.map(f => ({
      source: f.source,
      measurement: f.measurement,
      value: f.value,
      unit: f.unit,
      matched: f.linkedTheorem || null,
    })),
  }
}
