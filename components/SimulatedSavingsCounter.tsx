"use client"

import { useEffect, useState } from "react"
import type { ProductionRange } from "@/types/solar"

const DEMO_RATE_EURO_PER_KWH = 0.2
const ANIMATION_DURATION_MS = 900
const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
})

interface SimulatedSavingsCounterProps {
  productionRange: ProductionRange
}

export function SimulatedSavingsCounter({
  productionRange,
}: SimulatedSavingsCounterProps) {
  const simulatedGain =
    ((productionRange.minKwh + productionRange.maxKwh) / 2) *
    DEMO_RATE_EURO_PER_KWH
  const [displayedGain, setDisplayedGain] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame = 0

    function animate(timestamp: number) {
      startTime ??= timestamp
      const progress = Math.min(
        (timestamp - startTime) / ANIMATION_DURATION_MS,
        1,
      )
      const easedProgress = 1 - (1 - progress) ** 3
      setDisplayedGain(simulatedGain * easedProgress)

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    animationFrame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(animationFrame)
  }, [simulatedGain])

  return (
    <aside
      aria-label={`Compteur fictif de gain : ${euroFormatter.format(displayedGain)}`}
      className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-[#f1e5c4] bg-[#fffaf0] px-4 py-3"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f7edcf] text-lg text-[#856d35]"
        >
          €
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-[#604c1d]">
            Compteur fictif de gain
          </p>
          <p className="mt-0.5 text-[11px] leading-4 text-[#856d35]">
            Hypothèse démo : 0,20 €/kWh, sans économie réelle
          </p>
        </div>
      </div>
      <output className="shrink-0 text-xl font-black tabular-nums text-[#604c1d] sm:text-2xl">
        {euroFormatter.format(displayedGain)}
      </output>
    </aside>
  )
}
