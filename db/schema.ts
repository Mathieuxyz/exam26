import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  article: uuid().defaultRandom().primaryKey(),
  number: text().notNull(),
  peremption: integer().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
