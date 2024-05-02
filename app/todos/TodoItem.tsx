"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = (props: TodoItemProps) => {
  const router = useRouter();

  const handleCompleted = useMutation({
    mutationFn: async () => {
      const result = await fetch(`/api/todos/${props.todo.id}`, {
        body: JSON.stringify({
          completed: !props.todo.completed,
        }),
        method: "PATCH",
      });

      const json = await result.json();

      if (result.ok) {
        toast.success("Todo updated successfully");
        router.refresh();
        return;
      }

      toast.error(json.error);
    },
  });

  return (
    <fieldset className="flex items-center justify-between gap-4 border border-border bg-muted/50 p-4">
      <legend>{props.todo.createdAt.toDateString()}</legend>
      <Link href={`/todos/${props.todo.id}`}>{props.todo.title}</Link>
      <Checkbox
        onCheckedChange={() => {
          handleCompleted.mutate();
        }}
        disabled={handleCompleted.isPending}
        checked={props.todo.completed}
      />
    </fieldset>
  );
};
