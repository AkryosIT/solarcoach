import type { Metadata } from "next"
import { LandingPage } from "@/components/LandingPage"

export const metadata: Metadata = {
  title: "SolarCoach — Profitez au maximum de votre énergie solaire",
  description:
    "Découvrez les meilleures heures pour consommer votre électricité solaire et mieux piloter votre autoconsommation.",
}

export default function Home() {
  return <LandingPage />
}
