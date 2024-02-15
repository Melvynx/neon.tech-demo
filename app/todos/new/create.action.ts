"use server";

import prisma from "@/lib/prisma";
import { authAction } from "@/lib/server-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTodo = authAction(
  z.object({
    title: z.string(),
  }),
  async (data, context) => {
    const todo = await prisma.todo.create({
      data: {
        ...data,
        userId: context.user.id,
      },
    });

    revalidatePath("/todos");

    return todo;
  }
);
