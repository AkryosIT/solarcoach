import type { FormEventHandler } from "react"

interface InstallationFormProps {
  address: string
  powerText: string
  error: string
  ready: boolean
  loading: boolean
  onAddressChange: (value: string) => void
  onPowerChange: (value: string) => void
  onSubmit: FormEventHandler<HTMLFormElement>
}

const inputClassName =
  "h-12 w-full rounded-xl border border-[#dce7df] bg-[#fbfdfb] px-4 font-normal text-[#18392e] outline-none transition placeholder:text-[#9aaa9f] focus:border-[#3d8b6b] focus:ring-4 focus:ring-[#3d8b6b]/10"

export function InstallationForm({
  address,
  powerText,
  error,
  ready,
  loading,
  onAddressChange,
  onPowerChange,
  onSubmit,
}: InstallationFormProps) {
  return (
    <form
      className="rounded-3xl border border-[#e1ebe3] bg-white p-5 shadow-[0_24px_70px_-45px_rgba(27,75,54,0.38)] sm:p-7"
      onSubmit={onSubmit}
    >
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d8476]">
          Votre installation
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#18392e]">
          Préparez votre journée solaire
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#73877b]">
          Quelques informations suffisent pour estimer votre production de demain.
        </p>
      </div>

      <label
        className="mb-5 grid gap-2 text-sm font-semibold text-[#2d4d3e]"
        htmlFor="address"
      >
        Adresse de l’installation
        <input
          autoComplete="street-address"
          className={inputClassName}
          id="address"
          maxLength={200}
          onChange={(event) => onAddressChange(event.target.value)}
          placeholder="Ex. : 12 rue des Lilas, Lyon"
          required
          value={address}
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#2d4d3e]" htmlFor="power">
        Puissance de l’installation
        <span className="relative">
          <input
            className={`${inputClassName} pr-16`}
            id="power"
            inputMode="decimal"
            max="100"
            min="0.1"
            onChange={(event) => onPowerChange(event.target.value)}
            placeholder="Ex. : 6"
            required
            step="0.1"
            value={powerText}
          />
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-[#809187]">
            kWc
          </span>
        </span>
        <span className="text-xs font-normal leading-5 text-[#85958b]">
          Indiquée sur votre installation, de 0,1 à 100 kWc.
        </span>
      </label>

      {error && (
        <p
          className="mt-4 rounded-xl bg-[#fff1ed] px-4 py-3 text-sm text-[#a6402c]"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1f674f] px-5 font-bold text-white shadow-sm transition hover:bg-[#18583f] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#3d8b6b]/40 disabled:cursor-wait disabled:opacity-70"
        disabled={!ready || loading}
        type="submit"
      >
        {loading ? (
          <>
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
            Recherche de la météo…
          </>
        ) : (
          <>
            Calculer
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>
      <details className="mt-4 rounded-xl bg-[#f7f9f4] px-4 py-3 text-xs leading-5 text-[#718278]">
        <summary className="cursor-pointer text-center font-semibold text-[#527261] marker:text-[#2c8066]">
          Comment sont utilisées mes données ?
        </summary>
        <p className="mt-3">
          L’adresse et la puissance sont enregistrées dans ce navigateur pour
          préremplir le formulaire. Au calcul, l’adresse est envoyée à Nominatim
          (OpenStreetMap) pour obtenir les coordonnées, puis seules ces
          coordonnées sont envoyées à Open-Meteo pour la météo. Les requêtes
          partent directement de votre navigateur ; SolarCoach ne stocke pas
          ces données sur son propre serveur. Les services tiers restent soumis
          à leurs propres politiques. Supprimez les données du site dans votre
          navigateur pour effacer les informations enregistrées localement.
        </p>
      </details>
    </form>
  )
}
