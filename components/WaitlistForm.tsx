"use client"

import { useState, type FormEvent } from "react"
import { motion, useReducedMotion } from "framer-motion"

export function WaitlistSection() {
  const [submitted, setSubmitted] = useState(false)
  const reduceMotion = useReducedMotion()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24" id="liste-attente">
      <motion.div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#e8ebf0] bg-gradient-to-br from-white via-white to-[#fff7df] px-6 py-9 shadow-[0_28px_75px_-48px_rgba(20,35,62,0.3)] sm:px-10 sm:py-12"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: { opacity: 0, y: 18 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.48 } },
        }}
      >
        <div aria-hidden="true" className="absolute -right-16 -top-24 size-64 rounded-full bg-[#f7e7ad]/55 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#a77b0b]">
              Les prochaines évolutions
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[#14233e] sm:text-4xl">
              Participez aux prochaines évolutions
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#687386] sm:text-base">
              Laissez votre email pour être informé des nouvelles fonctionnalités.
            </p>
          </div>

          <form className="relative" onSubmit={handleSubmit}>
            <label className="mb-2 block text-sm font-bold text-[#344054]" htmlFor="waitlist-email">
              Votre adresse e-mail
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                autoComplete="email"
                className="min-h-12 min-w-0 flex-1 rounded-xl border border-[#d9dee7] bg-white px-4 text-sm text-[#14233e] outline-none transition placeholder:text-[#9aa2af] focus:border-[#65789c] focus:ring-4 focus:ring-[#14233e]/[0.06]"
                disabled={submitted}
                id="waitlist-email"
                name="email"
                placeholder="vous@exemple.fr"
                required
                type="email"
              />
              <button
                className="min-h-12 rounded-xl bg-[#14233e] px-5 text-sm font-bold text-white transition hover:bg-[#24395f] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#65789c] disabled:cursor-default disabled:opacity-70"
                disabled={submitted}
                type="submit"
              >
                {submitted ? "Inscription notée" : "Rejoindre la liste d’attente"}
              </button>
            </div>
            <p aria-live="polite" className="mt-3 min-h-5 text-xs leading-5 text-[#687386]">
              {submitted
                ? "Merci pour votre intérêt ! Ce formulaire est une démonstration : votre adresse n’a pas été envoyée ni enregistrée."
                : "Formulaire de démonstration : aucune adresse n’est envoyée ni enregistrée pour le moment."}
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
