"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";

export type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = (props: TodoItemProps) => {
  const router = useRouter();

  return (
    <fieldset className="flex items-center justify-between gap-4 border border-border bg-muted/50 p-4">
      <legend>{props.todo.createdAt.toDateString()}</legend>
      <p>{props.todo.title}</p>
      <Checkbox checked={props.todo.completed} />
    </fieldset>
  );
};
