/**
 * @flow
 */

export function update<T>(items: T[], i: number, data: $Shape<T>): T[] {
  return [...items.slice(0, i), { ...items[i], ...data }, ...items.slice(i + 1)]
}

export function push<T>(items: T[], elt: T): T[] {
  return [...items, elt]
}

export function remove<T>(items: T[], i: number): T[] {
  return [...items.slice(0, i), ...items.slice(i + 1)]
}
