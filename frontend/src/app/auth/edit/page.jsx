import { Suspense } from "react";
import { UserTable } from "@/components/auth/userTable";
import AddUser from "@/components/auth/addUser";

export default async function UserOverview() {
  return (
    <>
      <h1 className="p-6 text-4xl font-bold">User Overview</h1>
      <p className="p-4">Manage Student Users</p>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex w-full flex-col items-center justify-between gap-2 px-4">
          <UserTable />
        </div>
      </Suspense>
      <div className="p-4">
        <AddUser />
      </div>
    </>
  );
}
