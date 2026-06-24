/**
 * Yield the Cartesian product of the input iterables, in lexicographic order.
 *
 * Equivalent to Python `itertools.product(*pools)` and the nested for-loop
 * equivalent in every language.
 *
 * @example
 * [...cartesianProduct([1,2], ['a','b'])]
 * // [[1,'a'],[1,'b'],[2,'a'],[2,'b']]
 *
 * // Repeat a single pool r times (like Python product(pool, repeat=r))
 * [...cartesianProduct([0,1], [0,1])]
 * // [[0,0],[0,1],[1,0],[1,1]]
 */
export function* cartesianProduct<T extends readonly unknown[][]>(
  ...pools: { [K in keyof T]: readonly T[K][number][] }
): Generator<{ [K in keyof T]: T[K][number] }> {
  if (pools.length === 0) { yield [] as never; return; }
  if (pools.some((p) => p.length === 0)) return;

  const indices = new Array<number>(pools.length).fill(0);
  while (true) {
    yield indices.map((idx, i) => pools[i]![idx]) as never;

    let i = pools.length - 1;
    while (i >= 0) {
      indices[i]!++;
      if (indices[i]! < pools[i]!.length) break;
      indices[i] = 0;
      i--;
    }
    if (i < 0) return;
  }
}

/**
 * Yield the Cartesian product of a single pool repeated `repeat` times.
 * Equivalent to Python `itertools.product(pool, repeat=r)`.
 *
 * @example
 * [...productRepeat([0,1], 3)]  // 8 items: [[0,0,0],[0,0,1],...,[1,1,1]]
 */
export function* productRepeat<T>(pool: readonly T[], repeat: number): Generator<T[]> {
  if (!Number.isInteger(repeat) || repeat < 0) throw new RangeError(`productRepeat: repeat must be a non-negative integer`);
  if (repeat === 0) { yield []; return; }
  if (pool.length === 0) return;

  const n = pool.length;
  const indices = new Array<number>(repeat).fill(0);
  yield indices.map((i) => pool[i]!);

  while (true) {
    let i = repeat - 1;
    while (i >= 0 && indices[i] === n - 1) { indices[i] = 0; i--; }
    if (i < 0) return;
    indices[i]!++;
    yield indices.map((idx) => pool[idx]!);
  }
}
