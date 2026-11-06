"use client"

import { useEffect, useState, type FormEvent } from "react"
import { getCoordinates } from "@/services/GeocodingService"
import { getSolarForecast } from "@/services/OpenMeteoService"
import type { Installation, SolarProduction } from "@/types/solar"
import { formatForecastDate, formatKwh, estimateSolarProduction } from "@/utils/solar"
import { loadInstallation, saveInstallation } from "@/utils/storage"
import { validateInstallation } from "@/utils/validation"
import { InstallationForm } from "@/components/InstallationForm"
import { SiteHeader } from "@/components/SiteHeader"
import { ForecastDaySelector } from "@/components/ForecastDaySelector"
import { SimulatedSavingsCounter } from "@/components/SimulatedSavingsCounter"

export function SolarCoach() {
  const [address, setAddress] = useState("")
  const [powerText, setPowerText] = useState("")
  const [installation, setInstallation] = useState<Installation | null>(null)
  const [forecasts, setForecasts] = useState<SolarProduction[]>([])
  const [selectedDate, setSelectedDate] = useState("")
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      const saved = loadInstallation()
      if (saved) {
        setAddress(saved.address)
        setPowerText(String(saved.powerKwp).replace(".", ","))
        setInstallation(saved)
      }
    } catch {
      setError("Le stockage local est indisponible. Vérifie les réglages de ton navigateur.")
    } finally {
      setReady(true)
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validation = validateInstallation(address, powerText)
    if (!validation.valid) {
      setError(validation.message)
      return
    }

    setError("")
    setLoading(true)
    setForecasts([])
    setSelectedDate("")
    try {
      saveInstallation(validation.installation)
      setInstallation(validation.installation)
      const place = await getCoordinates(validation.installation.address)
      const dailyForecasts = await getSolarForecast(place.latitude, place.longitude)
      const assessments = dailyForecasts.map((forecast) =>
        estimateSolarProduction(
          forecast,
          place.displayName,
          validation.installation,
        ),
      )
      setForecasts(assessments)
      setSelectedDate(assessments[1]?.date ?? assessments[0].date)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Le calcul a échoué. Vérifie ta connexion puis réessaie.",
      )
    } finally {
      setLoading(false)
    }
  }

  function editInstallation() {
    setForecasts([])
    setSelectedDate("")
    setError("")
  }

  const assessment = forecasts.find((forecast) => forecast.date === selectedDate) ?? null
  const scoreStyle = assessment
    ? { background: `conic-gradient(#f4bd45 ${assessment.score * 3.6}deg, #e5eee8 0deg)` }
    : undefined

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-8 sm:px-8">
      <SiteHeader />

      <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1fr_0.88fr] lg:gap-16 lg:py-14">
        <div className="flex flex-col justify-center">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#e7f2e9] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#236347]">
            <span className="size-2 rounded-full bg-[#e4aa2f]" />
            Votre météo solaire
          </p>
          <h1 className="max-w-2xl text-5xl font-black leading-[1.02] tracking-[-0.055em] text-[#18392e] sm:text-6xl lg:text-7xl">
            Solar<span className="text-[#2c8066]">Coach</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#60766b] sm:text-xl">
            Découvrez le meilleur moment pour consommer votre énergie solaire
          </p>

          <div
            aria-hidden="true"
            className="relative mt-9 min-h-56 overflow-hidden rounded-[2rem] bg-[#1f674f] p-6 text-white shadow-[0_30px_70px_-40px_rgba(24,57,46,0.65)] sm:min-h-64 sm:p-8"
          >
            <div className="absolute -right-10 -top-20 size-64 rounded-full border border-white/10 sm:size-80" />
            <div className="absolute -right-1 -top-11 size-48 rounded-full border border-white/10 sm:size-64" />
            <div className="relative flex h-full min-h-44 flex-col justify-between sm:min-h-48">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d9e8c1]">
                    Demain, naturellement
                  </p>
                  <p className="mt-2 max-w-xs text-2xl font-extrabold leading-tight sm:text-3xl">
                    Le soleil donne le tempo.
                  </p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f4cf70] text-3xl text-[#604c1d]">
                  ☼
                </span>
              </div>
              <div className="mt-7 flex items-end gap-2">
                {[28, 42, 34, 55, 74, 92, 83, 68, 47, 33, 22, 14].map(
                  (height, index) => (
                    <span
                      className={`flex-1 rounded-t-md ${index >= 4 && index <= 8 ? "bg-[#f4cf70]" : "bg-white/25"}`}
                      key={index}
                      style={{ height: `${height}px` }}
                    />
                  ),
                )}
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-semibold text-white/65">
                <span>08 h</span>
                <span>12 h</span>
                <span>18 h</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#527261]">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="text-[#2c8066]">✓</span>
              Aujourd’hui et les 3 prochains jours
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="text-[#2c8066]">✓</span>
              Simple et sans compte
            </span>
          </div>
        </div>

        <div>
          {!forecasts.length ? (
            <InstallationForm
              address={address}
              error={error}
              loading={loading}
              onAddressChange={setAddress}
              onPowerChange={setPowerText}
              onSubmit={(event) => void handleSubmit(event)}
              powerText={powerText}
              ready={ready}
            />
          ) : (
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <button className="rounded-xl border border-[#dce7df] bg-white px-4 py-2.5 text-sm font-bold text-[#236347] transition hover:bg-[#f4f8f4]" onClick={editInstallation} type="button">
                Modifier mon installation
              </button>
              <span className="text-sm text-[#718278]">{installation?.address} · {formatKwh(installation?.powerKwp ?? 0)} kWc</span>
            </div>
          )}

        {assessment ? (
          <>
          <ForecastDaySelector
            forecasts={forecasts}
            onSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
          <section aria-labelledby="forecast-title" className="rounded-[2rem] border border-[#e1ebe3] bg-white p-5 shadow-[0_25px_80px_-50px_rgba(27,75,54,0.4)] sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d8476]">Prévision solaire</p>
                <h2 className="mt-2 text-2xl font-extrabold capitalize tracking-tight text-[#18392e]" id="forecast-title">{formatForecastDate(assessment.date)}</h2>
                <p className="mt-1 max-w-md text-xs leading-5 text-[#718278]">{assessment.location}</p>
              </div>
              <span className="rounded-full bg-[#edf6ee] px-3 py-1.5 text-xs font-bold text-[#307455]">Estimation météo</span>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="flex min-h-48 flex-col items-center justify-center rounded-3xl bg-[#f7f9f4] p-5 text-center">
                <div aria-label={`Score solaire : ${assessment.score} sur 100`} className="grid size-28 place-items-center rounded-full p-2" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={assessment.score} style={scoreStyle}>
                  <div className="grid size-full place-content-center rounded-full bg-white">
                    <strong className="text-3xl font-black leading-none text-[#18392e]">{assessment.score}</strong>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#819087]">sur 100</span>
                  </div>
                </div>
                <p className="mt-3 text-sm font-bold text-[#355647]">Score solaire</p>
              </div>
              <div className="grid grid-rows-2 gap-3">
                <div className="rounded-2xl bg-[#edf6ee] p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#547263]">Production estimée</p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-[#1f674f] sm:text-3xl">
                    {formatKwh(assessment.productionRange.minKwh)}
                    <span aria-label="à" className="px-2 text-lg font-semibold text-[#6d8476]">–</span>
                    {formatKwh(assessment.productionRange.maxKwh)}
                    <span className="ml-2 text-base font-bold">kWh</span>
                  </p>
                  <p className="mt-1 text-xs text-[#71877a]">Pour une installation de {formatKwh(installation?.powerKwp ?? 0)} kWc</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#f7f9f4] p-4">
                    <p className="text-xs font-semibold text-[#718278]">Pic prévu</p>
                    <p className="mt-2 text-xl font-extrabold text-[#18392e]">{assessment.peakHour}</p>
                  </div>
                  <div className="rounded-2xl bg-[#fff6df] p-4">
                    <p className="text-xs font-semibold text-[#856d35]">Meilleur moment</p>
                    <p className="mt-2 text-lg font-extrabold text-[#604c1d]">{assessment.bestWindow}</p>
                  </div>
                </div>
              </div>
            </div>

            <SimulatedSavingsCounter
              key={assessment.date}
              productionRange={assessment.productionRange}
            />

            <div className="mt-7">
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d8476]">À programmer</p>
                  <h3 className="mt-1 text-lg font-extrabold text-[#18392e]">Vos appareils, au bon moment</h3>
                </div>
                <span aria-hidden="true" className="text-2xl">☀️</span>
              </div>
              <ul className="grid gap-2.5">
                {assessment.recommendations.map((recommendation) => (
                  <li className="flex gap-3 rounded-2xl border border-[#e8eee8] p-3.5" key={recommendation.appliance}>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f3f7f1] text-xl" aria-hidden="true">{recommendation.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-[#2a4d3b]">{recommendation.appliance}</p>
                      <p className="mt-1 text-xs leading-5 text-[#718278]">{recommendation.advice}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-[11px] leading-5 text-[#84948a]">
              Fourchette indicative avec une marge de ±30 % autour du modèle. L’orientation, l’inclinaison, l’ombrage et la météo réelle peuvent faire sortir la production de cette plage. Données météo : Open-Meteo.
            </p>
          </section>
          </>
        ) : null}
        </div>
      </section>

      <footer className="flex flex-col gap-2 border-t border-[#e7eee8] py-5 text-xs text-[#84948a] sm:flex-row sm:items-center sm:justify-between">
        <span>SolarCoach · Le solaire en toute simplicité</span>
        <span>
          Géocodage © <a className="underline underline-offset-2 hover:text-[#236347]" href="https://www.openstreetmap.org/copyright" rel="noreferrer" target="_blank">OpenStreetMap contributors</a> · Météo <a className="underline underline-offset-2 hover:text-[#236347]" href="https://open-meteo.com/" rel="noreferrer" target="_blank">Open-Meteo</a>
        </span>
      </footer>
    </main>
  )
}
