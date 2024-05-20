import { Suspense } from "react";
import CardWrapper from "@/components/dashboard/cards";
import { DashboardGraph } from "@/components/dashboard/DashboardGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GenericList } from "@/components/dashboard/list";
import OtherCardWrapper from "@/components/dashboard/otherCards";

export default function DashboardPage() {
  return (
    <>
      <h1 className={"p-6 text-4xl font-bold"}>Dashboard</h1>
      <div className="grid w-full grid-cols-4 gap-8 px-8 py-4">
        <Suspense fallback={"loading..."}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="grid w-full grid-cols-4 gap-8 px-8 py-4">
        <Suspense fallback={"loading..."}>
          <OtherCardWrapper />
        </Suspense>
      </div>
      <div className="grid w-full grid-cols-4 gap-8 px-8 py-4">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Generic Graph 1</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardGraph />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Generic List 1</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <GenericList />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
