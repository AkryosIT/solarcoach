"use client"

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import Link from "next/link"
import type { ReactNode } from "react"

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
}

const benefits = [
  {
    icon: "↘",
    title: "Réduisez votre facture d’électricité",
    description:
      "Identifiez les moments où votre production solaire peut alimenter vos usages du quotidien.",
    tone: "bg-[#fff4cf] text-[#986e00]",
  },
  {
    icon: "☀",
    title: "Maximisez votre autoconsommation",
    description:
      "Déplacez certains usages vers les heures où le soleil contribue davantage à votre énergie.",
    tone: "bg-[#eaf5ee] text-[#28704d]",
  },
  {
    icon: "⌁",
    title: "Prenez de meilleures décisions énergétiques",
    description:
      "Appuyez-vous sur une prévision météo locale et des conseils simples pour planifier votre journée.",
    tone: "bg-[#edf0ff] text-[#5063ba]",
  },
]

const visionItems = [
  {
    icon: "⚡",
    title: "Recharge véhicule électrique",
    description: "Identification des meilleurs créneaux de recharge.",
  },
  {
    icon: "🔔",
    title: "Alertes intelligentes",
    description: "Notifications lors des journées de forte production.",
  },
  {
    icon: "💰",
    title: "Suivi des économies",
    description: "Visualisation des économies réalisées grâce à l’autoconsommation.",
  },
  {
    icon: "🏠",
    title: "Intégration Home Assistant",
    description: "Automatisation future des équipements domestiques.",
  },
]

function MotionIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string
  title: string
  description: string
  dark?: boolean
}) {
  return (
    <MotionIn className="mx-auto max-w-2xl text-center">
      <p className={`text-xs font-extrabold uppercase tracking-[0.18em] ${dark ? "text-[#e9bd42]" : "text-[#a77b0b]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl ${dark ? "text-white" : "text-[#14233e]"}`}>
        {title}
      </h2>
      <p className={`mt-4 text-sm leading-7 sm:text-base ${dark ? "text-white/65" : "text-[#687386]"}`}>
        {description}
      </p>
    </MotionIn>
  )
}

function SunIllustration() {
  const reduceMotion = useReducedMotion()
  const bars = [14, 21, 17, 33, 45, 59, 72, 91, 82, 70, 53, 38, 27, 16, 10]

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[34rem]"
      initial={reduceMotion ? false : { opacity: 0, y: 20, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
    >
      <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-[#fff0b5] via-[#f2f6f1] to-[#e9edff] blur-2xl" />
      <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-3 shadow-[0_35px_90px_-40px_rgba(20,35,62,0.3)] backdrop-blur sm:rounded-[2.4rem] sm:p-5">
        <div className="flex items-center justify-between px-2 pb-4 pt-2 sm:px-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#929bab]">Aperçu de démonstration</p>
            <p className="mt-1 text-base font-extrabold text-[#14233e] sm:text-lg">Prévision solaire · Demain</p>
          </div>
          <span className="rounded-full bg-[#fff4d1] px-3 py-1.5 text-[10px] font-bold text-[#86630c]">
            Simulation
          </span>
        </div>
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#f8faf8] to-[#f3f5f7] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#7b8493]">Production indicative</p>
              <p className="mt-1 text-2xl font-black tracking-tight text-[#14233e] sm:text-3xl">
                12–18 <span className="text-sm font-bold text-[#7b8493]">kWh</span>
              </p>
            </div>
            <div className="grid size-[4.25rem] place-items-center rounded-full p-1.5" style={{ background: "conic-gradient(#f0b916 0deg 310deg, #e8ebea 310deg 360deg)" }}>
              <div className="grid size-full place-content-center rounded-full bg-white text-center">
                <strong className="text-lg font-black leading-none text-[#14233e]">82</strong>
                <span className="mt-0.5 text-[8px] font-bold uppercase text-[#8991a0]">score</span>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="mt-5 flex h-28 items-end gap-1.5 sm:h-36 sm:gap-2">
            {bars.map((height, index) => (
              <motion.span
                animate={reduceMotion ? undefined : { height: [`${height * 0.9}%`, `${height}%`, `${height * 0.9}%`] }}
                className={`flex-1 rounded-t-md ${index >= 4 && index <= 10 ? "bg-[#efbc26]" : "bg-[#cbd9d0]"}`}
                key={index}
                style={{ height: `${height}%` }}
                transition={{ duration: 3.8, delay: index * 0.06, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-semibold text-[#9ba2ad] sm:text-[10px]">
            <span>08 h</span><span>10 h</span><span>12 h</span><span>14 h</span><span>16 h</span><span>18 h</span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#fff8e4] p-3.5 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9b7928]">Pic indicatif</p>
            <p className="mt-1.5 text-base font-extrabold text-[#594517]">12 h — 14 h</p>
          </div>
          <div className="rounded-2xl bg-[#edf6f1] p-3.5 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#668271]">Créneau suggéré</p>
            <p className="mt-1.5 text-base font-extrabold text-[#285a43]">11 h — 16 h</p>
          </div>
        </div>
        <p className="mt-3 px-1 text-[10px] leading-4 text-[#8991a0]">
          Illustration fictive. Les résultats varient selon le lieu et l’installation.
        </p>
      </div>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        className="absolute -left-3 top-1/3 hidden items-center gap-2.5 rounded-2xl border border-white bg-white px-3.5 py-3 shadow-[0_15px_45px_-20px_rgba(20,35,62,0.3)] sm:flex"
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="grid size-9 place-items-center rounded-xl bg-[#fff2c2] text-lg text-[#9a6a00]">☀</span>
        <span>
          <span className="block text-[10px] font-semibold text-[#9299a5]">Conseil du jour</span>
          <span className="block text-xs font-extrabold text-[#14233e]">Lancez vos appareils</span>
        </span>
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  return (
    <section className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8 lg:px-12 lg:pb-28 lg:pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-0 size-[28rem] rounded-full bg-[#fff0b8]/50 blur-3xl" />
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.5, 0.8, 0.5], scale: [1, 1.06, 1] }}
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-4 size-[32rem] rounded-full bg-[#e8f0f7]/80 blur-3xl"
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative z-[1] mx-auto max-w-2xl lg:mx-0"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#eee8d8] bg-white/85 px-3.5 py-2 text-xs font-bold text-[#5b6475] shadow-sm sm:text-sm">
          <span className="size-2 rounded-full bg-[#efb51c]" />
          Votre énergie solaire, mieux utilisée
        </div>
        <h1 className="max-w-2xl text-[2.65rem] font-black leading-[1.04] tracking-[-0.065em] text-[#14233e] sm:text-6xl lg:text-[4.15rem]">
          Profitez au maximum de votre{" "}
          <span className="relative inline-block">
            énergie solaire
            <svg aria-hidden="true" className="absolute -bottom-2 left-0 h-3 w-full text-[#f1bf35]" preserveAspectRatio="none" viewBox="0 0 360 12">
              <path d="M3 8C92 2 245 2 357 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
            </svg>
          </span>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-[#626d7f] sm:text-lg sm:leading-8">
          Découvrez les meilleures heures pour utiliser votre production
          photovoltaïque et réduire votre facture d’électricité.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#f0b916] px-7 text-sm font-extrabold text-[#18243b] shadow-[0_12px_30px_-14px_rgba(211,157,8,0.75)] transition hover:-translate-y-0.5 hover:bg-[#f5c637] sm:text-base"
            href="/app"
          >
            Tester gratuitement
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-bold text-[#566276] transition hover:bg-white hover:text-[#14233e]"
            href="#avantages"
          >
            En savoir plus
          </Link>
        </div>
        <p className="mt-4 text-xs font-medium text-[#8991a0]">
          Gratuit · Sans compte · Une estimation en quelques secondes
        </p>
      </motion.div>
      <SunIllustration />
    </section>
  )
}

export function BenefitsSection() {
  return (
    <section className="border-y border-[#e7eaf0] bg-white py-16 sm:py-20 lg:py-24" id="avantages">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          description="Une prévision météo et des conseils simples pour mieux synchroniser votre consommation avec le soleil."
          eyebrow="Le solaire, en pratique"
          title="Votre production, au bon moment"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5 lg:mt-14">
          {benefits.map((benefit, index) => (
            <MotionIn className="h-full" delay={index * 0.08} key={benefit.title}>
              <article className="h-full rounded-[1.7rem] border border-[#edf0f3] bg-gradient-to-br from-white to-[#fafbfc] p-6 shadow-[0_16px_45px_-38px_rgba(20,35,62,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-35px_rgba(20,35,62,0.24)] sm:p-7">
                <span className={`grid size-12 place-items-center rounded-2xl text-2xl font-bold ${benefit.tone}`}>
                  {benefit.icon}
                </span>
                <h3 className="mt-6 text-lg font-extrabold leading-snug tracking-tight text-[#14233e]">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#737d8c]">
                  {benefit.description}
                </p>
              </article>
            </MotionIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export function VisionSection() {
  return (
    <section className="bg-[#14233e] py-16 text-white sm:py-20 lg:py-24" id="vision">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          dark
          description="Nous construisons un assistant d’autoconsommation solaire intelligent."
          eyebrow="La suite, avec vous"
          title="Le futur de SolarCoach"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {visionItems.map((item, index) => (
            <MotionIn delay={index * 0.06} key={item.title}>
              <article className="h-full rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#f0c64d]/40 hover:bg-white/[0.08] sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-white/10 text-2xl">
                    {item.icon}
                  </span>
                  <span className="rounded-full border border-[#f0c64d]/30 bg-[#f0c64d]/10 px-2.5 py-1 text-[9px] font-extrabold text-[#f2d578] sm:text-[10px]">
                    Bientôt disponible
                  </span>
                </div>
                <h3 className="mt-5 text-base font-extrabold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-white/60 sm:text-sm">
                  {item.description}
                </p>
              </article>
            </MotionIn>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-white/45">
          Ces fonctionnalités sont des pistes d’évolution et ne sont pas encore disponibles.
        </p>
      </div>
    </section>
  )
}

export function PrivacySection() {
  return (
    <section className="bg-[#f7f8fa] px-5 py-12 sm:px-8 sm:py-16" id="donnees">
      <MotionIn className="mx-auto max-w-4xl rounded-[1.6rem] border border-[#e7eaf0] bg-white p-5 shadow-[0_18px_50px_-40px_rgba(20,35,62,0.25)] sm:p-7">
        <div className="flex items-start gap-4">
          <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf5ef] text-[#28704d]">◈</span>
          <div>
            <h2 className="text-base font-extrabold text-[#14233e]">Vos données, en toute clarté</h2>
            <p className="mt-2 text-xs leading-6 text-[#687386] sm:text-sm">
              L’adresse et la puissance sont enregistrées dans votre navigateur pour préremplir le formulaire. Pour calculer une prévision, l’adresse est envoyée à Nominatim (OpenStreetMap) afin d’obtenir les coordonnées ; seules ces coordonnées sont ensuite envoyées à Open-Meteo. Ces services tiers appliquent leurs propres politiques. SolarCoach ne stocke pas ces données sur son propre serveur. Vous pouvez effacer la sauvegarde en supprimant les données du site dans votre navigateur.
            </p>
          </div>
        </div>
      </MotionIn>
    </section>
  )
}
