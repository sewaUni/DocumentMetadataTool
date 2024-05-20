import { fetchMethodologyStatistics } from "@/lib/data";

export async function MethodologyList() {
  const methodologies = await fetchMethodologyStatistics();
  return (
    <div className="space-y-8 overflow-x-auto pr-2">
      {methodologies.map((method) => (
        <ListItem key={method.name} name={method.name} number={method.count} />
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
