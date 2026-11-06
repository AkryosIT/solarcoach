import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[#e4ebe2] py-5">
      <Link
        className="flex items-center gap-3"
        href="/"
        aria-label="SolarCoach, accueil"
      >
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-2xl bg-[#1f674f] text-2xl text-white"
        >
          ☼
        </span>
        <span className="text-lg font-extrabold tracking-tight text-[#18392e]">
          Solar<span className="text-[#2c8066]">Coach</span>
        </span>
      </Link>
      <span className="hidden items-center gap-2 rounded-full border border-[#dce9df] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#527261] sm:inline-flex">
        <span aria-hidden="true" className="size-2 rounded-full bg-[#e4aa2f]" />
        Votre énergie, au bon moment
      </span>
    </header>
  )
}
