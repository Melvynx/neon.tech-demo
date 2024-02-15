import { User } from "@prisma/client";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

export const authAction = createSafeActionClient({
  middleware: async () => {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("You need to be logged in to perform this action.");
    }

    return { user: session.user as User };
  },
});
