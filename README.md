# combokit

<!-- ALL-CONTRIBUTORS-BADGE:START --><!-- ALL-CONTRIBUTORS-BADGE:END -->
[![npm version](https://img.shields.io/npm/v/combokit.svg)](https://www.npmjs.com/package/combokit)
[![npm downloads](https://img.shields.io/npm/dm/combokit.svg)](https://www.npmjs.com/package/combokit)
[![CI](https://img.shields.io/github/actions/workflow/status/trananhtung/combokit/ci.yml?branch=main)](https://github.com/trananhtung/combokit/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Zero-dependency combinatorics toolkit with lazy generators — the npm equivalent of Python's `itertools` combinations/permutations, Ruby's `Array#combination`, and Go's `golang.org/x/exp/slices`.**

```ts
import { combinations, permutations, powerSet, cartesianProduct } from "combokit";

[...combinations([1, 2, 3, 4], 2)]
// [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

[...permutations(["a", "b", "c"])]
// ["a","b","c"], ["a","c","b"], ["b","a","c"], ... (6 total)

[...powerSet([1, 2, 3])]
// [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]

[...cartesianProduct([1, 2], ["x", "y"])]
// [1,"x"], [1,"y"], [2,"x"], [2,"y"]
```

## Why combokit?

Every major language ships combinatorics built-in or in the standard library:
- **Python**: `itertools.combinations`, `itertools.permutations`, `itertools.product`
- **Ruby**: `Array#combination`, `Array#permutation`, `Array#repeated_combination`
- **Java**: Apache Commons `CombinatoricsUtils`
- **C#**: more/LINQ `Combinations`, `Permutations`
- **Go**: `golang.org/x/exp/iter`

JavaScript/npm has no well-maintained, TypeScript-native equivalent. Existing packages (`js-combinatorics`, `combinatorics`) are either unmaintained, CommonJS-only, or lack TypeScript support. `combokit` fills the gap.

## Features

- **`combinations(pool, r)`** — C(n,r) without repetition
- **`combinationsWithReplacement(pool, r)`** — C(n+r-1, r) with repetition
- **`permutations(pool, r?)`** — P(n,r) without repetition
- **`permutationsWithReplacement(pool, r)`** — n^r with repetition
- **`powerSet(pool)`** — all 2^n subsets, size-ordered
- **`nonEmptyPowerSet(pool)`** — all non-empty subsets
- **`cartesianProduct(...pools)`** — N-ary Cartesian product
- **`productRepeat(pool, r)`** — Cartesian product of pool with itself r times
- **Counting functions**: `countCombinations`, `countPermutations` (BigInt-safe, no overflow)
- **Utility functions**: `collect`, `count`, `take`, `skip` — ergonomic generator helpers
- All generators are **lazy** — huge pools don't allocate upfront
- **Zero dependencies**, TypeScript-first, ESM + CJS dual format

## Install

```bash
npm install combokit
```

## Usage

### Combinations

```ts
import { combinations, combinationsWithReplacement, countCombinations } from "combokit";

// Without repetition (order doesn't matter)
[...combinations([1, 2, 3, 4], 2)]
// [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

countCombinations(10, 3); // 120 — exact, BigInt-safe

// With repetition (multiset combinations)
[...combinationsWithReplacement([1, 2, 3], 2)]
// [[1,1],[1,2],[1,3],[2,2],[2,3],[3,3]]
```

### Permutations

```ts
import { permutations, permutationsWithReplacement, countPermutations } from "combokit";

// r-length permutations without repetition
[...permutations([1, 2, 3], 2)]
// [[1,2],[1,3],[2,1],[2,3],[3,1],[3,2]]

// Full permutations (r = n)
[...permutations(["a", "b", "c"])]
// 6 items: abc, acb, bac, bca, cab, cba

countPermutations(5, 2); // 20

// Permutations with repetition (= Cartesian product of pool with itself)
[...permutationsWithReplacement([0, 1], 3)]
// 8 items: [0,0,0] through [1,1,1]
```

### Power Set

```ts
import { powerSet, nonEmptyPowerSet } from "combokit";

// All 2^n subsets, sorted by size then lexicographic order
[...powerSet([1, 2, 3])]
// [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]

// Exclude the empty set
[...nonEmptyPowerSet([1, 2, 3])]
// [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]
```

### Cartesian Product

```ts
import { cartesianProduct, productRepeat } from "combokit";

// N-ary product of different pools
[...cartesianProduct([1, 2], ["a", "b"], [true, false])]
// [1,"a",true], [1,"a",false], [1,"b",true], ... (8 total)

// Pool repeated r times (like Python itertools.product(pool, repeat=r))
[...productRepeat([0, 1, 2], 2)]
// [0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]
```

### Lazy generators + utilities

Generators are **lazy** — only compute one item at a time:

```ts
import { combinations, take, count, collect } from "combokit";

// C(50,3) = 19,600 items — no upfront allocation
const gen = combinations(Array.from({length: 50}, (_, i) => i), 3);

// Grab just the first 5
const first5 = collect(take(gen, 5));

// Count without materializing everything
count(combinations(Array.from({length: 20}, (_, i) => i), 5)); // 15504
```

## API Reference

| Export | Description |
|--------|-------------|
| `combinations(pool, r)` | C(n,r) without repetition. Generator. |
| `combinationsWithReplacement(pool, r)` | C(n+r-1,r) with repetition. Generator. |
| `countCombinations(n, r)` | C(n,r) count. BigInt-safe. |
| `permutations(pool, r?)` | P(n,r) without repetition. Generator. |
| `permutationsWithReplacement(pool, r)` | n^r with repetition. Generator. |
| `countPermutations(n, r?)` | P(n,r) count. BigInt-safe. |
| `powerSet(pool)` | All 2^n subsets, size-ordered. Generator. |
| `nonEmptyPowerSet(pool)` | Power set minus empty set. Generator. |
| `cartesianProduct(...pools)` | N-ary Cartesian product. Generator. |
| `productRepeat(pool, r)` | Pool × itself r times. Generator. |
| `collect(gen)` | Eagerly collect generator to array. |
| `count(gen)` | Count items without materializing. |
| `take(gen, n)` | First n items. Generator. |
| `skip(gen, n)` | Skip first n items. Generator. |

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START --><!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT © [trananhtung](https://github.com/trananhtung)
