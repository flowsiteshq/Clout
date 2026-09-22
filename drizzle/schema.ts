import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing the Manus OAuth flow. The platform keeps auth roles
 * intentionally small at the infrastructure layer; Clout-specific permissions
 * are modeled by the staff and business records below.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const venues = mysqlTable("venues", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  city: varchar("city", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  address: varchar("address", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * The durable MVP transaction record. A reservation preserves the customer,
 * service, benefit, payment amount, and attribution data necessary for the
 * Clout owner dashboard and later commission calculations.
 */
export const reservations = mysqlTable("reservations", {
  id: int("id").autoincrement().primaryKey(),
  confirmationCode: varchar("confirmationCode", { length: 24 }).notNull().unique(),
  venueId: varchar("venueId", { length: 80 }).notNull(),
  venueName: varchar("venueName", { length: 160 }).notNull(),
  customerName: varchar("customerName", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  reservationDate: varchar("reservationDate", { length: 24 }).notNull(),
  reservationTime: varchar("reservationTime", { length: 24 }).notNull(),
  partySize: int("partySize").notNull(),
  serviceName: varchar("serviceName", { length: 120 }).notNull(),
  membershipTier: varchar("membershipTier", { length: 60 }).notNull(),
  addOns: text("addOns").notNull(),
  subtotalCents: int("subtotalCents").notNull(),
  benefitCents: int("benefitCents").notNull().default(0),
  totalCents: int("totalCents").notNull(),
  referralCode: varchar("referralCode", { length: 80 }),
  status: mysqlEnum("status", ["pending", "confirmed", "arrived", "seated", "completed", "cancelled", "no_show"])
    .default("confirmed")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * A minimal ledger gives the future Wallet module a clean audit trail without
 * coupling the guest checkout to individual payment-provider implementations.
 */
export const walletTransactions = mysqlTable("walletTransactions", {
  id: int("id").autoincrement().primaryKey(),
  reservationId: int("reservationId"),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  direction: mysqlEnum("direction", ["credit", "debit"]).notNull(),
  amountCents: int("amountCents").notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type InsertReservation = typeof reservations.$inferInsert;
