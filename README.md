# `<pretty-json>` HTML Custom Element

[**See the live demo**](https://azimi.me/pretty-json/)

`<pretty-json>` is an HTML custom element that allows you to render JSON objects in HTML documents with human-readable formatting and expandable interaction for browsing deep JSON structures.

## Usage

Include [`pretty-json-custom-element/index.js`](https://github.com/mohsen1/pretty-json/blob/main/index.js) in your HTML page and use the HTML custom element as follows:

<!-- prettier-ignore-start -->
```html
<script defer src="https://unpkg.com/pretty-json-custom-element/index.js"></script>
<pretty-json>
{
  "hello": "world",
  "value": 42,
  "enabled": true,
  "extra": null,
  "nested": { "key": "value" }
}
</pretty-json>
````
<!-- prettier-ignore-end -->

Your JSON will be rendered as a human-readable format:

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/mohsen1/pretty-json/raw/main/screenshot-dark.png" />
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/mohsen1/pretty-json/raw/main/screenshot.png" />
  <img src="https://github.com/mohsen1/pretty-json/raw/main/screenshot.png" alt="Screenshot" width="200px" />
</picture>

## Features

- Outputs a valid JSON string that can be copied and pasted into a JSON file
- HTML Custom Element without any dependencies, works in any modern browser
- No need to install any dependencies or build tools, just drop the script in your HTML and start using it
- Allows a high level of customization using CSS variables
- Display large JSON objects with expandable and collapsible sections
- Supports truncating very large strings and arrays with an ellipsis

## To-do List

- [ ] Support grouping very large arrays

## Attributes

You can customize the rendering of the JSON object by setting the following attributes on the `<pretty-json>` element:

### `expand`

By default, the JSON object is rendered expanded up to 1 level deep. You can set the `expand` attribute to a number to expand the JSON object up to that level deep:

```html
<pretty-json expand="2">{"hello": {"world": "!"}}</pretty-json>
```

#### Collapsed by default

You can set the `expand` attribute to `0` to render the JSON object collapsed by default:

```html
<pretty-json expand="0">{"hello": {"world": "!"}}</pretty-json>
```

### `truncate-string`

By default, strings longer than 500 characters are truncated with an ellipsis. You can set the `truncate-string` attribute to a number to truncate strings longer than that number of characters:

```html
<pretty-json truncate-string="10">
  {"hello": "long string that will be truncated"}
</pretty-json>
```

## Customization

You can customize the appearance of the rendered JSON using CSS variables:

```css
pretty-json {
  --key-color: #cc0000;
  --arrow-color: #737373;
  --brace-color: #0030f0;
  --bracket-color: #0030f0;
  --string-color: #009900;
  --number-color: #0000ff;
  --null-color: #666666;
  --boolean-color: #d23c91;
  --comma-color: #666666;
  --ellipsis-color: #666666;
  --indent: 2rem;
  --font-family: monospace;  
  --font-size: 1rem;  
}

/* Also handle the dark mode */
@media (prefers-color-scheme: dark) {
  pretty-json {
    --key-color: #f73d3d;
    --arrow-color: #6c6c6c;
    --brace-color: #0690bc;
    --bracket-color: #0690bc;
    --string-color: #21c521;
    --number-color: #0078b3;
    --null-color: #8c8888;
    --boolean-color: #c737b3;
    --comma-color: #848181;
    --ellipsis-color: #c2c2c2;
    --indent: 2rem;
    --font-family: monospace;
    --font-size: 1rem;
  }
}
```

## Development

To run the development server:

```bash
yarn install
yarn start
```

### Running tests

This repository uses Playwright for testing.

To run the tests:

```bash
yarn test
```
