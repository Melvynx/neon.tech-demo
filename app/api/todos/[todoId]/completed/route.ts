import { authHandler } from "@/lib/api-handlers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = authHandler(
  {
    paramsSchema: z.object({
      todoId: z.string(),
    }),
  },
  async ({ params, context }) => {
    const currentTodo = await prisma.todo.findUnique({
      where: {
        id: params.todoId,
        userId: context.userId,
      },
    });

    if (!currentTodo) {
      throw new Error("Todo not found.");
    }

    await prisma.todo.update({
      where: {
        id: params.todoId,
      },
      data: {
        completed: true,
      },
    });

    return NextResponse.json({
      message: "Todo completed.",
    });
  }
);

export const DELETE = authHandler(
  {
    paramsSchema: z.object({
      todoId: z.string(),
    }),
  },
  async ({ params, context }) => {
    const currentTodo = await prisma.todo.findUnique({
      where: {
        id: params.todoId,
        userId: context.userId,
      },
    });

    if (!currentTodo) {
      throw new Error("Todo not found.");
    }

    await prisma.todo.update({
      where: {
        id: params.todoId,
      },
      data: {
        completed: false,
      },
    });

    return NextResponse.json({
      message: "Todo uncompleted.",
    });
  }
);
