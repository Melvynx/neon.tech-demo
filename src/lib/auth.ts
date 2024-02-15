import NextAuth from "next-auth";

import GitHub from "next-auth/providers/github";

import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import prisma from "./prisma";
import { stripe } from "./stripe";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "database",
  },
  events: {
    createUser: async (message) => {
      const userId = message.user.id;
      const email = message.user.email;
      const name = message.user.name;

      if (!userId || !email) {
        return;
      }

      const stripeCustomer = await stripe.customers.create({
        email,
        name: name ?? undefined,
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      });
    },
  },
  secret: process.env.SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth } = NextAuth(config);
