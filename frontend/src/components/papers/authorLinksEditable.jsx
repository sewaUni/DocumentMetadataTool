"use client"

import { fetchAuthors } from "@/lib/data";
import Link from "next/link";
import {MoreHorizontal, X, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
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
} from "@/components/ui/dropdown-menu"
import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

const labels = [
    "feature",
    "bug",
    "enhancement",
    "documentation",
    "design",
    "question",
    "maintenance",
]

const authors = [
    {
        id: 1,
        name: "author 1"
    },
    {
        id: 2,
        name: "author 2"
    },
    {
        id: 3,
        name: "author 3"
    }
]

export function AuthorLinksEditable({ authorIds }) {
    const [open, setOpen] = useState(false)
    //const authors = fetchAuthors(authorIds);

    return (
        <>
            <div className="flex flex-row gap-1">
            {authors.map((author) => (
                <div
                    key={author.id}
                    className="w-fit whitespace-nowrap rounded-xl bg-accent px-2 py-1"
                >
                    <div key={author.id} className="flex justify-center items-center gap-1">
                        {author.name}
                        <button className="rounded-xl bg-accent transition duration-150 ease-in-out hover:bg-neutral-300 p-1">
                            <X className="h-4 w-4"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
            <Dialog>
            <DropdownMenu open={open} onOpenChange={setOpen}>
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
                            <DialogTrigger>
                                Add new Author
                            </DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Add Existing
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="p-0">
                                <Command>
                                    <CommandInput
                                        placeholder="Filter authors..."
                                        autoFocus={true}
                                    />
                                    <CommandList>
                                        <CommandEmpty>No author found.</CommandEmpty>
                                        <CommandGroup>
                                            {authors.map((author) => (
                                                <CommandItem
                                                    key={author.id}
                                                    value={author.name}
                                                    onSelect={(value) => {
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {author.name}
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
                            <Input
                                id="name"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                E-Mail
                            </Label>
                            <Input
                                id="email"
                                defaultValue=""
                                className="col-span-3"
                                type="email"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            </>
    );
}
