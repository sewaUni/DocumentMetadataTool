import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { uploadPaper } from "@/lib/data";

async function uploadAction(formData) {
  "use server";
  formData.set("title", formData.get("document").name);

  const result = await uploadPaper(formData);
  redirect(`/papers/${result.id}`);
}

export function InputFile() {
  return (
    <form
      action={uploadAction}
      className="grid w-full max-w-sm items-center gap-2"
    >
      <Label htmlFor="document">Paper</Label>
      <Input id="document" type="file" name="document" accept=".pdf" required />
      <Button type="submit" className="w-full">
        Upload
      </Button>
    </form>
  );
}
