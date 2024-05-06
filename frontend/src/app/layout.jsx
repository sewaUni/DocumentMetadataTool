import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Document Metadata Tool",
  description: "A tool for extracting metadata from documents",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="flex min-h-screen flex-col items-center">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
