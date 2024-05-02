import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { TodoItem } from "../TodoItem";

export default async function Page({
  params,
}: {
  params: {
    todoId: string;
  };
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <Alert>
        <AlertCircle />
        <AlertTitle>Unauthorized</AlertTitle>
        <AlertDescription>You need to be logged.</AlertDescription>
      </Alert>
    );
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: params.todoId,
    },
  });

  if (!todo) {
    notFound();
  }

  if (todo.userId !== session.user.id) {
    return (
      <Alert>
        <AlertCircle />
        <AlertTitle>Unauthorized</AlertTitle>
        <AlertDescription>You are not the owner of this todo.</AlertDescription>
      </Alert>
    );
  }

  if (todo.completed) {
    return (
      <Alert>
        <AlertCircle />
        <AlertTitle>Completed</AlertTitle>
        <AlertDescription>This todo has been completed.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <TodoItem todo={todo} />
    </div>
  );
}
