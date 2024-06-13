// @ts-check
/**
 * @typedef {Object} RenderingTestCase
 * @property {string} name - The name of the test case.
 * @property {string} [description] - The description of the test case. (Optional)
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
    description:
      "An object with `expand` attribute set to `2`. This will expand the object to 2 levels.",
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
    name: "Collapsed",
    description:
      "An object with `expand` attribute set to `0`. This will collapse the object.",
    value: {
      hello: "world",
      value: 42,
      enabled: true,
      extra: null,
      nested: { key: "value" },
    },
  },
  {
    name: "Themed",
    description: "An object with custom styles applied.",
    attributes: [
      [
        "style",
        `
          --key-color: lime;
          --arrow-color: blue;
          --brace-color: magenta;
          --bracket-color: purple;
          --indent: 4rem;
        `
          .trim()
          .replace(/\n\s+/g, " "),
      ],
    ],
    value: {
      hello: "world",
      value: 42,
      enabled: true,
      extra: null,
      nested: { key: "value" },
    },
  },
  {
    name: "String",
    description:
      "A simple string value. All primitive types are supported as long as they are valid JSON.",
    value: "example string",
  },
  {
    name: "Number",
    description: "A simple number value.",
    value: 3232323,
  },
  {
    name: "Boolean (true)",
    description: "A boolean value with the value `true`.",
    value: true,
  },
  {
    name: "Null",
    description: "A null value.",
    value: null,
  },
  {
    name: "URL string",
    description: "A string containing a URL.",
    value: "https://example.com",
  },
  {
    name: "deeply nested object",
    description: "An object with multiple levels of nesting.",
    value: {
      deeply: { nested: { object: { with: { lots: { of: "levels" } } } } },
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
    description: "A long string that will be truncated.",
    value:
      "This long string is truncated. Clicking on ellipsis will expand it. lorem ipsum sit dolor amet consectetur adipis elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".repeat(
        200
      ),
  },
  {
    name: "Long string with custom truncation",
    description: "A long string that will be truncated with a custom length.",
    attributes: [["truncate-string", "700"]],
    value:
      "lorem ipsum sit dolor amet consectetur adipis elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".repeat(
        200
      ),
  },
];
