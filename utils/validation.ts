import type { Installation } from "@/types/solar"

export type InstallationValidation =
  | { valid: true; installation: Installation }
  | { valid: false; message: string }

export function validateInstallation(
  address: string,
  powerText: string,
): InstallationValidation {
  const normalizedAddress = address.trim()
  if (normalizedAddress.length < 5) {
    return { valid: false, message: "Saisis une adresse suffisamment précise." }
  }
  if (normalizedAddress.length > 200) {
    return { valid: false, message: "L’adresse ne peut pas dépasser 200 caractères." }
  }

  const normalizedPower = powerText.trim().replace(",", ".")
  if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(normalizedPower)) {
    return { valid: false, message: "Saisis une puissance en kWc, par exemple 6,5." }
  }

  const powerKwp = Number(normalizedPower)
  if (!Number.isFinite(powerKwp) || powerKwp < 0.1 || powerKwp > 100) {
    return { valid: false, message: "La puissance doit être comprise entre 0,1 et 100 kWc." }
  }

  return {
    valid: true,
    installation: { address: normalizedAddress, powerKwp },
  }
}
