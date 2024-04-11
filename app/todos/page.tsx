import { auth } from "@/lib/auth";

export default async function TodoPage() {
  const session = await auth();

  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <div className="flex flex-col gap-2"></div>
    </div>
  );
}
