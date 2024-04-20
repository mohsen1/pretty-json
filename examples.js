// @ts-check
/**
 * @typedef {Object} RenderingTestCase
 * @property {string} name - The name of the test case.
 * @property {*} value - The value to be rendered.
 * @property {[string, string][]} [attributes] - Optional attributes for the test case.
 */

/**
 * Array of rendering test cases.
 * @type {RenderingTestCase[]}
 */
export const TEST_CASES = [
  {
    name: "Simple Example",
    value: {
      hello: "world",
      value: 42,
      enabled: true,
      extra: null,
      nested: { key: "value" },
    },
  },
  {
    name: "Expanded",
    value: {
      hello: "world",
      value: 42,
      enabled: true,
      extra: null,
      nested: { key: "value" },
    },
    attributes: [["expand", "2"]],
  },
  {
    name: "String",
    value: "example string",
  },
  {
    name: "Number",
    value: 3232323,
  },
  {
    name: "Boolean (true)",
    value: true,
  },
  {
    name: "Boolean (false)",
    value: false,
  },
  {
    name: "Null",
    value: null,
  },
  {
    name: "URL string",
    value: "https://example.com",
  },
  {
    name: "deeply nested object",
    value: {
      deeply: { nested: { object: { with: { lots: { of: "values" } } } } },
    },
  },
  {
    name: "object with lots of keys on the first level",
    value: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
      o: 15,
      p: 16,
      q: 17,
      r: 18,
      s: 19,
      t: 20,
      u: 21,
      v: 22,
      w: 23,
      x: 24,
      y: 25,
      z: 26,
    },
  },
  {
    name: "object with very long key names",
    value: {
      /** @type {string} */
      "this is a very long key name that should be truncated": "value",
      /** @type {string} */
      "another very long key name that should be truncated": "value",
      /** @type {string} */
      "yet another very long key name that should be truncated": "value",
    },
  },
  {
    name: "Long string",
    value:
      "lorem ipsum sit dolor amet consectetur adipis elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".repeat(
        200
      ),
  },
  {
    name: "Long string with custom truncation",
    attributes: [["truncate-string", "700"]],
    value:
      "lorem ipsum sit dolor amet consectetur adipis elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".repeat(
        200
      ),
  },
  {
    name: "Large array",
    value: Array.from({ length: 100 }, (_, i) => `item ${i}`),
  },
];
