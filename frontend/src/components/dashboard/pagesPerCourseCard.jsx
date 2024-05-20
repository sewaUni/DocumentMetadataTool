import { fetchPageStatisticsPerCourse } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PagesPerCourseCard() {
  const data = await fetchPageStatisticsPerCourse();
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Average Pages per Course</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 items-center gap-4">
        {data.map((course) => (
          <Card key={course.name}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{course.averagePages}</div>
              <p className="text-xs text-muted-foreground">
                Average pages for {course.name}
              </p>
            </CardContent>
          </Card>
          // <div key={course.name} className="flex items-center">
          //   <div className="ml-4 space-y-1">
          //     <p className="text-sm font-medium leading-none">{course.name}</p>
          //   </div>
          //   <div className="ml-auto font-medium">{course.averagePages}</div>
          // </div>
        ))}
      </CardContent>
    </Card>
  );
}
