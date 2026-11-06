import Link from "next/link"
import {
  BenefitsSection,
  HeroSection,
  PrivacySection,
  VisionSection,
} from "@/components/LandingSections"
import { WaitlistSection } from "@/components/WaitlistForm"

export function LandingPage() {
  return (
    <main className="overflow-hidden bg-[#f7f8fa] text-[#14233e]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link
          aria-label="SolarCoach, accueil"
          className="text-xl font-black tracking-[-0.06em] text-[#14233e] sm:text-2xl"
          href="/"
        >
          Solar<span className="text-[#e7a900]">Coach</span>
          <span aria-hidden="true" className="ml-1 align-top text-[10px] text-[#e7a900]">✳</span>
        </Link>
        <nav aria-label="Navigation principale" className="flex items-center gap-3 sm:gap-6">
          <Link
            className="hidden text-sm font-semibold text-[#667085] transition hover:text-[#14233e] sm:inline"
            href="#vision"
          >
            Notre vision
          </Link>
          <Link
            className="inline-flex min-h-10 items-center rounded-full bg-[#14233e] px-4 text-xs font-bold text-white transition hover:bg-[#24395f] sm:min-h-11 sm:px-5 sm:text-sm"
            href="/app"
          >
            Tester gratuitement
          </Link>
        </nav>
      </header>

      <HeroSection />
      <BenefitsSection />
      <VisionSection />
      <WaitlistSection />
      <PrivacySection />

      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#f0b916] px-6 py-10 text-center shadow-[0_30px_70px_-45px_rgba(115,84,8,0.65)] sm:px-12 sm:py-14">
          <div aria-hidden="true" className="absolute -right-14 -top-32 size-72 rounded-full border border-[#14233e]/10 sm:size-96" />
          <div aria-hidden="true" className="absolute -right-2 -top-20 size-56 rounded-full border border-[#14233e]/10 sm:size-72" />
          <div className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#624b0e]">
              À vous de jouer
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black leading-tight tracking-[-0.05em] text-[#14233e] sm:text-4xl">
              Prêt à exploiter pleinement votre production solaire ?
            </h2>
            <Link
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#14233e] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#24395f]"
              href="/app"
            >
              Tester SolarCoach
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e7eaf0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 text-xs text-[#8891a0] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <Link className="text-base font-black tracking-[-0.06em] text-[#14233e]" href="/">
            Solar<span className="text-[#e7a900]">Coach</span>
          </Link>
          <nav aria-label="Navigation de pied de page" className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
            <Link className="hover:text-[#14233e]" href="#avantages">Fonctionnalités</Link>
            <Link className="hover:text-[#14233e]" href="#vision">Vision produit</Link>
            <Link className="hover:text-[#14233e]" href="/app">Test gratuit</Link>
            <Link className="hover:text-[#14233e]" href="#liste-attente">Liste d’attente</Link>
          </nav>
          <span>© SolarCoach 2026</span>
        </div>
      </footer>
    </main>
  )
}
