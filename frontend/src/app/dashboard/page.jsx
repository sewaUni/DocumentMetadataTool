import { Suspense } from "react";
import CardWrapper from "@/components/dashboard/cards";
import { DashboardGraph } from "@/components/dashboard/DashboardGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SupervisorList } from "@/components/dashboard/supervisorList";
import OtherCardWrapper from "@/components/dashboard/otherCards";
import { MethodologyList } from "@/components/dashboard/methodologyList";

export default function DashboardPage() {
  return (
    <>
      <h1 className={"p-6 text-4xl font-bold"}>Dashboard</h1>
      {/*<div className="grid w-full grid-cols-4 gap-8 px-8 py-4">*/}
      {/*  <Suspense fallback={"loading..."}>*/}
      {/*    <CardWrapper />*/}
      {/*  </Suspense>*/}
      {/*</div>*/}
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
            <CardTitle>Papers by Supervisor</CardTitle>
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
      </div>
    </>
  );
}
