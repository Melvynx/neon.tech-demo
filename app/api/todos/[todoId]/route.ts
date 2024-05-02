import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      todoId: string;
    };
  }
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const body = await req.json();

  const todo = await prisma.todo.findUnique({
    where: {
      id: params.todoId,
    },
  });

  if (!todo) {
    return NextResponse.json(
      {
        error: "Todo not found",
      },
      { status: 400 }
    );
  }

  if (session.user.id !== todo.userId) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  await prisma.todo.update({
    where: {
      id: todo.id,
    },
    data: {
      completed: body.completed,
    },
  });

  return NextResponse.json({
    message: "Todo updated",
  });
};
