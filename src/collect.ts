/**
 * Eagerly collect a generator into an array.
 * Convenience wrapper so callers avoid `[...gen()]` spread noise.
 */
export function collect<T>(gen: Iterable<T>): T[] {
  return [...gen];
}

/**
 * Count how many items a generator yields without materializing them.
 * Useful for large generators where you only need the count.
 */
export function count(gen: Iterable<unknown>): number {
  let n = 0;
  for (const _ of gen) n++;
  return n;
}

/**
 * Take the first `n` items from a generator.
 */
export function* take<T>(gen: Iterable<T>, n: number): Generator<T> {
  let i = 0;
  for (const item of gen) {
    if (i++ >= n) return;
    yield item;
  }
}

/**
 * Skip the first `n` items and yield the rest.
 */
export function* skip<T>(gen: Iterable<T>, n: number): Generator<T> {
  let i = 0;
  for (const item of gen) {
    if (i++ >= n) yield item;
  }
}
