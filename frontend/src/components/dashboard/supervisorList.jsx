import { fetchSupervisorStatistics } from "@/lib/data";

export async function SupervisorList() {
  const supervisors = await fetchSupervisorStatistics();
  return (
    <div className="h-96 space-y-8 overflow-x-auto pr-2">
      {supervisors.map((supervisor) => (
        <ListItem
          key={supervisor.id}
          name={supervisor.name}
          email={supervisor.email}
          number={supervisor.papers}
        />
      ))}
    </div>
  );
}

function ListItem({ name, email, number }) {
  return (
    <div className="flex items-center">
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="ml-auto font-medium">{number}</div>
    </div>
  );
}
