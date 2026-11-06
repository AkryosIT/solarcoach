# SolarCoach

MVP web pour aider les particuliers équipés de panneaux photovoltaïques à choisir quand consommer leur production solaire.

## Architecture

```text
SolarCoach/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── SolarCoach.tsx
├── services/
│   ├── geocoding.ts
│   └── weather.ts
├── types/
│   └── solar.ts
├── utils/
│   ├── solar.ts
│   ├── storage.ts
│   └── validation.ts
├── public/
├── package.json
└── tsconfig.json
```

- **`app/`** — routes et structure Next.js App Router. `page.tsx` affiche le produit, `layout.tsx` définit les métadonnées et `globals.css` importe Tailwind et les styles globaux.
- **`components/`** — interface réutilisable. `SolarCoach.tsx` gère le formulaire, l’état de chargement, les erreurs et le résultat de prévision.
- **`services/`** — intégrations externes côté navigateur : conversion adresse/coordonnées avec Nominatim et récupération de la météo horaire avec Open-Meteo.
- **`types/`** — types TypeScript partagés pour l’installation, la géolocalisation, la météo et le bilan solaire.
- **`utils/`** — logique indépendante de l’interface : validation, persistance locale, estimation de production et formatage.
- **`public/`** — ressources statiques servies directement par Next.js.

L’application n’a ni serveur métier, ni authentification, ni base de données. L’adresse et la puissance sont mémorisées dans le `localStorage` du navigateur.

## Démarrer

```bash
npm install
npm run dev
```

Le serveur de développement écoute sur **http://localhost:3001** pour éviter les ports 5050 et 5173 déjà utilisés par les autres projets.

```bash
npm run lint
npm run build
npm start
```

Le calcul de production est une estimation indicative : l’orientation, l’inclinaison, les ombrages et le rendement réel de l’installation ne sont pas connus par ce MVP.
