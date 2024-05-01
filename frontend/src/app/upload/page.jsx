import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/ui/FileInput";

export default function UploadPage() {
  return (
    <>
      <h1 className={"p-4 text-4xl font-bold"}>Upload a Document</h1>
      <p className="p-4">
        Please upload a document that you would like to add to the database.
      </p>
      <InputFile />
    </>
  );
}
