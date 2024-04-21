declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * `<pretty-json>` is an HTML custom element that allows you to render JSON objects
       * in HTML documents with human-readable formatting and expandable interaction for
       * browsing deep JSON structures.
       *
       * @see https://github.com/mohsen1/pretty-json
       */
      "pretty-json": {
        /**
         * By default, the JSON object is rendered expanded up to 1 level deep.
         * You can set the `expand` attribute to a number to expand the JSON object
         * up to that level deep.
         * You can set the `expand` attribute to `0` to render the JSON object
         * collapsed by default
         *
         * @default "1"
         */

        expand?: string;
        /**
         * By default, strings longer than 500 characters are truncated with an ellipsis.
         * You can set the `truncate-string` attribute to a number to truncate strings
         * longer than that number of characters
         *
         * @default "500"
         */
        "truncate-string"?: string;
      };
    }
  }
}

export {};
