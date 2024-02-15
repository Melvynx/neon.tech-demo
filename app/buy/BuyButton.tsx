import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const BuyButton = () => {
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

          if (user.plan === "MASTER") {
            throw new Error("User already has MASTER plan");
          }

          const stripeCustomerId = user?.stripeCustomerId ?? undefined;

          if (!stripeCustomerId) {
            throw new Error("Stripe customer ID is missing");
          }

          const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: "subscription",
            payment_method_types: ["card", "link"],
            line_items: [
              {
                price:
                  process.env.NODE_ENV === "development"
                    ? "price_1OhN1WDRUFwrgphi8cPqTBDO"
                    : "",
                quantity: 1,
              },
            ],
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`,
          });

          if (!session.url) {
            throw new Error("Session URL is missing");
          }
          redirect(session.url);
        }}
      >
        Upgrade to MASTER PLAN
      </Button>
    </form>
  );
};
