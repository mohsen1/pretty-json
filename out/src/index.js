"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PrettyJSON_instances, _a, _PrettyJSON_input, _PrettyJSON_isExpanded, _PrettyJSON_assignIsExpanded, _PrettyJSON_expandAttributeValue_get, _PrettyJSON_toggle, _PrettyJSON_createChild, _PrettyJSON_isPrimitiveValue, _PrettyJSON_createPrimitiveValueElement, _PrettyJSON_createContainer, _PrettyJSON_createObjectOrArray, _PrettyJSON_createArrowElement, _PrettyJSON_createKeyElement, _PrettyJSON_render;
class PrettyJSONError extends Error {
    constructor() {
        super(...arguments);
        this.name = "PrettyJSONError";
    }
}
class PrettyJSON extends HTMLElement {
    static get observedAttributes() {
        return ["expand", "key"];
    }
    constructor() {
        super();
        _PrettyJSON_instances.add(this);
        _PrettyJSON_input.set(this, void 0);
        _PrettyJSON_isExpanded.set(this, void 0);
        // Attach a shadow root to the element.
        this.attachShadow({ mode: "open" });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_render).call(this);
    }
    connectedCallback() {
        try {
            __classPrivateFieldSet(this, _PrettyJSON_input, JSON.parse(this.textContent), "f");
        }
        catch (jsonParseError) {
            throw new PrettyJSONError(jsonParseError.message);
        }
        __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_render).call(this);
    }
}
_a = PrettyJSON, _PrettyJSON_input = new WeakMap(), _PrettyJSON_isExpanded = new WeakMap(), _PrettyJSON_instances = new WeakSet(), _PrettyJSON_assignIsExpanded = function _PrettyJSON_assignIsExpanded() {
    const expandAttribute = this.getAttribute("expand");
    if (expandAttribute === null) {
        __classPrivateFieldSet(this, _PrettyJSON_isExpanded, true, "f");
    }
    else {
        __classPrivateFieldSet(this, _PrettyJSON_isExpanded, Number.parseInt(expandAttribute) === 1, "f");
    }
}, _PrettyJSON_expandAttributeValue_get = function _PrettyJSON_expandAttributeValue_get() {
    const expandAttribute = this.getAttribute("expand");
    if (expandAttribute === null) {
        return 1;
    }
    return Number.parseInt(expandAttribute);
}, _PrettyJSON_toggle = function _PrettyJSON_toggle() {
    const expandValue = __classPrivateFieldGet(this, _PrettyJSON_instances, "a", _PrettyJSON_expandAttributeValue_get);
    const newExpandAttribute = __classPrivateFieldGet(this, _PrettyJSON_isExpanded, "f")
        ? Math.max(expandValue - 1, 0)
        : expandValue + 1;
    this.setAttribute("expand", String(newExpandAttribute));
    __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_assignIsExpanded).call(this);
    __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_render).call(this);
}, _PrettyJSON_createChild = function _PrettyJSON_createChild(input, expand, key) {
    if (__classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_isPrimitiveValue).call(this, input)) {
        const container = __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_createContainer).call(this);
        container.appendChild(__classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_createPrimitiveValueElement).call(this, input));
        return container;
    }
    return __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_createObjectOrArray).call(this, input);
}, _PrettyJSON_isPrimitiveValue = function _PrettyJSON_isPrimitiveValue(input) {
    return typeof input !== "object" || input === null;
}, _PrettyJSON_createPrimitiveValueElement = function _PrettyJSON_createPrimitiveValueElement(input) {
    const container = document.createElement("div");
    const type = typeof input === "object" ? "null" : typeof input;
    container.className = `primitive value ${type}`;
    container.textContent = JSON.stringify(input);
    return container;
}, _PrettyJSON_createContainer = function _PrettyJSON_createContainer() {
    const container = document.createElement("div");
    container.className = "container";
    return container;
}, _PrettyJSON_createObjectOrArray = function _PrettyJSON_createObjectOrArray(object) {
    const isArray = Array.isArray(object);
    const objectKeyName = this.getAttribute("key");
    const expand = __classPrivateFieldGet(this, _PrettyJSON_instances, "a", _PrettyJSON_expandAttributeValue_get);
    const container = __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_createContainer).call(this);
    container.classList.add(isArray ? "array" : "object");
    if (objectKeyName) {
        // if objectKeyName is provided, then it is a row
        container.classList.add("row");
        const keyElement = __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_createKeyElement).call(this, objectKeyName, {
            withArrow: true,
            expanded: expand > 0,
        });
        keyElement.addEventListener("click", __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_toggle).bind(this));
        container.appendChild(keyElement);
    }
    const openingBrace = document.createElement("span");
    openingBrace.className = "open brace";
    openingBrace.textContent = isArray ? "[" : "{";
    container.appendChild(openingBrace);
    const closingBrace = document.createElement("span");
    closingBrace.className = "close brace";
    closingBrace.textContent = isArray ? "]" : "}";
    if (expand === 0) {
        const ellipsis = document.createElement("button");
        ellipsis.className = "ellipsis";
        container.appendChild(ellipsis);
        ellipsis.addEventListener("click", __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_toggle).bind(this));
        container.appendChild(closingBrace);
        return container;
    }
    Object.entries(object).forEach(([key, value], index) => {
        // for primitives we make a row here
        if (__classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_isPrimitiveValue).call(this, value)) {
            const rowContainer = document.createElement("div");
            rowContainer.className = "row";
            if (!isArray) {
                const keyElement = __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_createKeyElement).call(this, key);
                rowContainer.appendChild(keyElement);
            }
            rowContainer.appendChild(__classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_createPrimitiveValueElement).call(this, value));
            container.appendChild(rowContainer);
            const isLast = index === Object.keys(object).length - 1;
            if (!isLast) {
                const comma = document.createElement("span");
                comma.className = "comma";
                comma.textContent = ",";
                rowContainer.appendChild(comma);
            }
            return;
        }
        // for objects and arrays we make a "container row"
        //   container.appendChild(this.#createObjectOrArray(value, expand - 1, key));
        const prettyJsonElement = document.createElement("pretty-json");
        prettyJsonElement.textContent = JSON.stringify(value);
        prettyJsonElement.setAttribute("expand", String(expand - 1));
        prettyJsonElement.setAttribute("key", key);
        container.appendChild(prettyJsonElement);
    });
    container.appendChild(closingBrace);
    return container;
}, _PrettyJSON_createArrowElement = function _PrettyJSON_createArrowElement({ expanded = false } = {}) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("class", "arrow");
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("class", "triangle");
    polygon.setAttribute("points", "0,0 100,50 0,100");
    if (expanded) {
        polygon.setAttribute("transform", "rotate(90 50 50)");
    }
    svg.appendChild(polygon);
    return svg;
}, _PrettyJSON_createKeyElement = function _PrettyJSON_createKeyElement(key, { withArrow = false, expanded = false } = {}) {
    const keyElement = document.createElement(withArrow ? "button" : "span");
    keyElement.className = "key";
    if (withArrow) {
        const arrow = __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_createArrowElement).call(this, { expanded });
        keyElement.appendChild(arrow);
    }
    const keyName = document.createElement("span");
    keyName.className = "key-name";
    keyName.textContent = JSON.stringify(key);
    keyElement.appendChild(keyName);
    const colon = document.createElement("span");
    colon.className = "colon";
    colon.textContent = ":";
    keyElement.appendChild(colon);
    return keyElement;
}, _PrettyJSON_render = function _PrettyJSON_render() {
    __classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_assignIsExpanded).call(this);
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(__classPrivateFieldGet(this, _PrettyJSON_instances, "m", _PrettyJSON_createChild).call(this, __classPrivateFieldGet(this, _PrettyJSON_input, "f"), __classPrivateFieldGet(this, _PrettyJSON_instances, "a", _PrettyJSON_expandAttributeValue_get)));
    if (this.shadowRoot.querySelector("[data-pretty-json]")) {
        return;
    }
    const styles = document.createElement("style");
    styles.setAttribute("data-pretty-json", "");
    styles.textContent = _a.styles;
    this.shadowRoot.appendChild(styles);
};
PrettyJSON.styles = `/* css */
    :host {
      --key-color: #c00;
      --arrow-color: #737373;
      --brace-color: #0030f0;
      --bracket-color: #0030f0;
      --string-color: #090;
      --number-color: #00f;
      --undefined-color: #666;
      --null-color: #666;
      --boolean-color: #d23c91;
      --comma-color: #666;
      --ellipsis-color: #666;
    }
    button {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: inherit;
      font-size: 1rem;
      vertical-align: text-bottom;
    }
    .container {
      font-family: monospace;
      font-size: 1rem;
    }
    .key {
      color: var(--key-color);
      margin-right: 0.5rem;
      padding: 0;
    }
    .key .arrow {
      width: 1rem;
      height: 0.75rem;
      margin-left: -1.25rem;
      padding-right: 0.25rem;
      vertical-align: baseline;
    }
    .arrow .triangle {
      fill: var(--arrow-color);
    }
    .comma {
      color: var(--comma-color);
    }
    .brace {
      color: var(--brace-color);
    }
    .string {
      color: var(--string-color);
    }
    .number,
    .bigint {
      color: var(--number-color);
    }
    .undefined {
      color: var(--undefined-color);
    }
    .null {
      color: var(--null-color);
    }
    .boolean {
      color: var(--boolean-color);
    }

    .ellipsis {
      width: 1rem;
      padding: 0;
      color: var(--ellipsis-color);
    }
    .ellipsis::after {
      content: "…";
    }
    .triangle {
      fill: black;
      stroke: black;
      stroke-width: 0;
    }
    .row {
      padding-left: 2rem;
    }
    .row .row {
      display: block;
    }
    .row > div,
    .row > span {
      display: inline-block;
    }
  `;
// Define pretty-json custom element
customElements.define("pretty-json", PrettyJSON);
