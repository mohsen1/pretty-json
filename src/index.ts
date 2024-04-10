type Primitive = string | number | null | undefined | bigint | boolean | symbol;
type AnyFunction = (...args: any[]) => any;

class PrettyJSONError extends Error {
  name = "PrettyJSONError";
}

class PrettyJSON extends HTMLElement {
  declare shadowRoot: ShadowRoot;
  #input: any;
  #isExpanded!: boolean;

  static get observedAttributes() {
    return ["expand", "key"];
  }

  constructor() {
    super();
    if (!this.textContent) {
      throw new PrettyJSONError("No text content was found");
    }
    try {
      this.#input = JSON.parse(this.textContent);
    } catch (jsonParseError) {
      throw new PrettyJSONError((jsonParseError as Error).message);
    }

    this.#assignIsExpanded();

    // Attach a shadow root to the element.
    this.attachShadow({ mode: "open" });
  }

  /**
   * Read from the expand attribute and set the isExpanded property
   */
  #assignIsExpanded() {
    const expandAttribute = this.getAttribute("expand");
    if (expandAttribute === null) {
      this.#isExpanded = true;
    } else {
      this.#isExpanded = Number.parseInt(expandAttribute) === 1;
    }
  }

  get #expandValue() {
    const expandAttribute = this.getAttribute("expand");
    if (expandAttribute === null) {
      return 1;
    }
    return Number.parseInt(expandAttribute);
  }

  #toggle() {
    const expandValue = this.#expandValue;
    const newExpandAttribute = this.#isExpanded
      ? expandValue + 1
      : Math.max(expandValue - 1, 0);
    this.setAttribute("expand", String(newExpandAttribute));
    this.#assignIsExpanded();
    this.#render();
  }

  #createChild(
    input: Record<any, any> | any[] | Primitive | AnyFunction,
    expand: number,
    key?: string
  ) {
    if (this.#isPrimitiveValue(input)) {
      const container = this.#createContainer();
      container.appendChild(this.#createPrimitiveValueElement(input));
      return container;
    }
    return this.#createObjectOrArray(input, expand, key);
  }

  #isPrimitiveValue(input: any): input is Primitive {
    return typeof input !== "object" || input === null;
  }

  #createPrimitiveValueElement(input: Primitive) {
    const container = document.createElement("div");
    const type = typeof input === "object" ? "null" : typeof input;
    container.className = `primitive value ${type}`;
    container.textContent = JSON.stringify(input);
    return container;
  }

  #createContainer() {
    const container = document.createElement("div");
    container.className = "container";
    return container;
  }

  #createObjectOrArray(
    object: Record<any, any> | any[],
    expand: number,
    objectKeyName?: string
  ) {
    const isArray = Array.isArray(object);

    const container = this.#createContainer();
    container.classList.add(isArray ? "array" : "object");

    if (objectKeyName) {
      // if objectKeyName is provided, then it is a row
      container.classList.add("row");
      const keyElement = this.#createKeyElement(objectKeyName, {
        withArrow: true,
        expanded: expand > 0,
      });
      keyElement.addEventListener("click", this.#toggle.bind(this));
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
      ellipsis.addEventListener("click", this.#toggle.bind(this));
      container.appendChild(closingBrace);
      return container;
    }

    Object.entries(object).forEach(([key, value], index) => {
      // for primitives we make a row here
      if (this.#isPrimitiveValue(value)) {
        const rowContainer = document.createElement("div");
        rowContainer.className = "row";
        if (!isArray) {
          const keyElement = this.#createKeyElement(key);
          rowContainer.appendChild(keyElement);
        }
        rowContainer.appendChild(this.#createPrimitiveValueElement(value));
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
      container.appendChild(this.#createObjectOrArray(value, expand - 1, key));
    });

    container.appendChild(closingBrace);
    return container;
  }

  #createArrowElement({ expanded = false } = {}) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("class", "arrow");
    const polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );

    polygon.setAttribute("class", "triangle");
    polygon.setAttribute("points", "0,0 100,50 0,100");

    if (expanded) {
      polygon.setAttribute("transform", "rotate(90 50 50)");
    }

    svg.appendChild(polygon);

    return svg;
  }

  #createKeyElement(key: string, { withArrow = false, expanded = false } = {}) {
    const keyElement = document.createElement(withArrow ? "button" : "span");
    keyElement.className = "key";
    if (withArrow) {
      const arrow = this.#createArrowElement({ expanded });
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
  }

  #render() {
    this.#assignIsExpanded();
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(
      this.#createChild(this.#input, this.#expandValue)
    );

    // Hack for styles for now
    const styles = document.createElement("style");
    styles.textContent =
      document.getElementById("pretty-json-styles")!.textContent;
    this.shadowRoot.appendChild(styles);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.#render();
  }

  connectedCallback() {
    this.#render();
  }
}

// Define pretty-json custom element
customElements.define("pretty-json", PrettyJSON);
