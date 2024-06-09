import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <h1 className="mx-auto text-center text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Document Metadata Tool
        </h1>
        <p className="mx-auto mt-2 max-w-[700px] text-center text-gray-500 dark:text-gray-400 md:text-lg">
          Upload your thesis document and automatically extract metadata from
          it. The metadata will be used to generate a dashboard that will help
          you to understand the structure of your documents.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/upload" className="mt-5">
            <Button
              size="sm"
              className="rounded-md text-sm font-semibold text-white"
            >
              Upload Document
            </Button>
          </Link>
          <Link href="/dashboard" className="mt-5">
            <Button
              size="sm"
              variant="outline"
              className="flex gap-1 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
