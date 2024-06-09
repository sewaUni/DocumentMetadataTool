import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { use } from "react";
import { pbClient } from "@/lib/pocketbase";
import { cookies } from "next/headers";
import Logout from "@/components/auth/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function AuthStatus({ user }) {
  //todo component doesnt update state, maybe use client component
  if (user === false)
    return (
      <Link className={buttonVariants()} href="/auth/login">
        Login
      </Link>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback
            className={user.isAdmin ? "border-2 border-primary" : ""}
          >
            {user.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {user.isAdmin ? user.name + " (Admin)" : user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.isAdmin && (
          <DropdownMenuItem>
            <Link href={"/admin"}>Edit student accounts</Link>
          </DropdownMenuItem>
        )}
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
