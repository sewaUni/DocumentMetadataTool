"use client";

import { Button } from "@/components/ui/button";

export default function DownloadButton({ paperId, fileName }) {
  const handleClick = async () => {
    const response = await fetch(
      `/papers/${paperId}/api/?fileName=${fileName}`,
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${paperId}.pdf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Button className="m-4 text-xl" size={"lg"} onClick={handleClick}>
      Download Full Paper
    </Button>
  );
}
