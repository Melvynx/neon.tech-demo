import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const AccountSettingsButton = () => {
  return (
    <form>
      <Button
        formAction={async () => {
          "use server";

          const authSession = await auth();
          const user = await prisma.user.findUnique({
            where: {
              id: authSession?.user?.id ?? "",
            },
            select: {
              stripeCustomerId: true,
              plan: true,
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const stripeCustomerId = user?.stripeCustomerId ?? undefined;

          if (!stripeCustomerId) {
            throw new Error("Stripe customer ID is missing");
          }

          const session = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId ?? "",
            return_url: `http://localhost:300/account/billing`,
          });

          if (!session.url) {
            throw new Error("Session URL is missing");
          }
          redirect(session.url);
        }}
      >
        Account settings
      </Button>
    </form>
  );
};
