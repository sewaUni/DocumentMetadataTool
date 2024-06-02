import Link from "next/link";
import { redirect } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import AuthStatus from "@/components/auth/authStatus";
import { cookies } from "next/headers";
import { pbClient } from "@/lib/pocketbase";
import { Suspense, use } from "react";

async function searchAction(formData) {
  "use server";
  const search = formData.get("search");
  redirect(`/papers?query=${search}`);
}

const getUser = async () => {
  const cookieStore = cookies();

  const result = await pbClient.getUser(cookieStore);

  return result;
};

export default function NavBar() {
  const user = use(getUser());
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
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
        {user?.isAdmin && (
          <>
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
          </>
        )}
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial" action={searchAction}>
          <div className="w-100 relative flex flex-1 flex-shrink-0">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              type="search"
              placeholder="Search Papers..."
              name="search"
            />
          </div>
        </form>
      </div>
      <div>
        <Suspense>
          <AuthStatus user={user} />
        </Suspense>
      </div>
    </header>
  );
}
