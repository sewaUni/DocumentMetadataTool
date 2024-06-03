import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser, fetchStudentUsers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trash2 } from "lucide-react";
import pb from "@/lib/pocketbase";
import { revalidatePath } from "next/cache";

export async function UserTable() {
  const users = await fetchStudentUsers();

  async function deleteAction(formData) {
    "use server";
    const userId = formData.get("id");
    console.log("Deleting user with id", userId);
    await deleteUser(userId);
  }

  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>E-Mail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.username}>
              <TableCell className="font-bold">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="font-bold">{user.name}</TableCell>
              <TableCell className="flex flex-row justify-end gap-4">
                {/*<Button variant={"secondary"}>*/}
                {/*  <RotateCcw className={"mr-2 h-4 w-4"} />*/}
                {/*  Reset Password*/}
                {/*</Button>*/}
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={user.id} />
                  <Button variant={"destructive"}>
                    <Trash2 className={"mr-2 h-4 w-4"} />
                    Delete
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total (no admins)</TableCell>
            <TableCell className="text-right">{users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
