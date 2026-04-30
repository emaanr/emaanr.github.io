const parseAsUTC = (d: Date): Date =>
  new Date(d.toISOString().slice(0, 19) + "Z");

const getOffsetLabel = (d: Date, tz: string): string =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")?.value ?? "";

export const formatDate = (d: Date, tz: string) =>
  `${parseAsUTC(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })} ${getOffsetLabel(d, tz)}`;

export const formatDateTime = (d: Date, tz: string) =>
  `${parseAsUTC(d).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  })} ${getOffsetLabel(d, tz)}`;

export function groupByYear<T>(items: T[], getDate: (item: T) => Date, getTZ: (item: T) => string): Record<number, T[]> {
  const grouped = items.reduce<Record<number, T[]>>((acc, item) => {
    const year = parseAsUTC(getDate(item)).getUTCFullYear();
    (acc[year] ??= []).push(item);
    return acc;
  }, {});

  for (const year in grouped) {
    grouped[year].sort((a, b) => getDate(b).valueOf() - getDate(a).valueOf());
  }

  return grouped;
}