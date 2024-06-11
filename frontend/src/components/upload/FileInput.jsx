"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { uploadAction } from "@/components/upload/actions";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export function InputFile() {
  return (
    <form
      action={async (formData) => {
        const response = await uploadAction(formData);
        response.error
          ? toast.error("Internal server error: " + response.error, {
              description: "Please try again.",
            })
          : toast("File uploaded successfully");
      }}
      className="grid w-full max-w-sm items-center gap-2"
    >
      <span className="relative flex">
        <div className="w-full">
          <Label htmlFor="document">Paper</Label>
          <Input
            id="document"
            type="file"
            name="document"
            accept=".pdf"
            required
            className="h-16"
          />
        </div>
        <span className="relative right-2 top-6 -mr-4 -mt-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 animate-ping rounded-full bg-primary"></span>
        </span>
      </span>

      <SubmitButton />
    </form>
  );
}

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Processing..." : "Upload"}
      {pending && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
