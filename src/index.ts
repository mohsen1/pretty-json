type Primitive = string | number | null | undefined | bigint | boolean | symbol;
type AnyFunction = (...args: any[]) => any;

class PrettyJSONError extends Error {
  name = "PrettyJSONError";
}

class PrettyJSON extends HTMLElement {
  declare shadowRoot: ShadowRoot;
  #input: any;
  #isExpanded: boolean = false;

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

    // Attach a shadow root to the element.
    this.attachShadow({ mode: "open" });
  }

  #toggle() {
    this.#isExpanded = !this.#isExpanded;
    this.shadowRoot.replaceChild(
      this.#createChild(this.#input),
      this.shadowRoot.querySelector(".container")!
    );
  }

  #createChild(input: Record<any, any> | any[] | Primitive | AnyFunction) {
    switch (typeof input) {
      case "object": {
        if (Array.isArray(input)) {
          return this.#createArray(input);
        } else if (input === null) {
          return this.#createPrimitive(null);
        } else {
          return this.#createObject(input);
        }
      }
      case "string":
      case "number":
      case "bigint":
      case "boolean":
      case "symbol":
      case "undefined":
        return this.#createPrimitive(input);
      default:
        throw new Error(`Unknown type of object: ${typeof input}`);
    }
  }

  #createPrimitive(input: Primitive) {
    const container = document.createElement("div");
    const type = typeof input === "object" ? "null" : typeof input;
    container.className = `primitive value ${type}`;
    container.textContent = JSON.stringify(input);
    return container;
  }

  #createObject(object: Record<any, any>) {
    const container = document.createElement("div");
    container.className = "container object";
    const arrow = document.createElement("button");
    arrow.className = "arrow";
    if (this.#isExpanded) {
      arrow.classList.add("expanded");
    }
    arrow.addEventListener("click", this.#toggle.bind(this));
    container.appendChild(arrow);
    const openingBrace = document.createElement("span");
    openingBrace.className = "open brace";
    openingBrace.textContent = "{";
    const closingBrace = document.createElement("span");
    closingBrace.className = "close brace";
    closingBrace.textContent = "}";
    container.appendChild(openingBrace);

    if (!this.#isExpanded) {
      const ellipsis = document.createElement("button");
      ellipsis.className = "ellipsis";
      container.appendChild(ellipsis);
      ellipsis.addEventListener("click", this.#toggle.bind(this));
      container.appendChild(closingBrace);
      return container;
    }

    Object.entries(object).forEach(([key, value]) => {
      const rowContainer = document.createElement("div");
      rowContainer.className = "row";
      const keyElement = document.createElement("span");
      keyElement.className = "key";
      const keyText = document.createElement("span");
      keyText.textContent = JSON.stringify(key);
      keyElement.appendChild(keyText);
      const colon = document.createElement("span");
      colon.className = "colon";
      colon.textContent = ":";
      keyElement.appendChild(colon);
      rowContainer.appendChild(keyElement);
      rowContainer.appendChild(this.#createChild(value));
      container.appendChild(rowContainer);
    });

    container.appendChild(closingBrace);
    return container;
  }

  #createArray(array: any[]) {
    const container = document.createElement("div");

    // TODO
    return container;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "expand") {
      if (oldValue !== newValue) {
        this.#toggle();
      }
    }
  }

  connectedCallback() {
    this.#isExpanded = this.getAttribute("expand") !== "false";
    this.shadowRoot.appendChild(this.#createChild(this.#input));

    // Hack for styles for now
    const styles = document.createElement("style");
    styles.textContent =
      document.getElementById("pretty-json-styles")!.textContent;
    this.shadowRoot.appendChild(styles);
  }
}

// Define pretty-json custom element
customElements.define("pretty-json", PrettyJSON);
