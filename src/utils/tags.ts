export const truncateTags = (tags: string[], max: number): string[] =>
  tags.length > max ? [...tags.slice(0, max), `+${tags.length - max}`] : tags;