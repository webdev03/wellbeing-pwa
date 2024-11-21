import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  email: varchar("email", {
    length: 255
  })
    .notNull()
    .unique(),
  passwordHash: varchar("passwordHash", {
    length: 255
  })
    .notNull()
    .unique()
});

export const usersRelations = relations(users, ({ many }) => ({
  journalEntries: many(journalEntries)
}));

export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: integer("user_id"),
  emotionScore: integer("emotion_score").notNull(),
  text: text("text").notNull()
});

export const journalEntriesRelations = relations(journalEntries, ({ one }) => ({
  user: one(users, {
    fields: [journalEntries.userId],
    references: [users.id]
  })
}));
