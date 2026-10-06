import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createEmployeeApplication, createReservation, getOwnerSnapshot } from "./db";

function confirmationCode() {
  return `CLT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  reservation: router({
    create: publicProcedure
      .input(
        z.object({
          venueId: z.string().min(1),
          venueName: z.string().min(1),
          customerName: z.string().min(2).max(160),
          email: z.string().email(),
          phone: z.string().max(32).optional(),
          reservationDate: z.string().min(8),
          reservationTime: z.string().min(3),
          partySize: z.number().int().min(1).max(20),
          serviceName: z.string().min(2),
          membershipTier: z.string().min(2),
          addOns: z.array(z.string()).max(6),
          subtotalCents: z.number().int().nonnegative(),
          benefitCents: z.number().int().nonnegative(),
          totalCents: z.number().int().nonnegative(),
          referralCode: z.string().max(80).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const code = confirmationCode();
        const id = await createReservation({
          ...input,
          confirmationCode: code,
          addOns: JSON.stringify(input.addOns),
          phone: input.phone || null,
          referralCode: input.referralCode || null,
          status: "confirmed",
        });

        return { confirmationCode: code, reservationId: id, status: "confirmed" as const };
      }),
  }),

  employeeApplication: router({
    create: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(2).max(160),
          email: z.string().email(),
          phone: z.string().min(7).max(32),
          roleInterest: z.string().min(2).max(100),
          preferredVenue: z.string().min(2).max(160),
          socialHandle: z.string().max(120).optional(),
          availability: z.string().min(2).max(255),
          note: z.string().max(1000).optional(),
          ndaAccepted: z.literal(true),
          ndaSignatureName: z.string().min(2).max(160),
          ndaVersion: z.string().min(8).max(48),
        })
      )
      .mutation(async ({ input }) => {
        if (input.ndaSignatureName.trim().toLocaleLowerCase() !== input.fullName.trim().toLocaleLowerCase()) {
          throw new Error("NDA signature must match the applicant's full name");
        }
        const id = await createEmployeeApplication({
          ...input,
          ndaAccepted: 1,
          ndaSignatureName: input.ndaSignatureName.trim(),
          socialHandle: input.socialHandle || null,
          note: input.note || null,
          status: "new",
        });
        return { applicationId: id, status: "received" as const };
      }),
  }),

  owner: router({
    snapshot: publicProcedure.query(async () => getOwnerSnapshot()),
  }),
});

export type AppRouter = typeof appRouter;
