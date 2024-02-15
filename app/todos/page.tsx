import { LoginButton } from "@/components/AuthButtons";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Triangle } from "lucide-react";
import Link from "next/link";
import { TodoItem } from "./TodoItem";

export default async function TodoPage() {
  const session = await auth();
  console.log({ session });

  if (!session?.user?.id) {
    return (
      <Alert>
        <Triangle size={16} />
        <AlertTitle>You need to be logged in to view this page.</AlertTitle>
        <LoginButton />
      </Alert>
    );
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {todos.length === 0 && (
          <Alert>
            <Triangle size={16} />
            <AlertTitle>You have no todos. Try creating one!</AlertTitle>
            <Link
              href="/todos/new"
              className={buttonVariants({ size: "sm", variant: "outline" })}
            >
              Create one
            </Link>
          </Alert>
        )}
      </div>
    </div>
  );
}
