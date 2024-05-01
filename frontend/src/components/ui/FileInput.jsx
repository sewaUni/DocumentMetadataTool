import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="paper">Paper</Label>
      <Input id="paper" type="file" accept=".pdf" />
      <Button className="w-full">Upload</Button>
    </div>
  );
}
