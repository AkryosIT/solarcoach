import type { Installation } from "@/types/solar"

const STORAGE_KEY = "solarcoach.installation.v1"

export function loadInstallation(): Installation | null {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    const value: unknown = JSON.parse(stored)
    if (
      typeof value === "object"
      && value !== null
      && "address" in value
      && typeof value.address === "string"
      && "powerKwp" in value
      && typeof value.powerKwp === "number"
    ) {
      return { address: value.address, powerKwp: value.powerKwp }
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return null
}

export function saveInstallation(installation: Installation): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(installation))
}
