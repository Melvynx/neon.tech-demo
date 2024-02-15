"use client";

import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { Loader } from "./ui/Loader";

export const LogoutButton = () => {
  const logout = useMutation({
    mutationFn: () => signOut(),
  });
  return (
    <Button
      size="sm"
      onClick={() => {
        logout.mutate();
      }}
    >
      {logout.isPending ? (
        <Loader className="mr-2 h-4 w-4" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Logout
    </Button>
  );
};

export const LoginButton = () => {
  const login = useMutation({
    mutationFn: () => signIn(),
  });
  return (
    <Button
      size="sm"
      onClick={() => {
        login.mutate();
      }}
    >
      {login.isPending ? (
        <Loader className="mr-2 h-4 w-4" />
      ) : (
        <LogIn className="mr-2 h-4 w-4" />
      )}
      Login
    </Button>
  );
};
