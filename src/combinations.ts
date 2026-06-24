/**
 * Yield all r-length combinations of `pool` without repetition, in
 * lexicographic order of the pool indices.
 *
 * Equivalent to Python `itertools.combinations(pool, r)` and
 * Ruby `Array#combination(r)`.
 *
 * @example
 * [...combinations([1,2,3], 2)]  // [[1,2],[1,3],[2,3]]
 */
export function* combinations<T>(pool: readonly T[], r: number): Generator<T[]> {
  const n = pool.length;
  if (r < 0 || !Number.isInteger(r)) throw new RangeError(`combinations: r must be a non-negative integer, got ${r}`);
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
 * Yield all r-length combinations of `pool` **with replacement** (repetition
 * allowed), in lexicographic order.
 *
 * Equivalent to Python `itertools.combinations_with_replacement(pool, r)`.
 *
 * @example
 * [...combinationsWithReplacement([1,2,3], 2)]
 * // [[1,1],[1,2],[1,3],[2,2],[2,3],[3,3]]
 */
export function* combinationsWithReplacement<T>(pool: readonly T[], r: number): Generator<T[]> {
  const n = pool.length;
  if (r < 0 || !Number.isInteger(r)) throw new RangeError(`combinationsWithReplacement: r must be a non-negative integer`);
  if (r === 0) { yield []; return; }
  if (n === 0) return;

  const indices = new Array<number>(r).fill(0);

  yield indices.map((i) => pool[i]!);

  while (true) {
    let pivot = -1;
    for (let i = r - 1; i >= 0; i--) {
      if (indices[i]! < n - 1) { pivot = i; break; }
    }
    if (pivot === -1) return;

    const val = indices[pivot]! + 1;
    for (let i = pivot; i < r; i++) indices[i] = val;

    yield indices.map((i) => pool[i]!);
  }
}

/**
 * Count C(n, r) = n! / (r! * (n-r)!) without overflow (uses BigInt internally
 * then converts back). Returns 0 for invalid inputs.
 */
export function countCombinations(n: number, r: number): number {
  if (r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) return 0;
  if (r === 0 || r === n) return 1;
  r = Math.min(r, n - r); // symmetry
  let result = BigInt(1);
  for (let i = 0; i < r; i++) {
    result = result * BigInt(n - i) / BigInt(i + 1);
  }
  return Number(result);
}
