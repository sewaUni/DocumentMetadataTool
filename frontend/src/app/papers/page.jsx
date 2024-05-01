import {PapersTable} from "@/components/papers/PapersTable";
import {Suspense} from "react";
import Search from "@/components/ui/search";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

export default function PapersPage({searchParams}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <>
            <h1 className={"font-bold text-4xl p-4"}>Paper Overview</h1>
            <div className="flex items-center justify-between gap-2 p-4 w-full">
                <Search placeholder={"Search Papers..."}/>
                <Link className={buttonVariants()} href={"/upload"}>Upload Papers</Link>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <PapersTable query={query} currentPage={currentPage}/>
            </Suspense>
        </>

    )
}