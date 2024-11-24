import { relations, type InferSelectModel } from "drizzle-orm";
import { pgTable, serial, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  username: varchar("username", {
    length: 20
  })
    .notNull()
    .unique(),
  passwordHash: varchar("passwordHash", {
    length: 255
  }).notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  journalEntries: many(journalEntries)
}));

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date"
  }).notNull()
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}));

export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  emotionScore: integer("emotion_score").notNull(),
  text: text("text").notNull()
});

export const journalEntriesRelations = relations(journalEntries, ({ one }) => ({
  user: one(users, {
    fields: [journalEntries.userId],
    references: [users.id]
  })
}));

export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;
export type JournalEntry = InferSelectModel<typeof journalEntries>;
