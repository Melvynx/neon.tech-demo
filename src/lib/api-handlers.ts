import { auth } from "./auth";
import { createHandler } from "./createHandler";

export const authHandler = createHandler({
  middleware: async (req) => {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("You need to be logged in to perform this action.");
    }

    return { userId: session.user.id };
  },
});
