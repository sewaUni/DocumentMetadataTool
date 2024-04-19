import Link from "next/link"
import {Search} from "lucide-react"
import {Input} from "@/components/ui/input";

export default function NavBar() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav
                className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Home
                </Link>
                <Link
                    href="/upload"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Upload
                </Link>
                <Link
                    href="/papers"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Overview
                </Link>
                <Link
                    href="/dashboard"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link>
            </nav>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search Papers..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
            </div>
        </header>);
}