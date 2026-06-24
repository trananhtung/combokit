/**
 * Yield all r-length permutations of `pool` without repetition.
 * If `r` is omitted, yields permutations of the full length.
 *
 * Equivalent to Python `itertools.permutations(pool, r)` and
 * Ruby `Array#permutation(r)`.
 *
 * @example
 * [...permutations([1,2,3], 2)]  // [[1,2],[1,3],[2,1],[2,3],[3,1],[3,2]]
 * [...permutations([1,2,3])]     // all 6 full permutations
 */
export function* permutations<T>(pool: readonly T[], r?: number): Generator<T[]> {
  const n = pool.length;
  const len = r ?? n;
  if (!Number.isInteger(len) || len < 0) throw new RangeError(`permutations: r must be a non-negative integer`);
  if (len === 0) { yield []; return; }
  if (len > n) return;

  // Heap-style approach using indices + cycles (Python's implementation)
  const indices = Array.from({ length: n }, (_, i) => i);
  const cycles = Array.from({ length: len }, (_, i) => n - i);

  yield indices.slice(0, len).map((i) => pool[i]!);

  while (true) {
    let found = false;
    for (let i = len - 1; i >= 0; i--) {
      cycles[i]!--;
      if (cycles[i] === 0) {
        // Rotate indices[i..] left by 1
        const tmp = indices[i]!;
        for (let j = i; j < n - 1; j++) indices[j] = indices[j + 1]!;
        indices[n - 1] = tmp;
        cycles[i] = n - i;
      } else {
        const j = n - cycles[i]!;
        [indices[i], indices[j]] = [indices[j]!, indices[i]!];
        yield indices.slice(0, len).map((idx) => pool[idx]!);
        found = true;
        break;
      }
    }
    if (!found) return;
  }
}

/**
 * Yield all r-length permutations of `pool` **with replacement** (repetition
 * allowed). Equivalent to the Cartesian product of `pool` with itself r times.
 *
 * Equivalent to Python `itertools.product(pool, repeat=r)`.
 *
 * @example
 * [...permutationsWithReplacement([0,1], 2)]
 * // [[0,0],[0,1],[1,0],[1,1]]
 */
export function* permutationsWithReplacement<T>(pool: readonly T[], r: number): Generator<T[]> {
  const n = pool.length;
  if (!Number.isInteger(r) || r < 0) throw new RangeError(`permutationsWithReplacement: r must be a non-negative integer`);
  if (r === 0) { yield []; return; }
  if (n === 0) return;

  const indices = new Array<number>(r).fill(0);
  yield indices.map((i) => pool[i]!);

  while (true) {
    let i = r - 1;
    while (i >= 0 && indices[i] === n - 1) { indices[i] = 0; i--; }
    if (i < 0) return;
    indices[i]!++;
    yield indices.map((idx) => pool[idx]!);
  }
}

/**
 * Count P(n, r) = n! / (n-r)! without overflow. Returns 0 for invalid inputs.
 */
export function countPermutations(n: number, r?: number): number {
  const len = r ?? n;
  if (len < 0 || len > n || !Number.isInteger(n) || !Number.isInteger(len)) return 0;
  let result = BigInt(1);
  for (let i = n; i > n - len; i--) result *= BigInt(i);
  return Number(result);
}
