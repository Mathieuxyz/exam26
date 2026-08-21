# Rapport — Exercice 26 (Réservations de restaurant)

## 1. Installation du projet sur le serveur

Étapes prévues pour déployer l'application sur la VM ECAM n°112 (port externe `60812`),
une fois le code présent sur le serveur :

```bash
git clone <url-du-repo> exam26
cd exam26
npm install

echo "DATABASE_URL=postgresql://postgres:b491EKGZaesOaWtlzrlH@localhost:5432/appdb" > .env.local

npx drizzle-kit push

npm run build
npm run start -- -p 3000
```

`npm run start` lance Next.js en interne sur le port `3000`. Le port externe `60812`
n'est jamais codé dans l'application : un reverse proxy Apache sur la VM redirige
`http://pat.infolab.ecam.be:60812` vers `http://localhost:3000`. Pour que le service
survive aux redémarrages et aux déconnexions SSH, `npm run start` est encapsulé dans un
service systemd (ou un gestionnaire de process type `pm2`), non détaillé ici car non
exécuté depuis cette session de développement.

Avant chaque nouvel exercice, la base est réinitialisée manuellement :

```bash
PGPASSWORD='b491EKGZaesOaWtlzrlH' psql -h localhost -U postgres -d appdb -c \
  "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

puis `npx drizzle-kit push` recrée le schéma (table `bookings`) avant de relancer
l'application.

## 2. Résultat obtenu

Capture de la page d'accueil (formulaire de réservation), vérifiée en local avant
déploiement — la capture depuis `http://pat.infolab.ecam.be:60812` doit être reprise
une fois le déploiement réel effectué sur la VM :

![Page d'accueil - formulaire de réservation](docs/screenshot-home.png)

Les pages `/bookings` (liste) et `/bookings/<id>` (édition/suppression) suivent le
même gabarit visuel et ont été validées via `npm run build` (compilation Next.js et
TypeScript sans erreur) ainsi que par relecture du code des Server Actions CRUD.

## 3. Script de sauvegarde

Fichier : `scripts/exam26_backup.sh`

```
#!/bin/bash
set -euo pipefail

BACKUP_DIR="/home/backup"
LOG_FILE="$BACKUP_DIR/exam26.log"
PGPASS_FILE="$BACKUP_DIR/.pgpass_exam26"

DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_NAME="appdb"

DATE=$(date +%Y%m%d)
DUMP_FILE="$BACKUP_DIR/db_exam26_${DATE}.dump"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"
}

if [ -f "$PGPASS_FILE" ]; then
  export PGPASSFILE="$PGPASS_FILE"
fi

if pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -F c -f "$DUMP_FILE" "$DB_NAME"; then
  log "OK backup created: $DUMP_FILE"
else
  log "ERROR backup failed for database $DB_NAME"
  exit 1
fi
```

Le mot de passe PostgreSQL n'est pas écrit en dur dans le script : il est lu depuis
`/home/backup/.pgpass_exam26` (format standard `.pgpass` :
`localhost:5432:appdb:postgres:<mot de passe>`), fichier lisible uniquement par
`exam26backup` (`chmod 600`).

Mise en place sur le serveur (exécutée en tant que `root`, non lancée depuis cette
session) :

```bash
useradd -r -m -d /home/exam26backup -s /usr/sbin/nologin exam26backup

cp scripts/exam26_backup.sh /home/backup/exam26_backup.sh
chown exam26backup:exam26backup /home/backup/exam26_backup.sh
chmod 700 /home/backup/exam26_backup.sh

touch /home/backup/exam26.log
chown exam26backup:exam26backup /home/backup/exam26.log
chmod 600 /home/backup/exam26.log

printf 'localhost:5432:appdb:postgres:b491EKGZaesOaWtlzrlH\n' > /home/backup/.pgpass_exam26
chown exam26backup:exam26backup /home/backup/.pgpass_exam26
chmod 600 /home/backup/.pgpass_exam26
```

Les droits du dossier `/home/backup` lui-même ne sont pas modifiés, conformément à la
consigne ; seuls les fichiers déposés dedans sont restreints à `exam26backup`.

## 4. Planification

Le script tourne chaque samedi à 2h00 du matin, via la crontab de l'utilisateur
`exam26backup` :

```bash
crontab -u exam26backup -e
```

Contenu ajouté :

```
0 2 * * 6 /home/backup/exam26_backup.sh
```

`0 2 * * 6` = minute 0, heure 2, tous les jours du mois, tous les mois, jour de la
semaine 6 (samedi). Chaque exécution ajoute une ligne dans `/home/backup/exam26.log`
et produit un fichier `/home/backup/db_exam26_<AAAAMMJJ>.dump`.
