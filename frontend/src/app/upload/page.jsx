import { InputFile } from "@/components/upload/FileInput";

export const metadata = {
  title: "Upload",
};

export default function UploadPage() {
  return (
    <>
      <h1 className={"p-6 text-4xl font-bold"}>Upload a Document</h1>
      <p className="p-4">
        Please upload a document that you would like to add to the database.
      </p>
      <InputFile />
    </>
  );
}
