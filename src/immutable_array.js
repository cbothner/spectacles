export function update(items, i, data) {
  return [
    ...items.slice(0,i),
    {...items[i], ...data},
    ...items.slice(i+1),
  ]
}

export function push(items, elt) {
  return [...items, elt]
}

export function remove(items, i) {
  return [...items.slice(0,i), ...items.slice(i+1)]
}
