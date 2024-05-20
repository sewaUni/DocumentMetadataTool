import { fetchAllPersons } from "@/lib/data";

export async function GenericList() {
  const authors = await fetchAllPersons();
  return (
    <div className="h-96 space-y-8 overflow-x-auto">
      {authors.map((author) => (
        <ListItem
          key={author.id}
          name={author.name}
          email={author.email}
          number={42}
        />
      ))}
    </div>
  );
}

export function ListItem({ name, email, number }) {
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
