"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <img
            className="h-16 w-16 cursor-pointer rounded-full"
            src={
              session.user.image ??
              "https://cdn-icons-png.freepik.com/512/6813/6813762.png"
            }
            alt="avatar"
          />
        </PopoverTrigger>
        <PopoverContent className="bg-card text-card-foreground flex flex-col gap-2">
          <h2 className="text-lg font-bold">Hello {session.user.name}!</h2>
          <h3>Guess Points: {session.user.pointsFromGuesses}</h3>
          <h3>Image Points: {session.user.pointsFromImages}</h3>
          <Button onClick={() => signOut()}>Sign out</Button>
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
