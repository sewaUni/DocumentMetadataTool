"use client";

import { MoreHorizontal, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createPersonAction,
  updatePaperPersons,
} from "@/components/persons/actions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function PersonLinksEditable({
  paperIdProp,
  personsProp,
  otherPersonsProp,
  personTypeProp,
}) {
  const diffBy = (a, b, f) => a.filter((v) => !b.some((u) => f(v, u)));
  const [persons, setPersons] = useState(personsProp);
  const [otherPersons, setOtherPersons] = useState(
    diffBy(otherPersonsProp, personsProp, (a, b) => a.id === b.id),
  );
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setOtherPersons(diffBy(otherPersons, persons, (a, b) => a.id === b.id));
    updatePaperPersons(paperIdProp, personTypeProp, persons);
  }, [persons]);

  return (
    <>
      <div className="flex flex-row items-center gap-1">
        <div className="flex flex-row gap-1">
          {persons.map((person) => (
            <div
              key={person.id}
              className="w-fit whitespace-nowrap rounded-xl bg-accent px-2 py-1"
            >
              <div
                key={person.id + 1}
                className="flex items-center justify-center gap-1"
              >
                {person.name}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPersons(persons.filter((o) => o.id !== person.id));
                    setOtherPersons([
                      ...otherPersons,
                      { id: person.id, name: person.name },
                    ]);
                  }}
                  className="rounded-xl bg-accent p-1 transition duration-150 ease-in-out hover:bg-neutral-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DropdownMenu open={dropDownOpen} onOpenChange={setDropDownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Plus />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Add Author</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <DialogTrigger>Add new Author</DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Add Existing</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Filter authors..."
                        autoFocus={true}
                      />
                      <CommandList>
                        <CommandEmpty>No person found.</CommandEmpty>
                        <CommandGroup>
                          {otherPersons.map((person) => (
                            <CommandItem
                              key={person.id}
                              value={{ id: person.id, name: person.name }}
                              onSelect={(value) => {
                                setPersons([
                                  ...persons,
                                  { id: person.id, name: person.name },
                                ]);
                                setDropDownOpen(false);
                              }}
                            >
                              {person.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <form
              action={async (formData) => {
                const response = await createPersonAction(formData);
                setPersons([
                  ...persons,
                  { id: response.id, name: response.name },
                ]);
                setDialogOpen(false);
              }}
            >
              <DialogHeader>
                <DialogTitle>Add Author</DialogTitle>
                <DialogDescription>
                  Add a new author to your paper.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" className="col-span-3" />
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
                <div>
                  <RadioGroup
                    defaultValue="Student"
                    name="person_type"
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <RadioGroupItem
                      className="justify-self-end"
                      value="Student"
                      id="r1"
                    />
                    <Label className="col-span-3" htmlFor="r1">
                      Student
                    </Label>
                    <RadioGroupItem
                      className="justify-self-end"
                      value="Supervisor"
                      id="r2"
                    />
                    <Label className="col-span-3" htmlFor="r2">
                      Supervisor
                    </Label>
                    <RadioGroupItem
                      className="justify-self-end"
                      value="ProjectPartner"
                      id="r3"
                    />
                    <Label className="col-span-3" htmlFor="r3">
                      Project Partner
                    </Label>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="student_id" className="text-right">
                    Student ID
                  </Label>
                  <Input
                    id="student_id"
                    name="student_id"
                    defaultValue=""
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
