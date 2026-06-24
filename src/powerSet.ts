/**
 * Yield all subsets of `pool` (the power set), from smallest to largest,
 * then in lexicographic order within each size.
 *
 * Total items yielded: 2^n (including the empty set).
 *
 * Equivalent to iterating over all combinations of sizes 0..n.
 *
 * @example
 * [...powerSet([1,2,3])]
 * // [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
 */
export function* powerSet<T>(pool: readonly T[]): Generator<T[]> {
  const n = pool.length;
  for (let r = 0; r <= n; r++) {
    yield* subsetsBySize(pool, r);
  }
}

function* subsetsBySize<T>(pool: readonly T[], r: number): Generator<T[]> {
  const n = pool.length;
  if (r === 0) { yield []; return; }
  if (r > n) return;
  const indices = Array.from({ length: r }, (_, i) => i);
  yield indices.map((i) => pool[i]!);
  while (true) {
    let pivot = -1;
    for (let i = r - 1; i >= 0; i--) {
      if (indices[i]! < n - r + i) { pivot = i; break; }
    }
    if (pivot === -1) return;
    indices[pivot]!++;
    for (let i = pivot + 1; i < r; i++) indices[i] = indices[i - 1]! + 1;
    yield indices.map((i) => pool[i]!);
  }
}

/**
 * Yield only the non-empty subsets of `pool` (power set minus the empty set).
 */
export function* nonEmptyPowerSet<T>(pool: readonly T[]): Generator<T[]> {
  for (const subset of powerSet(pool)) {
    if (subset.length > 0) yield subset;
  }
}
