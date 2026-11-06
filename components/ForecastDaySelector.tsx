import type { SolarProduction } from "@/types/solar"
import { formatForecastDay, formatKwh } from "@/utils/solar"

interface ForecastDaySelectorProps {
  forecasts: SolarProduction[]
  selectedDate: string
  onSelect: (date: string) => void
}

export function ForecastDaySelector({
  forecasts,
  selectedDate,
  onSelect,
}: ForecastDaySelectorProps) {
  return (
    <nav aria-label="Choisir le jour de la prévision" className="mb-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {forecasts.map((forecast, index) => {
          const isSelected = forecast.date === selectedDate
          const dayLabel = formatForecastDay(forecast.date, index)
          return (
            <button
              aria-pressed={isSelected}
              className={`min-w-0 rounded-2xl border px-2 py-3 text-left transition focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#3d8b6b]/40 sm:px-3 ${
                isSelected
                  ? "border-[#1f674f] bg-[#1f674f] text-white shadow-md shadow-[#1f674f]/15"
                  : "border-[#e1ebe3] bg-white text-[#355647] hover:border-[#9bbca7] hover:bg-[#f7faf6]"
              }`}
              key={forecast.date}
              onClick={() => onSelect(forecast.date)}
              type="button"
            >
              <span className="block truncate text-[11px] font-bold sm:text-xs">
                {dayLabel}
              </span>
              <span
                className={`mt-1.5 block truncate text-[10px] font-medium sm:text-xs ${
                  isSelected ? "text-white/75" : "text-[#84948a]"
                }`}
              >
                {formatKwh(forecast.productionRange.minKwh)}–
                {formatKwh(forecast.productionRange.maxKwh)} kWh
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
