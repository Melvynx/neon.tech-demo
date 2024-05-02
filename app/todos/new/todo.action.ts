"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const authAction = createSafeActionClient({
  middleware: async () => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    return {
      userId: session.user.id,
    };
  },
  handleReturnedServerError: (error) => {
    return error.message;
  },
});

export const createTodoAction = authAction(
  z.instanceof(FormData),
  async (formData: FormData, context) => {
    const todo = String(formData.get("todo"));

    if (!todo) {
      throw new Error("Todo cannot be empty");
    }

    await prisma.todo.create({
      data: {
        title: todo,
        userId: context.userId,
      },
    });

    revalidatePath("/todos");
    redirect("/todos");
  }
);
