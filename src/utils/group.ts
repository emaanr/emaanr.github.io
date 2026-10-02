// Relevant Fields for Groupability
// Type T must contain Groupable's Fields to use these function
type Groupable = {
  data: {
    group?: string;
    order?: number;
    updated: Date;
  };
};

export type Standalone<T> = { type: "standalone"; entry: T; updated: Date };
export type Group<T> = { type: "group"; group: string; updated: Date; groupies: T[] };

const groupMap = <T extends Groupable>(entries: T[]) => {
  const groups = new Map<string, T[]>();
  for (const entry of entries) {
    const group = entry.data.group;
    if (group) groups.set(group, [...(groups.get(group) ?? []), entry]);
  }
  return groups;
}

const groupOrder = <T extends Groupable>(groupies: T[]) => {
  return [...groupies].sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

export function groupEntries<T extends Groupable>(entries: T[]) {
  const standalones: Standalone<T>[] = entries.filter(
    (entry) => !entry.data.group
  ).map(
    (entry) => ({ type: "standalone", entry, updated: entry.data.updated })
  );

  const groups: Group<T>[] = [...groupMap(entries.filter(
    (entry) => entry.data.group
  ))].map(
    ([group, groupies]) => ({
      type: "group",
      group,
      updated: new Date(Math.max(...groupies.map((c) => c.data.updated.valueOf()))),
      groupies: groupOrder(groupies)
    })
  );

  return [...standalones, ...groups].sort((a, b) => b.updated.valueOf() - a.updated.valueOf());
}