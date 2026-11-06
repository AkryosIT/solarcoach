import type {
  Installation,
  SolarProduction,
  WeatherForecast,
  ConsumptionRecommendation,
} from "@/types/solar"
import { calculateSolarProduction } from "@/services/SolarCalculator"

function buildRecommendations(window: string): ConsumptionRecommendation[] {
  const isAvailable = !window.startsWith("Aucune")
  const timing = isAvailable
    ? `Programme-le si possible entre ${window}, quand la production est la plus intéressante.`
    : "La production prévue est faible : reporte si possible cet usage à une journée plus ensoleillée."

  return [
    { appliance: "Recharge du véhicule", icon: "🚗", advice: timing },
    { appliance: "Lave-vaisselle", icon: "🍽️", advice: isAvailable ? `Lance-le pendant la plage ${window}, ou programme son départ à ce moment-là.` : timing },
    { appliance: "Machine à laver", icon: "🧺", advice: isAvailable ? `Décale le cycle pour qu’il fonctionne pendant la plage ${window}.` : timing },
  ]
}

export function estimateSolarProduction(
  forecast: WeatherForecast,
  location: string,
  installation: Installation,
): SolarProduction {
  const calculation = calculateSolarProduction({
    powerKwp: installation.powerKwp,
    hours: forecast.hours,
  })
  const bestWindow = calculation.selfConsumptionWindow

  return {
    date: forecast.date,
    location,
    score: calculation.solarScore,
    productionRange: calculation.productionRange,
    peakHour: calculation.peakProductionHour,
    bestWindow,
    recommendations: buildRecommendations(bestWindow),
  }
}

export function formatForecastDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number)
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(year, month - 1, day))
}

export function formatForecastDay(date: string, index: number): string {
  if (index === 0) return "Aujourd’hui"
  if (index === 1) return "Demain"

  const [year, month, day] = date.split("-").map(Number)
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
  }).format(new Date(year, month - 1, day))
}

export function formatKwh(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value)
}
