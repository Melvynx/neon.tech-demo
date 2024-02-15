"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createTodo } from "./create.action";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 py-4">
      <h2>Create a new todo</h2>
      <form
        action={async (formData) => {
          const title = String(formData.get("title"));
          const { validationErrors, serverError, data } = await createTodo({
            title,
          });

          console.log({
            validationErrors,
            serverError,
            data,
          });
          router.push("/todos");
        }}
        className="flex flex-col gap-1"
      >
        <Input name="title" />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
