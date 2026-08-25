import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  article: uuid().defaultRandom().primaryKey(),
  number: text().notNull(),
  peremption: integer().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
