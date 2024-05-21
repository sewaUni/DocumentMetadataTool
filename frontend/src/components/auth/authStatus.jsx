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

const getUserInitials = async () => {
  const cookieStore = cookies();
  return await pbClient.getUser(cookieStore);
};

export default function AuthStatus() {
  //todo component doesnt update state, maybe use client component
  const user = use(getUserInitials());
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
          <AvatarFallback>
            {user.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>{" "}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit student accounts</DropdownMenuItem>
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
