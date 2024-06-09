import { fetchSupervisorStatistics } from "@/lib/data";
import Link from "next/link";

export async function SupervisorList() {
  const supervisors = await fetchSupervisorStatistics();
  return (
    <div className="h-80 space-y-8 overflow-x-auto pr-2">
      {supervisors.map((supervisor) => (
        <ListItem
          key={supervisor.id}
          id={supervisor.id}
          name={supervisor.name}
          email={supervisor.email}
          number={supervisor.papers}
        />
      ))}
    </div>
  );
}

function ListItem({ id, name, email, number }) {
  return (
    <div className="flex items-center">
      <div className="ml-4 space-y-1">
        <Link
          className="line-clamp-1 text-sm font-medium underline"
          href={`/authors/${id}`}
        >
          {name}
        </Link>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="ml-auto font-medium">{number}</div>
    </div>
  );
}
