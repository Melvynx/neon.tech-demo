"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createTodoAction } from "./todo.action";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 py-4">
      <h2>Create a new todo</h2>
      <form
        action={async (formData) => {
          const result = await createTodoAction(formData);

          if (result.serverError) {
            toast.error(result.serverError);
          }
        }}
      >
        <Input name="todo" />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
