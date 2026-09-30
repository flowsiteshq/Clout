import { describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  createReservation: vi.fn(async () => 42),
  createEmployeeApplication: vi.fn(async () => 17),
  getOwnerSnapshot: vi.fn(async () => ({
    reservations: 2,
    revenueCents: 42000,
    recentReservations: [],
  })),
}));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("Clout reservation transaction", () => {
  it("records a complete guest reservation and returns a confirmation", async () => {
    const caller = appRouter.createCaller(createContext());

    const result = await caller.reservation.create({
      venueId: "noir-social-houston",
      venueName: "Noir Social House",
      customerName: "Jordan Taylor",
      email: "jordan@example.com",
      reservationDate: "2026-09-26",
      reservationTime: "21:30",
      partySize: 2,
      serviceName: "The Velvet Table",
      membershipTier: "Clout",
      addOns: ["Valet arrival"],
      subtotalCents: 28500,
      benefitCents: 2500,
      totalCents: 26000,
    });

    expect(result).toMatchObject({ reservationId: 42, status: "confirmed" });
    expect(result.confirmationCode).toMatch(/^CLT-[A-Z0-9]+-[A-Z0-9]{4}$/);
  });

  it("exposes an owner snapshot for the operator dashboard", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.owner.snapshot()).resolves.toMatchObject({
      reservations: 2,
      revenueCents: 42000,
    });
  });
});

describe("Clout employee application", () => {
  it("records a public employee application for management review", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.employeeApplication.create({
      fullName: "Jordan Taylor",
      email: "jordan@example.com",
      phone: "713-555-0123",
      roleInterest: "Host / Guest Experience",
      preferredVenue: "Noir Social House · Houston",
      availability: "Thursday through Saturday after 7 PM",
      socialHandle: "@jordan",
      note: "Five years in hospitality and events.",
    })).resolves.toEqual({ applicationId: 17, status: "received" });
  });
});
