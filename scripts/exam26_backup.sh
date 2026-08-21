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
