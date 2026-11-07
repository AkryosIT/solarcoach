interface SolarPotentialIndicatorProps {
  score: number
}

function getPotential(score: number): {
  label: string
  description: string
  style: string
} {
  if (score >= 65) {
    return {
      label: "Élevé",
      description: "Conditions météo favorables à la production solaire.",
      style: "border-[#cfe6d7] bg-[#edf6f1] text-[#285a43]",
    }
  }

  if (score >= 35) {
    return {
      label: "Modéré",
      description: "Un potentiel de production solaire intermédiaire.",
      style: "border-[#f0dfb0] bg-[#fff8e4] text-[#765b17]",
    }
  }

  return {
    label: "Faible",
    description: "Conditions météo peu favorables à la production solaire.",
    style: "border-[#e2e7ec] bg-[#f4f6f8] text-[#586477]",
  }
}

export function SolarPotentialIndicator({
  score,
}: SolarPotentialIndicatorProps) {
  const potential = getPotential(score)

  return (
    <aside
      aria-label={`Potentiel de production solaire estimé : ${potential.label}`}
      className={`mt-4 flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 ${potential.style}`}
    >
      <div>
        <p className="text-sm font-bold">Potentiel de production solaire</p>
        <p className="mt-0.5 text-[11px] leading-4 opacity-80">
          {potential.description}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-white/80 px-3 py-1 text-xs font-extrabold">
        {potential.label}
      </span>
    </aside>
  )
}
