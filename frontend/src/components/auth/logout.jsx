"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { pbClient } from "@/lib/pocketbase";
import { revalidatePath } from "next/cache";

export default function Logout() {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const onLogout = async () => {
    try {
      deleteCookie("pb_auth");
      pbClient.client.authStore.clear();
      localStorage.clear();
      router.push("/");
    } catch (err) {
      setError("Failed to log out");
    }
  };
  return (
    <div>
      <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
      {error && <p>{error}</p>}
    </div>
  );
}
