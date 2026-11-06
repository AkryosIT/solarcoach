import type { WeatherForecast } from "@/types/solar"

type OpenMeteoResponse = {
  hourly?: {
    time?: string[]
    shortwave_radiation?: (number | null)[]
    cloud_cover?: (number | null)[]
    temperature_2m?: (number | null)[]
  }
  daily?: {
    time?: string[]
  }
}

export async function getSolarForecast(
  latitude: number,
  longitude: number,
): Promise<WeatherForecast[]> {
  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("Les coordonnées géographiques fournies sont invalides.")
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: "shortwave_radiation,cloud_cover,temperature_2m",
    daily: "sunrise",
    forecast_days: "4",
    timezone: "auto",
  })
  let response: Response
  try {
    response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
    )
  } catch (error) {
    throw new Error(
      "Impossible de contacter le service météo. Vérifie ta connexion puis réessaie.",
      { cause: error },
    )
  }

  if (!response.ok) {
    throw new Error(
      `Le service météo est momentanément indisponible (HTTP ${response.status}). Réessaie plus tard.`,
    )
  }

  let forecast: OpenMeteoResponse
  try {
    forecast = (await response.json()) as OpenMeteoResponse
  } catch (error) {
    throw new Error("La réponse du service météo est illisible.", { cause: error })
  }

  const dates = forecast.daily?.time
  const times = forecast.hourly?.time
  const radiation = forecast.hourly?.shortwave_radiation
  const cloudCover = forecast.hourly?.cloud_cover
  const temperature = forecast.hourly?.temperature_2m

  if (
    !dates ||
    dates.length < 4 ||
    !times ||
    !radiation ||
    !cloudCover ||
    !temperature ||
    times.length !== radiation.length ||
    times.length !== cloudCover.length ||
    times.length !== temperature.length
  ) {
    throw new Error("La météo n’a pas fourni assez de données pour les quatre jours.")
  }

  return dates.slice(0, 4).map((date) => {
    const hours = times.flatMap((time, index) => {
      const shortwaveRadiation = radiation[index]
      const hourlyCloudCover = cloudCover[index]
      const hourlyTemperature = temperature[index]
      if (
        !time.startsWith(`${date}T`) ||
        typeof shortwaveRadiation !== "number" ||
        !Number.isFinite(shortwaveRadiation) ||
        typeof hourlyCloudCover !== "number" ||
        !Number.isFinite(hourlyCloudCover) ||
        typeof hourlyTemperature !== "number" ||
        !Number.isFinite(hourlyTemperature)
      ) {
        return []
      }
      return [{
        time,
        shortwaveRadiation: Math.max(0, shortwaveRadiation),
        cloudCover: hourlyCloudCover,
        temperature: hourlyTemperature,
      }]
    })

    if (!hours.length) {
      throw new Error(`Aucune prévision horaire n’est disponible pour le ${date}.`)
    }

    return { date, hours }
  })
}
