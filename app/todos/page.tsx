import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { TodoItem } from "./TodoItem";

export default async function TodoPage() {
  // Server Component
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <Alert>
        <AlertCircle />
        <AlertTitle>Unauthorized</AlertTitle>
        <AlertDescription>
          You need to be logged in to access this page.
        </AlertDescription>
      </Alert>
    );
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold">TODOS</h1>
      <Link href="/todos/new">Create a new todo</Link>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
