import { fetchCardData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function OtherCardWrapper() {
  const { numberOfPapers, numberOfAuthors, numberOfLiterature, averagePages } =
    await fetchCardData();
  return (
    <>
      <CardSkeleton title="Total Papers" value={numberOfPapers} />
      <CardSkeleton title="Total Authors" value={numberOfAuthors} />
      <CardSkeleton title="Total Literature" value={numberOfLiterature} />
      <CardSkeleton title="Average pages" value={averagePages} />
    </>
  );
}

function CardSkeleton({ title, value }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">Subheading for {title}</p>
      </CardContent>
    </Card>
  );
}
