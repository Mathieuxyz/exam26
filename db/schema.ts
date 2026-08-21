import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  phone: text().notNull(),
  guests: integer().notNull(),
  time: timestamp().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
