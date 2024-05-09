"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  createLiteratureAction,
  updatePaperLiterature,
} from "@/components/literature/actions";

export function LiteratureTableEditable({
  paperIdProp,
  literatureProp,
  otherLiteratureProp,
}) {
  const diffBy = (a, b, f) => a.filter((v) => !b.some((u) => f(v, u)));
  const [literature, setLiterature] = useState(literatureProp);
  const [otherLiterature, setOtherLiterature] = useState(
    diffBy(otherLiteratureProp, literatureProp, (a, b) => a.id === b.id),
  );
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setOtherLiterature(
      diffBy(otherLiterature, literature, (a, b) => a.id === b.id),
    );
    updatePaperLiterature(paperIdProp, literature);
  }, [literature]);

  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>DOI</TableHead>
            <TableHead>URL</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {literature.map((paper) => (
            <TableRow key={paper.id}>
              <TableCell className="font-bold">{paper.title}</TableCell>
              <TableCell>{paper.authors}</TableCell>
              <TableCell>{new Date(paper.date).toLocaleDateString()}</TableCell>
              <TableCell>{paper.doi}</TableCell>
              <TableCell>
                <Link className="underline" href={paper.url}>
                  {paper.url}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setLiterature(literature.filter((o) => o.id !== paper.id));
                    setOtherLiterature([...otherLiterature, paper]);
                  }}
                  className="rounded-xl bg-accent p-1 text-center transition duration-150 ease-in-out hover:bg-neutral-300 "
                >
                  <X className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{literature.length}</TableCell>
            <TableCell>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DropdownMenu
                  open={dropDownOpen}
                  onOpenChange={setDropDownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Plus />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Add Literature</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <DialogTrigger>Add new Literature</DialogTrigger>
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          Add Existing
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="p-0">
                          <Command>
                            <CommandInput
                              placeholder="Filter literature..."
                              autoFocus={true}
                            />
                            <CommandList>
                              <CommandEmpty>No Literature found.</CommandEmpty>
                              <CommandGroup>
                                {otherLiterature.map((paper) => (
                                  <CommandItem
                                    key={paper.id}
                                    value={paper}
                                    onSelect={(value) => {
                                      setLiterature([...literature, paper]);
                                      setDropDownOpen(false);
                                    }}
                                  >
                                    {paper.title}
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
                      const response = await createLiteratureAction(formData);
                      setLiterature([...literature, response]);
                      setDialogOpen(false);
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle>Add Literature</DialogTitle>
                      <DialogDescription>
                        Add new Literature to your paper.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input id="title" name="title" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="authors" className="text-right">
                          Authors
                        </Label>
                        <Input
                          id="authors"
                          name="authors"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          className="col-span-3"
                          type="date"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="doi" className="text-right">
                          DOI
                        </Label>
                        <Input id="doi" name="doi" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">
                          URL
                        </Label>
                        <Input
                          id="url"
                          name="url"
                          className="col-span-3"
                          type="url"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
