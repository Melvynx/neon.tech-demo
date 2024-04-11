import { auth } from "@/lib/auth";
import { LoginButton, LogoutButton } from "./AuthButtons";

export type HeaderProps = {};

export const Header = async (props: HeaderProps) => {
  const session = await auth();

  return (
    <header className="flex w-full items-center gap-4 border-b py-2">
      <h3 className="text-2xl">App</h3>
      <div className="ml-auto flex items-center gap-4">
        <p>{session?.user?.email ?? "Not authentificated"}</p>
        {session?.user ? <LogoutButton /> : <LoginButton />}
      </div>
    </header>
  );
};
