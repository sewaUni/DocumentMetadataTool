"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CopyIcon, RefreshCcw, Sparkles, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addUserAction } from "@/components/auth/actions";

export default function AddUser() {
  const [secret, setSecret] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  function generate(e) {
    // e.preventDefault();
    const secret = Math.random().toString(36).slice(-10);
    setSecret(secret);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="text-xl" size={"lg"}>
          <UserPlus className="mr-2" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          action={async (formData) => {
            const response = await addUserAction(formData);
            setDialogOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>Add a new User Account.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                E-Mail
              </Label>
              <Input
                id="email"
                name="email"
                defaultValue=""
                className="col-span-3"
                type="email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                defaultValue=""
                className="col-span-2"
                type="password"
                required
              />
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button onClick={(e) => generate(e)}>
                    <Sparkles />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <h4 className="font-medium leading-none">
                    Generate Password
                  </h4>
                  <div className="flex items-center justify-between gap-2">
                    <span className="secret flex-grow rounded-md border px-4 py-1 text-center">
                      {secret}
                    </span>
                    <Button
                      variant={"icon"}
                      onClick={() => {
                        navigator.clipboard.writeText(secret);
                        toast("Password copied to clipboard");
                      }}
                      className="rounded-xl transition duration-150 ease-in-out hover:bg-neutral-300"
                    >
                      <CopyIcon className="h-4 w-4"></CopyIcon>
                    </Button>
                    <Button
                      variant={"icon"}
                      onClick={(e) => generate(e)}
                      className="rounded-xl transition duration-150 ease-in-out hover:bg-neutral-300"
                    >
                      <RefreshCcw className="h-4 w-4"></RefreshCcw>{" "}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isAdmin" className="text-right">
                Admin User
              </Label>
              <Input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                value="true"
                className="col-span-3 h-8 w-8"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
