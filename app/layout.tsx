import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SolarCoach — Votre énergie solaire, au bon moment",
  description:
    "Estimez votre production solaire de demain et découvrez quand lancer vos appareils pour mieux autoconsommer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
