import { fetchCardData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CardWrapper() {
  const { numberOfPapers, numberOfAuthors, numberOfLiterature, averagePages } =
    await fetchCardData();
  return (
    <>
      <CardSkeleton
        title="Total Papers"
        value={numberOfPapers}
        subheading={"All papers tracked"}
      />
      <CardSkeleton
        title="Total Authors"
        value={numberOfAuthors}
        subheading={"Total number of students"}
      />
      <CardSkeleton
        title="Total Literature"
        value={numberOfLiterature}
        subheading={"All tracked literature used"}
      />
      <CardSkeleton
        title="Average Pages"
        value={averagePages}
        subheading={"Average pages per paper"}
      />
    </>
  );
}

function CardSkeleton({ title, value, subheading }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subheading}</p>
      </CardContent>
    </Card>
  );
}
