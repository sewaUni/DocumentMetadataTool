"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const route = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const form = { email, password };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        setError("Failed to authenticate user");
        return;
      }
      const data = await response.json();
      if (data?.token) {
        route.push("/");
      } else {
        setError("Failed to authenticate user");
      }
    } catch (err) {
      setEmail("Failed to authenticate user");
    }
  };

  return (
    <>
      <h1 className={"p-6 text-4xl font-bold"}>Login</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value || "")}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value || "")}
          />
        </div>
        <Button type="submit">Login</Button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
}
