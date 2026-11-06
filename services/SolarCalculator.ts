import type { ForecastHour } from "@/types/solar"

const PERFORMANCE_RATIO = 0.82
const TEMPERATURE_COEFFICIENT = 0.004
const REFERENCE_DAILY_YIELD_KWH_PER_KWP = 5.5
const MAX_CLOUD_SCORE_PENALTY = 0.2
const MIN_TEMPERATURE_FACTOR = 0.7
const SELF_CONSUMPTION_THRESHOLD = 0.45
const PRODUCTION_UNCERTAINTY = 0.3

export interface SolarCalculatorInput {
  /** Installed peak power, in kWp. */
  powerKwp: number
  /** Hourly forecast readings; irradiance is in W/m². */
  hours: ForecastHour[]
}

export interface SolarCalculatorResult {
  /** Central model estimate for the forecast day, in kWh. */
  estimatedProductionKwh: number
  /** Indicative production interval accounting for model uncertainty, in kWh. */
  productionRange: {
    minKwh: number
    maxKwh: number
  }
  /** Solar outlook score from 0 to 100. */
  solarScore: number
  /** Local hour at which estimated production is highest. */
  peakProductionHour: string
  /** Contiguous period where production reaches the defined peak threshold. */
  selfConsumptionWindow: string
}

function formatHour(hour: number): string {
  return `${String(hour % 24).padStart(2, "0")}:00`
}

function getHour(time: string): number {
  const match = time.match(/T(\d{2}):\d{2}/)
  if (!match) {
    throw new Error("Une prévision contient une heure invalide.")
  }
  return Number(match[1])
}

/**
 * MVP formulas (each forecast entry represents one hour):
 * - Temperature factor = max(0.7, 1 - 0.004 * max(0, temperature - 25°C)).
 * - Hourly energy (kWh) = max(0, irradiance in W/m²) / 1000 * power in kWp
 *   * 0.82 performance ratio * temperature factor.
 * - Indicative production range = central estimate * (1 ± 30%). This is a
 *   configurable MVP uncertainty margin, not a statistically calibrated
 *   confidence interval; actual orientation, tilt and shading may exceed it.
 * - Yield score = min(100, daily kWh / kWp / 5.5 kWh/kWp * 100).
 * - Cloud score factor = 1 - 0.2 * irradiance-weighted cloud cover / 100.
 *   Cloud cover adjusts only the score: Open-Meteo's shortwave radiation
 *   already reflects forecast cloud conditions, so adjusting energy again
 *   would count their effect twice.
 * - Solar score = round(yield score * cloud score factor).
 * - Self-consumption window uses contiguous hours at or above 45% of peak.
 */
export function calculateSolarProduction({
  powerKwp,
  hours,
}: SolarCalculatorInput): SolarCalculatorResult {
  if (!Number.isFinite(powerKwp) || powerKwp <= 0) {
    throw new Error("La puissance de l’installation doit être supérieure à 0 kWc.")
  }
  if (!Array.isArray(hours) || hours.length === 0) {
    throw new Error("Aucune prévision horaire n’est disponible pour le calcul.")
  }

  const hourlyProduction = hours.map((hour, index) => {
    if (
      !hour ||
      typeof hour.time !== "string" ||
      !Number.isFinite(hour.shortwaveRadiation) ||
      !Number.isFinite(hour.cloudCover) ||
      hour.cloudCover < 0 ||
      hour.cloudCover > 100 ||
      !Number.isFinite(hour.temperature)
    ) {
      throw new Error(`Les données météo de l’heure ${index + 1} sont invalides.`)
    }

    getHour(hour.time)
    const irradiance = Math.max(0, hour.shortwaveRadiation)
    const temperatureFactor = Math.max(
      MIN_TEMPERATURE_FACTOR,
      1 - TEMPERATURE_COEFFICIENT * Math.max(0, hour.temperature - 25),
    )

    return (irradiance / 1000) * powerKwp * PERFORMANCE_RATIO * temperatureFactor
  })

  const estimatedProductionKwh = hourlyProduction.reduce(
    (total, value) => total + value,
    0,
  )
  const productionRange = {
    minKwh: Math.max(0, estimatedProductionKwh * (1 - PRODUCTION_UNCERTAINTY)),
    maxKwh: estimatedProductionKwh * (1 + PRODUCTION_UNCERTAINTY),
  }
  const yieldPerKwp = estimatedProductionKwh / powerKwp
  const yieldScore = Math.min(
    100,
    (yieldPerKwp / REFERENCE_DAILY_YIELD_KWH_PER_KWP) * 100,
  )
  const totalIrradiance = hours.reduce(
    (total, hour) => total + Math.max(0, hour.shortwaveRadiation),
    0,
  )
  const weightedCloudCover = totalIrradiance > 0
    ? hours.reduce(
        (total, hour) =>
          total + Math.max(0, hour.shortwaveRadiation) * hour.cloudCover,
        0,
      ) / totalIrradiance
    : hours.reduce((total, hour) => total + hour.cloudCover, 0) / hours.length
  const cloudScoreFactor = 1 - MAX_CLOUD_SCORE_PENALTY * (weightedCloudCover / 100)
  const solarScore = Math.round(yieldScore * cloudScoreFactor)

  const peakIndex = hourlyProduction.indexOf(Math.max(...hourlyProduction))
  const peakProduction = hourlyProduction[peakIndex]
  const peakProductionHour = peakProduction > 0
    ? formatHour(getHour(hours[peakIndex].time))
    : "Aucun pic prévu"

  let selfConsumptionWindow = "Aucune plage de production notable"
  if (peakProduction > 0) {
    const threshold = peakProduction * SELF_CONSUMPTION_THRESHOLD
    let start = peakIndex
    let end = peakIndex

    while (start > 0 && hourlyProduction[start - 1] >= threshold) start -= 1
    while (
      end < hourlyProduction.length - 1 &&
      hourlyProduction[end + 1] >= threshold
    ) {
      end += 1
    }

    selfConsumptionWindow =
      `${formatHour(getHour(hours[start].time))} – ` +
      `${formatHour(getHour(hours[end].time) + 1)}`
  }

  return {
    estimatedProductionKwh,
    productionRange,
    solarScore,
    peakProductionHour,
    selfConsumptionWindow,
  }
}
