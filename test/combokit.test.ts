import {
  combinations,
  combinationsWithReplacement,
  countCombinations,
  permutations,
  permutationsWithReplacement,
  countPermutations,
  powerSet,
  nonEmptyPowerSet,
  cartesianProduct,
  productRepeat,
  collect,
  count,
  take,
  skip,
} from "../src/index.js";

// ────────────────────────────────────────────────────────────────
// combinations
// ────────────────────────────────────────────────────────────────
describe("combinations", () => {
  test("C(3,2) = [[1,2],[1,3],[2,3]]", () => {
    expect(collect(combinations([1, 2, 3], 2))).toEqual([[1, 2], [1, 3], [2, 3]]);
  });

  test("C(4,2) has 6 items", () => {
    expect(count(combinations([1, 2, 3, 4], 2))).toBe(6);
  });

  test("r=0 yields one empty array", () => {
    expect(collect(combinations([1, 2], 0))).toEqual([[]]);
  });

  test("r > n yields nothing", () => {
    expect(collect(combinations([1, 2], 5))).toEqual([]);
  });

  test("r = n yields one full item", () => {
    expect(collect(combinations([1, 2, 3], 3))).toEqual([[1, 2, 3]]);
  });

  test("empty pool", () => {
    expect(collect(combinations([], 0))).toEqual([[]]);
    expect(collect(combinations([], 1))).toEqual([]);
  });

  test("works with strings", () => {
    expect(collect(combinations(["a", "b", "c"], 2))).toEqual([
      ["a", "b"], ["a", "c"], ["b", "c"],
    ]);
  });

  test("negative r throws", () => {
    expect(() => collect(combinations([1], -1))).toThrow(RangeError);
  });

  test("non-integer r throws", () => {
    expect(() => collect(combinations([1, 2], 1.5))).toThrow(RangeError);
  });
});

// ────────────────────────────────────────────────────────────────
// combinationsWithReplacement
// ────────────────────────────────────────────────────────────────
describe("combinationsWithReplacement", () => {
  test("AA(3,2)", () => {
    expect(collect(combinationsWithReplacement([1, 2, 3], 2))).toEqual([
      [1, 1], [1, 2], [1, 3], [2, 2], [2, 3], [3, 3],
    ]);
  });

  test("r=0 yields one empty array", () => {
    expect(collect(combinationsWithReplacement([1, 2], 0))).toEqual([[]]);
  });

  test("empty pool yields nothing", () => {
    expect(collect(combinationsWithReplacement([], 1))).toEqual([]);
  });

  test("count is C(n+r-1, r)", () => {
    // C(3+2-1, 2) = C(4,2) = 6
    expect(count(combinationsWithReplacement([1, 2, 3], 2))).toBe(6);
  });
});

// ────────────────────────────────────────────────────────────────
// countCombinations
// ────────────────────────────────────────────────────────────────
describe("countCombinations", () => {
  test("C(5,2) = 10", () => expect(countCombinations(5, 2)).toBe(10));
  test("C(10,3) = 120", () => expect(countCombinations(10, 3)).toBe(120));
  test("C(n,0) = 1", () => expect(countCombinations(7, 0)).toBe(1));
  test("C(n,n) = 1", () => expect(countCombinations(5, 5)).toBe(1));
  test("C(n,n+1) = 0", () => expect(countCombinations(3, 4)).toBe(0));
  test("C(20,10) = 184756", () => expect(countCombinations(20, 10)).toBe(184756));
});

// ────────────────────────────────────────────────────────────────
// permutations
// ────────────────────────────────────────────────────────────────
describe("permutations", () => {
  test("P(3,2) has 6 items", () => {
    expect(count(permutations([1, 2, 3], 2))).toBe(6);
  });

  test("P(3,2) correct items", () => {
    expect(collect(permutations([1, 2, 3], 2))).toEqual([
      [1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2],
    ]);
  });

  test("full permutations of [1,2,3]", () => {
    expect(count(permutations([1, 2, 3]))).toBe(6);
  });

  test("P(4,4) = 24", () => {
    expect(count(permutations([1, 2, 3, 4]))).toBe(24);
  });

  test("r=0 yields one empty array", () => {
    expect(collect(permutations([1, 2, 3], 0))).toEqual([[]]);
  });

  test("r > n yields nothing", () => {
    expect(collect(permutations([1, 2], 5))).toEqual([]);
  });

  test("negative r throws", () => {
    expect(() => collect(permutations([1], -1))).toThrow(RangeError);
  });

  test("works with string pool", () => {
    const all = collect(permutations(["a", "b", "c"]));
    expect(all).toHaveLength(6);
    expect(all[0]).toEqual(["a", "b", "c"]);
  });
});

// ────────────────────────────────────────────────────────────────
// permutationsWithReplacement
// ────────────────────────────────────────────────────────────────
describe("permutationsWithReplacement", () => {
  test("[0,1]^2 = 4 items", () => {
    expect(collect(permutationsWithReplacement([0, 1], 2))).toEqual([
      [0, 0], [0, 1], [1, 0], [1, 1],
    ]);
  });

  test("r=0 yields one empty array", () => {
    expect(collect(permutationsWithReplacement([1, 2], 0))).toEqual([[]]);
  });

  test("empty pool r=1 yields nothing", () => {
    expect(collect(permutationsWithReplacement([], 1))).toEqual([]);
  });

  test("count is n^r", () => {
    expect(count(permutationsWithReplacement([1, 2, 3], 3))).toBe(27);
  });
});

// ────────────────────────────────────────────────────────────────
// countPermutations
// ────────────────────────────────────────────────────────────────
describe("countPermutations", () => {
  test("P(5,2) = 20", () => expect(countPermutations(5, 2)).toBe(20));
  test("P(5) = 120", () => expect(countPermutations(5)).toBe(120));
  test("P(n,0) = 1", () => expect(countPermutations(7, 0)).toBe(1));
  test("P(n,n+1) = 0", () => expect(countPermutations(3, 4)).toBe(0));
});

// ────────────────────────────────────────────────────────────────
// powerSet
// ────────────────────────────────────────────────────────────────
describe("powerSet", () => {
  test("powerSet([1,2,3]) = 8 subsets", () => {
    expect(count(powerSet([1, 2, 3]))).toBe(8);
  });

  test("powerSet([1,2,3]) correct", () => {
    expect(collect(powerSet([1, 2, 3]))).toEqual([
      [], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3],
    ]);
  });

  test("powerSet([]) yields only empty set", () => {
    expect(collect(powerSet([]))).toEqual([[]]);
  });

  test("powerSet size is 2^n", () => {
    expect(count(powerSet([1, 2, 3, 4]))).toBe(16);
  });
});

describe("nonEmptyPowerSet", () => {
  test("excludes empty set", () => {
    const sets = collect(nonEmptyPowerSet([1, 2, 3]));
    expect(sets).toHaveLength(7);
    expect(sets.some((s) => s.length === 0)).toBe(false);
  });
});

// ────────────────────────────────────────────────────────────────
// cartesianProduct
// ────────────────────────────────────────────────────────────────
describe("cartesianProduct", () => {
  test("[1,2] × ['a','b']", () => {
    expect(collect(cartesianProduct([1, 2], ["a", "b"]))).toEqual([
      [1, "a"], [1, "b"], [2, "a"], [2, "b"],
    ]);
  });

  test("empty pool short-circuits", () => {
    expect(collect(cartesianProduct([1, 2], [], [3]))).toEqual([]);
  });

  test("no pools yields one empty array", () => {
    expect(collect(cartesianProduct())).toEqual([[]]);
  });

  test("single pool", () => {
    expect(collect(cartesianProduct([1, 2, 3]))).toEqual([[1], [2], [3]]);
  });

  test("count = product of lengths", () => {
    expect(count(cartesianProduct([1, 2], [3, 4], [5, 6, 7]))).toBe(12);
  });
});

// ────────────────────────────────────────────────────────────────
// productRepeat
// ────────────────────────────────────────────────────────────────
describe("productRepeat", () => {
  test("[0,1]^3 = 8 items", () => {
    expect(count(productRepeat([0, 1], 3))).toBe(8);
  });

  test("[0,1]^2 items correct", () => {
    expect(collect(productRepeat([0, 1], 2))).toEqual([
      [0, 0], [0, 1], [1, 0], [1, 1],
    ]);
  });

  test("repeat=0 yields one empty array", () => {
    expect(collect(productRepeat([1, 2], 0))).toEqual([[]]);
  });

  test("empty pool yields nothing", () => {
    expect(collect(productRepeat([], 1))).toEqual([]);
  });

  test("negative repeat throws", () => {
    expect(() => collect(productRepeat([1, 2], -1))).toThrow(RangeError);
  });
});

// ────────────────────────────────────────────────────────────────
// collect / count / take / skip
// ────────────────────────────────────────────────────────────────
describe("collect", () => {
  test("collects generator to array", () => {
    expect(collect(combinations([1, 2, 3], 2))).toHaveLength(3);
  });
});

describe("count", () => {
  test("counts without materializing", () => {
    expect(count(permutations([1, 2, 3, 4]))).toBe(24);
  });
});

describe("take", () => {
  test("take first 3", () => {
    expect(collect(take(combinations([1, 2, 3, 4, 5], 2), 3))).toHaveLength(3);
  });

  test("take more than available returns all", () => {
    expect(collect(take(combinations([1, 2], 2), 100))).toHaveLength(1);
  });
});

describe("skip", () => {
  test("skip first 2", () => {
    const all = collect(combinations([1, 2, 3, 4], 2)); // 6 items
    const skipped = collect(skip(combinations([1, 2, 3, 4], 2), 2));
    expect(skipped).toHaveLength(4);
    expect(skipped).toEqual(all.slice(2));
  });
});
