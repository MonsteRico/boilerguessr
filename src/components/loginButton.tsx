"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email}. Points: {session.user.pointsFromGuesses}
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
