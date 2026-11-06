import type { GeocodedPlace } from "@/types/solar"

type NominatimResult = {
  lat: unknown
  lon: unknown
  display_name?: unknown
}

let lastRequestAt = 0

export async function getCoordinates(address: string): Promise<GeocodedPlace> {
  const normalizedAddress = address.trim()
  if (!normalizedAddress) {
    throw new Error("Saisis une adresse pour rechercher ses coordonnées.")
  }

  const waitTime = Math.max(0, 1000 - (Date.now() - lastRequestAt))
  if (waitTime > 0) {
    await new Promise((resolve) => setTimeout(resolve, waitTime))
  }
  lastRequestAt = Date.now()

  const params = new URLSearchParams({
    q: normalizedAddress,
    format: "jsonv2",
    limit: "1",
    "accept-language": "fr",
  })
  let response: Response
  try {
    response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      { headers: { Accept: "application/json" } },
    )
  } catch (error) {
    throw new Error(
      "Impossible de contacter le service de recherche d’adresse. Vérifie ta connexion puis réessaie.",
      { cause: error },
    )
  }

  if (!response.ok) {
    throw new Error(
      `La recherche d’adresse est indisponible (HTTP ${response.status}). Réessaie dans un instant.`,
    )
  }

  let results: unknown
  try {
    results = await response.json()
  } catch (error) {
    throw new Error("La réponse du service de recherche d’adresse est illisible.", {
      cause: error,
    })
  }

  if (!Array.isArray(results)) {
    throw new Error("Le service de recherche d’adresse a renvoyé des données invalides.")
  }

  const match = results[0] as NominatimResult | undefined
  const latitude = Number(match?.lat)
  const longitude = Number(match?.lon)

  if (
    !match ||
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("Adresse introuvable. Essaie avec une adresse plus précise.")
  }

  return {
    latitude,
    longitude,
    displayName:
      typeof match.display_name === "string" && match.display_name.trim()
        ? match.display_name
        : normalizedAddress,
  }
}
