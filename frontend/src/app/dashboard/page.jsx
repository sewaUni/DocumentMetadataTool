import { Suspense } from "react";
import CardWrapper from "@/components/dashboard/cards";
import { DashboardGraph } from "@/components/dashboard/DashboardGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SupervisorList } from "@/components/dashboard/supervisorList";
import OtherCardWrapper from "@/components/dashboard/otherCards";
import { MethodologyList } from "@/components/dashboard/methodologyList";
import PagesPerCourseCard from "@/components/dashboard/pagesPerCourseCard";
import { fetchPapersPerYearStatistics } from "@/lib/data";
import { LiteratureList } from "@/components/dashboard/literatureList";

export default async function DashboardPage() {
  return (
    <>
      <h1 className={"p-6 text-4xl font-bold"}>Dashboard</h1>
      <div className="grid w-full max-w-screen-2xl grid-cols-4 gap-8 px-8 py-4">
        <Suspense fallback={"loading..."}>
          <OtherCardWrapper />
        </Suspense>
      </div>
      <div className="grid w-full max-w-screen-2xl grid-cols-4 gap-8 px-8 py-4">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Papers per Year</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardGraph data={await fetchPapersPerYearStatistics()} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Papers per Supervisor</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SupervisorList />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Papers by Methodology</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <MethodologyList />
          </CardContent>
        </Card>
        <PagesPerCourseCard />
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top 5 Literature used</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <LiteratureList />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
