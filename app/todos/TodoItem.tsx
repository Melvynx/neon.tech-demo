"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Todo } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = (props: TodoItemProps) => {
  const router = useRouter();
  const completedMutation = useMutation({
    mutationFn: async () => {
      const result = await fetch(`/api/todos/${props.todo.id}/completed`, {
        method: props.todo.completed ? "DELETE" : "POST",
      });

      const json = await result.json();

      toast(json.message);

      if (result.ok) {
        router.refresh();
        return json;
      }
    },
  });

  return (
    <fieldset className="flex items-center justify-between gap-4 border border-border bg-muted/50 p-4">
      <legend>{props.todo.createdAt.toDateString()}</legend>
      <p>{props.todo.title}</p>
      <Checkbox
        className={cn({
          "opacity-50": completedMutation.isPending,
        })}
        onClick={() => completedMutation.mutate()}
        checked={props.todo.completed}
      />
    </fieldset>
  );
};
