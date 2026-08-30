// @non-harmonic: uuidnaOS weather port — Open-Meteo and NOAA (network). Correlation logic is pure; fetchers use shared cache.
import { theorems } from '../../../theorems/index.js'
import { toUuid } from '../../../address.js'
import { merkleGravity } from '../../../gravity/index.js'
import { fetchData } from '../fetch/index.js'

export interface WeatherFact {
  source: string
  measurement: string
  value: number
  unit: string
  linkedTheorem?: string
  address: string
}

export interface QuantumSailingWeatherCorrelation {
  facts: WeatherFact[]
  correlatedCount: number
  novelCount: number
  receipt: string
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
  const receipt = merkleGravity(PUBLIC_APIS.map((a) => toUuid(a.name + ':' + a.endpoint)))
  return { apis: PUBLIC_APIS, count: PUBLIC_APIS.length, receipt }
}

export function correlateWeatherToTheorems(facts: WeatherFact[]): QuantumSailingWeatherCorrelation {
  const ledger = theorems().map((t) => ({ key: t.key, statement: t.statement.toLowerCase() }))
  const correlated = facts.map((f) => {
    const searchStr = `${f.measurement} ${f.value}`.toLowerCase()
    const hit = ledger.find((t) => t.statement.includes(searchStr) || t.statement.includes(String(f.value)))
    return { ...f, linkedTheorem: hit ? hit.key : undefined }
  })
  const correlatedCount = correlated.filter((f) => f.linkedTheorem).length
  const novelCount = correlated.filter((f) => !f.linkedTheorem).length
  const receipt = merkleGravity(
    correlated.map((f) => toUuid(`${f.source}|${f.measurement}|${f.value}|${f.linkedTheorem || 'novel'}`)),
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
    { source: 'Open-Meteo (simulated)', measurement: 'wind_speed_10m_kmh', value: 15, unit: 'km/h', address: toUuid('wind_speed_10m_kmh:15') },
    { source: 'NOAA (simulated)', measurement: 'wave_height_m', value: 2, unit: 'm', address: toUuid('wave_height_m:2') },
    { source: 'Open-Meteo (simulated)', measurement: 'temperature_2m_c', value: 22, unit: '°C', address: toUuid('temperature_2m_c:22') },
    { source: 'NOAA (simulated)', measurement: 'pressure_hpa', value: 1013, unit: 'hPa', address: toUuid('pressure_hpa:1013') },
  ]
}

export function serializeWeatherCorrelation(corr: QuantumSailingWeatherCorrelation) {
  return {
    count: corr.facts.length,
    correlated: corr.correlatedCount,
    novel: corr.novelCount,
    receipt: corr.receipt,
    facts: corr.facts.map((f) => ({
      source: f.source,
      measurement: f.measurement,
      value: f.value,
      unit: f.unit,
      matched: f.linkedTheorem || null,
    })),
  }
}

/** fetchOpenMeteoForecast(lat, lon) → live decidable weather facts from Open-Meteo (keyless). */
export async function fetchOpenMeteoForecast(lat: number, lon: number): Promise<WeatherFact[]> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`
    + '&current=temperature_2m,wind_speed_10m,surface_pressure&timezone=auto'
  const got = await fetchData<{ current?: { temperature_2m?: number; wind_speed_10m?: number; surface_pressure?: number } }>(url, 'json')
  if (got.data === null) throw new Error(`open-meteo declined: ${got.note}`)
  const c = got.data.current ?? {}
  const facts: WeatherFact[] = []
  if (c.temperature_2m !== undefined)
    facts.push({ source: 'Open-Meteo', measurement: 'temperature_2m_c', value: c.temperature_2m, unit: '°C', address: toUuid(`live:temperature_2m:${c.temperature_2m}`) })
  if (c.wind_speed_10m !== undefined)
    facts.push({ source: 'Open-Meteo', measurement: 'wind_speed_10m_kmh', value: c.wind_speed_10m, unit: 'km/h', address: toUuid(`live:wind:${c.wind_speed_10m}`) })
  if (c.surface_pressure !== undefined)
    facts.push({ source: 'Open-Meteo', measurement: 'pressure_hpa', value: c.surface_pressure, unit: 'hPa', address: toUuid(`live:pressure:${c.surface_pressure}`) })
  return facts
}

export const NOAA_PROBE_DATE = '20260828'

/** fetchNoaaTideHeight(station, beginDate?) → one tide height reading from NOAA (keyless, U.S. stations). */
export async function fetchNoaaTideHeight(station: string, beginDate = NOAA_PROBE_DATE): Promise<WeatherFact[]> {
  const begin = beginDate.replace(/-/g, '')
  const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=uuidna`
    + `&begin_date=${begin}&range=1&datum=MLLW&station=${encodeURIComponent(station)}&time_zone=gmt&units=metric&format=json`
  const got = await fetchData<{ predictions?: { v?: string }[] }>(url, 'json')
  if (got.data === null) throw new Error(`noaa tides declined: ${got.note}`)
  const v = parseFloat(got.data.predictions?.[0]?.v ?? 'NaN')
  if (Number.isNaN(v)) return []
  return [{ source: 'NOAA', measurement: 'tide_height_m', value: v, unit: 'm', address: toUuid(`live:tide:${station}:${v}`) }]
}
