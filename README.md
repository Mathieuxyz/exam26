# Le Bon Repas — Réservations

Application de gestion des réservations d'un restaurant : formulaire de réservation,
liste des réservations et édition/suppression d'une réservation.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + Drizzle ORM + PostgreSQL.

## Développement local

```bash
npm install
cp .env.example .env.local # renseigner DATABASE_URL
npx drizzle-kit push
npm run dev
```

## Pages

- `/` — formulaire de création d'une réservation
- `/bookings` — tableau de toutes les réservations
- `/bookings/<id>` — lecture, édition et suppression d'une réservation

Voir [en.md](en.md) pour le rapport de déploiement (installation serveur, sauvegarde,
planification).
