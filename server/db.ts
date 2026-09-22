import { count, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertReservation,
  InsertUser,
  reservations,
  users,
  walletTransactions,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { eq } from "drizzle-orm";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");

  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;

  textFields.forEach(field => {
    const value = user[field];
    if (value !== undefined) {
      values[field] = value ?? null;
      updateSet[field] = value ?? null;
    }
  });

  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  values.role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");
  updateSet.role = values.role;

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function createReservation(reservation: InsertReservation) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(reservations).values(reservation);
  const reservationId = Number(result[0].insertId);

  await db.insert(walletTransactions).values({
    reservationId,
    customerEmail: reservation.email,
    direction: "debit",
    amountCents: reservation.totalCents,
    description: `Reservation at ${reservation.venueName}`,
  });

  return reservationId;
}

export async function getOwnerSnapshot() {
  const db = await getDb();
  if (!db) {
    return { reservations: 0, revenueCents: 0, recentReservations: [] as Array<{ confirmationCode: string; venueName: string; customerName: string; totalCents: number; createdAt: Date }> };
  }

  const [totals] = await db
    .select({
      reservations: count(reservations.id),
      revenueCents: sql<number>`coalesce(sum(${reservations.totalCents}), 0)`,
    })
    .from(reservations);

  const recentReservations = await db
    .select({
      confirmationCode: reservations.confirmationCode,
      venueName: reservations.venueName,
      customerName: reservations.customerName,
      totalCents: reservations.totalCents,
      createdAt: reservations.createdAt,
    })
    .from(reservations)
    .orderBy(desc(reservations.createdAt))
    .limit(5);

  return {
    reservations: Number(totals?.reservations ?? 0),
    revenueCents: Number(totals?.revenueCents ?? 0),
    recentReservations,
  };
}
