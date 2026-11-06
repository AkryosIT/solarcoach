"use client"

import Link from "next/link"
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"

type IconName = "pin" | "sun" | "bolt" | "arrow" | "check" | "spark" | "lock"

function Icon({
  name,
  className = "size-6",
}: {
  name: IconName
  className?: string
}) {
  const paths: Record<IconName, React.ReactNode> = {
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
    bolt: <path d="m13 2-3 8h7l-6 12 1-9H6l7-11Z" />,
    arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
    check: <path d="m5 12 4 4L19 6" />,
    spark: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
        <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
      </>
    ),
    lock: (
      <>
        <rect height="10" rx="2" width="14" x="5" y="11" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4m-4 4v2" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const steps = [
  {
    number: "01",
    icon: "pin" as const,
    title: "Entrez votre adresse",
    description:
      "Indiquez où se trouvent vos panneaux et leur puissance. C’est tout.",
    color: "bg-[#fff2c2] text-[#9a6a00]",
  },
  {
    number: "02",
    icon: "sun" as const,
    title: "Analyse météo solaire",
    description:
      "SolarCoach croise la météo locale et votre installation pour estimer la production.",
    color: "bg-[#e6f4f0] text-[#176b58]",
  },
  {
    number: "03",
    icon: "bolt" as const,
    title: "Recevez vos recommandations",
    description:
      "Repérez les meilleurs créneaux pour lancer vos appareils et autoconsommer.",
    color: "bg-[#e9edff] text-[#485ec4]",
  },
]

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export function LandingPage() {
  const shouldReduceMotion = useReducedMotion()
  const entrance = shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible" }

  return (
    <main className="overflow-hidden bg-[#fbfaf6] text-[#14233e]">
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link
          aria-label="SolarCoach, accueil"
          className="text-xl font-black tracking-[-0.06em] text-[#14233e] sm:text-2xl"
          href="/"
        >
          Solar<span className="text-[#e7a900]">Coach</span>
          <span className="ml-1 align-top text-[10px] font-bold tracking-normal text-[#8891a2]">✳</span>
        </Link>
        <nav aria-label="Navigation principale" className="flex items-center gap-3 sm:gap-7">
          <a
            className="hidden text-sm font-semibold text-[#667085] transition hover:text-[#14233e] sm:inline"
            href="#fonctionnement"
          >
            Comment ça marche
          </a>
          <Link
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#14233e] px-4 text-xs font-bold text-white transition hover:bg-[#24395f] sm:min-h-11 sm:px-5 sm:text-sm"
            href="/app"
          >
            Tester gratuitement
            <Icon className="size-4" name="arrow" />
          </Link>
        </nav>
      </header>

      <section className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8 lg:px-12 lg:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute -left-48 top-0 size-[28rem] rounded-full bg-[#fff0b8]/40 blur-3xl" />
        <motion.div
          animate={shouldReduceMotion ? undefined : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
          className="pointer-events-none absolute -right-52 top-8 size-[34rem] rounded-full bg-[#e8f2f4]/70 blur-3xl"
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="relative z-[1] mx-auto max-w-2xl lg:mx-0"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#eee8d8] bg-white/80 px-3.5 py-2 text-xs font-bold text-[#5b6475] shadow-sm sm:text-sm">
            <span className="size-2 rounded-full bg-[#efb51c]" />
            Votre énergie solaire, mieux utilisée
          </div>
          <h1 className="max-w-2xl text-[2.75rem] font-black leading-[1.04] tracking-[-0.065em] text-[#14233e] sm:text-6xl lg:text-[4.25rem]">
            Profitez au maximum de votre{" "}
            <span className="relative inline-block whitespace-nowrap">
              énergie solaire
              <svg
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-3 w-full text-[#f1bf35]"
                preserveAspectRatio="none"
                viewBox="0 0 360 12"
              >
                <path d="M3 8C92 2 245 2 357 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#626d7f] sm:text-lg sm:leading-8">
            Découvrez en quelques secondes les meilleures heures pour utiliser
            votre électricité solaire et réduire votre facture.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#f0b916] px-7 text-sm font-extrabold text-[#18243b] shadow-[0_12px_30px_-14px_rgba(211,157,8,0.75)] transition hover:-translate-y-0.5 hover:bg-[#f5c637] sm:text-base"
              href="/app"
            >
              Tester gratuitement
              <span className="grid size-7 place-items-center rounded-full bg-[#14233e] text-white transition-transform group-hover:translate-x-0.5">
                <Icon className="size-4" name="arrow" />
              </span>
            </Link>
            <span className="text-xs font-medium text-[#8991a0] sm:text-sm">
              Gratuit · Sans compte · En 30 secondes
            </span>
          </div>
          <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-[#667085] sm:text-sm">
            <span className="flex -space-x-2">
              {["bg-[#d4e5db]", "bg-[#f3dfb2]", "bg-[#dce3f6]"].map((color, i) => (
                <span
                  aria-hidden="true"
                  className={`grid size-8 place-items-center rounded-full border-2 border-[#fbfaf6] text-[10px] ${color}`}
                  key={color}
                >
                  {["☀", "↗", "✓"][i]}
                </span>
              ))}
            </span>
            Pensé pour les propriétaires solaires
          </div>
        </motion.div>

        <motion.div
          className="relative z-[1] mx-auto w-full max-w-[34rem] lg:mr-0"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
        >
          <div className="absolute -right-4 -top-7 size-20 rounded-full bg-[#ffeaa5]/80 blur-2xl sm:-right-8 sm:size-32" />
          <div className="absolute -bottom-8 -left-8 size-36 rounded-full bg-[#dcefe6]/90 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white bg-white p-3 shadow-[0_35px_90px_-40px_rgba(20,35,62,0.28)] sm:rounded-[2.4rem] sm:p-5">
            <div className="flex items-center justify-between px-2 pb-4 pt-2 sm:px-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#a0a7b3]">Votre aperçu solaire</p>
                <p className="mt-1 text-base font-extrabold text-[#14233e] sm:text-lg">Demain, à Lyon</p>
              </div>
              <span className="rounded-full bg-[#f3f7f3] px-3 py-1.5 text-[10px] font-bold text-[#55836e] sm:text-xs">
                Prévision locale
              </span>
            </div>
            <div className="rounded-[1.5rem] bg-[#f7f8f5] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#7b8493]">Production estimée</p>
                  <p className="mt-1 text-2xl font-black tracking-tight text-[#14233e] sm:text-3xl">18,4 <span className="text-sm font-bold text-[#7b8493]">kWh</span></p>
                </div>
                <div className="grid size-[4.5rem] place-items-center rounded-full p-1.5" style={{ background: "conic-gradient(#f0b916 0deg 331deg, #e8ebea 331deg 360deg)" }}>
                  <div className="grid size-full place-content-center rounded-full bg-[#f7f8f5] text-center">
                    <strong className="text-lg font-black leading-none text-[#14233e]">92</strong>
                    <span className="mt-0.5 text-[8px] font-bold uppercase text-[#8991a0]">score</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex h-28 items-end gap-1.5 sm:h-36 sm:gap-2">
                {[16, 23, 18, 31, 44, 58, 68, 84, 92, 82, 71, 54, 41, 28, 17, 10].map((height, index) => (
                  <motion.span
                    animate={shouldReduceMotion ? undefined : { height: [`${height * 0.88}%`, `${height}%`, `${height * 0.88}%`] }}
                    className={`flex-1 rounded-t-md ${index >= 5 && index <= 11 ? "bg-[#f0b916]" : "bg-[#cbd9d0]"}`}
                    key={index}
                    transition={{ duration: 3.2, delay: index * 0.055, repeat: Infinity, ease: "easeInOut" }}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[9px] font-semibold text-[#9ba2ad] sm:text-[10px]">
                <span>08 h</span><span>10 h</span><span>12 h</span><span>14 h</span><span>16 h</span><span>18 h</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#fff8e4] p-3.5 sm:p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#9b7928]">Meilleur créneau</p>
                <p className="mt-1.5 text-base font-extrabold text-[#594517] sm:text-lg">11 h — 16 h</p>
              </div>
              <div className="rounded-2xl bg-[#edf6f1] p-3.5 sm:p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#668271]">Gain simulé</p>
                <p className="mt-1.5 text-base font-extrabold text-[#285a43] sm:text-lg">≈ 2,30 €</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 px-1 text-[10px] leading-4 text-[#98a0ac]">
              <Icon className="size-3.5 shrink-0" name="spark" />
              Déplacez vos usages au moment où vos panneaux produisent.
            </div>
          </div>
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
            className="absolute -left-3 top-1/3 hidden items-center gap-2.5 rounded-2xl border border-white bg-white px-3.5 py-3 shadow-[0_15px_45px_-20px_rgba(20,35,62,0.3)] sm:flex"
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#fff2c2] text-[#9a6a00]">
              <Icon className="size-5" name="sun" />
            </span>
            <span>
              <span className="block text-[10px] font-semibold text-[#9299a5]">Pic solaire</span>
              <span className="block text-xs font-extrabold text-[#14233e]">12 h — 14 h</span>
            </span>
          </motion.div>
        </motion.div>
      </section>

      <section className="border-y border-[#ecebe4] bg-white py-16 sm:py-20 lg:py-24" id="fonctionnement">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            {...entrance}
            viewport={{ once: true, amount: 0.5 }}
            variants={reveal}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#b18410]">Simple comme le soleil</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#14233e] sm:text-4xl">
              Le bon moment, en trois étapes
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#737d8c] sm:text-base">
              Moins de calculs, plus d’énergie solaire utilisée chez vous.
            </p>
          </motion.div>
          <motion.div
            className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5 lg:mt-14"
            {...entrance}
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {steps.map((step) => (
              <motion.article
                className="group relative rounded-[1.7rem] border border-[#efeee8] bg-[#fdfdfa] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#e6d9aa] hover:shadow-[0_20px_50px_-35px_rgba(20,35,62,0.25)] sm:p-7"
                key={step.number}
                variants={reveal}
              >
                <div className="flex items-center justify-between">
                  <span className={`grid size-12 place-items-center rounded-2xl ${step.color}`}>
                    <Icon name={step.icon} />
                  </span>
                  <span className="text-xs font-extrabold tracking-[0.16em] text-[#c2c6cb]">{step.number}</span>
                </div>
                <h3 className="mt-6 text-lg font-extrabold tracking-tight text-[#14233e]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#737d8c]">{step.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:px-12 lg:py-28">
        <motion.div
          {...entrance}
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#b18410]">Un aperçu concret</p>
          <h2 className="mt-3 max-w-lg text-3xl font-black leading-tight tracking-[-0.05em] text-[#14233e] sm:text-4xl">
            Sachez quoi lancer — et quand.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#737d8c] sm:text-base">
            Une prévision claire pour organiser votre journée autour de votre production solaire.
          </p>
          <ul className="mt-7 grid gap-3">
            {["Recharge véhicule", "Lave-vaisselle", "Machine à laver"].map((tip, index) => (
              <li className="flex items-center gap-3 text-sm font-bold text-[#39465d]" key={tip}>
                <span className="grid size-8 place-items-center rounded-xl bg-[#fff2c2] text-sm">
                  {["🚗", "🍽️", "🧺"][index]}
                </span>
                {tip}
                <span className="ml-auto text-xs font-semibold text-[#8b94a1]">à programmer</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-xl"
          {...entrance}
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[#f7edce]/70 blur-xl" />
          <div className="relative rounded-[2rem] border border-[#eeece3] bg-white p-5 shadow-[0_25px_70px_-35px_rgba(20,35,62,0.22)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-[#fff5d5] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#99751b]">Exemple simulé</span>
                <h3 className="mt-3 text-xl font-black tracking-tight text-[#14233e]">Demain</h3>
                <p className="mt-1 text-xs text-[#8b94a1]">Votre journée solaire en un coup d’œil</p>
              </div>
              <div className="grid size-[4.5rem] place-items-center rounded-full bg-[#fff4ce] text-center">
                <span><strong className="block text-lg font-black leading-none text-[#755914]">92</strong><span className="text-[8px] font-bold text-[#9b7928]">/ 100</span></span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#f7f8f5] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b94a1]">Pic de production</p>
                <p className="mt-2 text-lg font-extrabold text-[#14233e]">12 h — 14 h</p>
              </div>
              <div className="rounded-2xl bg-[#fff8e4] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#9b7928]">Meilleure plage</p>
                <p className="mt-2 text-lg font-extrabold text-[#594517]">11 h — 16 h</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#edf6f1] px-4 py-3.5">
              <span className="text-xs font-bold text-[#53715e]">Compteur fictif de gain</span>
              <span className="text-xl font-black text-[#285a43]">2,3 €</span>
            </div>
            <p className="mt-2 text-right text-[10px] text-[#a3a9b1]">Exemple indicatif, non contractuel</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {["🚗 Véhicule", "🍽️ Lave-vaisselle", "🧺 Linge"].map((tip) => (
                <span className="rounded-xl border border-[#efeee8] px-3 py-2 text-center text-[10px] font-bold text-[#586477]" key={tip}>
                  {tip}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#14233e] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-12">
          <motion.div
            {...entrance}
            viewport={{ once: true, amount: 0.35 }}
            variants={reveal}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f0c64d]">Le solaire, à votre rythme</p>
            <h2 className="mt-3 max-w-md text-3xl font-black leading-tight tracking-[-0.05em] sm:text-4xl">
              Plus de soleil dans vos habitudes.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60 sm:text-base">
              Faites de votre production locale une alliée simple, jour après jour.
            </p>
          </motion.div>
          <motion.div
            className="grid gap-3 sm:grid-cols-3"
            {...entrance}
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            {[
              "Réduisez votre facture",
              "Maximisez votre autoconsommation",
              "Aucune installation requise",
            ].map((benefit) => (
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
                key={benefit}
                variants={reveal}
              >
                <span className="grid size-9 place-items-center rounded-xl bg-[#f0b916] text-[#14233e]">
                  <Icon className="size-5" name="check" />
                </span>
                <p className="mt-5 text-sm font-bold leading-5 text-white">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#ecebe4] bg-white py-16 sm:py-20 lg:py-24" id="donnees">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            {...entrance}
            viewport={{ once: true, amount: 0.4 }}
            variants={reveal}
          >
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#eaf4ee] text-[#236347]">
              <Icon name="lock" />
            </span>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#b18410]">
              Vos données, en toute clarté
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#14233e] sm:text-4xl">
              Vous gardez le contrôle.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#737d8c] sm:text-base">
              Pas de compte à créer. Voici précisément ce qui se passe avec les
              informations saisies.
            </p>
          </motion.div>

          <motion.div
            className="mt-9 grid gap-4 md:grid-cols-3 lg:mt-12"
            {...entrance}
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {[
              {
                title: "Enregistrées dans votre navigateur",
                text: "Votre adresse et la puissance de votre installation sont conservées localement pour préremplir le formulaire.",
              },
              {
                title: "Utilisées pour établir la prévision",
                text: "Votre adresse sert à trouver les coordonnées via Nominatim (OpenStreetMap). Seules ces coordonnées sont transmises à Open-Meteo pour la météo.",
              },
              {
                title: "Pas stockées par SolarCoach",
                text: "Les requêtes partent directement de votre navigateur. SolarCoach ne stocke pas ces données sur son propre serveur. Vous pouvez effacer la sauvegarde en supprimant les données du site dans votre navigateur.",
              },
            ].map((item) => (
              <motion.article
                className="rounded-[1.6rem] border border-[#efeee8] bg-[#fdfdfa] p-5 sm:p-6"
                key={item.title}
                variants={reveal}
              >
                <span className="grid size-9 place-items-center rounded-xl bg-[#fff2c2] text-[#9a6a00]">
                  <Icon className="size-5" name="check" />
                </span>
                <h3 className="mt-4 text-sm font-extrabold text-[#14233e]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#737d8c] sm:text-sm">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </motion.div>
          <p className="mx-auto mt-5 max-w-3xl text-center text-[11px] leading-5 text-[#9299a5]">
            Nominatim (OpenStreetMap) et Open-Meteo sont des services tiers :
            leur traitement des requêtes relève de leurs propres politiques.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <motion.div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#f0b916] px-6 py-10 text-center sm:px-12 sm:py-14"
          {...entrance}
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
        >
          <div aria-hidden="true" className="absolute -right-16 -top-32 size-72 rounded-full border border-[#14233e]/10 sm:size-96" />
          <div aria-hidden="true" className="absolute -right-4 -top-20 size-56 rounded-full border border-[#14233e]/10 sm:size-72" />
          <div className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#624b0e]">À vous de jouer</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black leading-tight tracking-[-0.05em] text-[#14233e] sm:text-4xl">
              Prêt à exploiter pleinement votre production solaire ?
            </h2>
            <Link
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#14233e] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#24395f]"
              href="/app"
            >
              Tester SolarCoach
              <Icon className="size-4" name="arrow" />
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-[#ecebe4] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-[#8891a0] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <Link className="text-base font-black tracking-[-0.06em] text-[#14233e]" href="/">
            Solar<span className="text-[#e7a900]">Coach</span>
          </Link>
          <span>© SolarCoach 2026</span>
          <Link className="font-bold text-[#596579] transition hover:text-[#14233e]" href="/app">
            Tester l’application <span aria-hidden="true">→</span>
          </Link>
          <a className="font-bold text-[#596579] transition hover:text-[#14233e]" href="#donnees">
            Données & confidentialité
          </a>
        </div>
      </footer>
    </main>
  )
}
