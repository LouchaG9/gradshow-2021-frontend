// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/lit-html/lib/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirective = exports.directive = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */

const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};

exports.directive = directive;

const isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

exports.isDirective = isDirective;
},{}],"../node_modules/lit-html/lib/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */

exports.isCEPolyfill = isCEPolyfill;

const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */


exports.reparentNodes = reparentNodes;

const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};

exports.removeNodes = removeNodes;
},{}],"../node_modules/lit-html/lib/part.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nothing = exports.noChange = void 0;

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

exports.noChange = noChange;
const nothing = {};
exports.nothing = nothing;
},{}],"../node_modules/lit-html/lib/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

exports.marker = marker;
const nodeMarker = `<!--${marker}-->`;
exports.nodeMarker = nodeMarker;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */

exports.markerRegex = markerRegex;
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */

exports.boundAttributeSuffix = boundAttributeSuffix;

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(element.content, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false); // Keeps track of the last index associated with a part. We try to delete
    // unnecessary nodes, but we never want to associate two different parts
    // to the same index. They must have a constant node between.

    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {
      strings,
      values: {
        length
      }
    } = result;

    while (partIndex < length) {
      const node = walker.nextNode();

      if (node === null) {
        // We've exhausted the content inside a nested template element.
        // Because we still have parts (the outer for-loop), we know:
        // - There is a template in the stack
        // - The walker will find a nextNode outside the template
        walker.currentNode = stack.pop();
        continue;
      }

      index++;

      if (node.nodeType === 1
      /* Node.ELEMENT_NODE */
      ) {
          if (node.hasAttributes()) {
            const attributes = node.attributes;
            const {
              length
            } = attributes; // Per
            // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
            // attributes are not guaranteed to be returned in document order.
            // In particular, Edge/IE can return them out of order, so we cannot
            // assume a correspondence between part index and attribute index.

            let count = 0;

            for (let i = 0; i < length; i++) {
              if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                count++;
              }
            }

            while (count-- > 0) {
              // Get the template literal section leading up to the first
              // expression in this attribute
              const stringForPart = strings[partIndex]; // Find the attribute name

              const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
              // All bound attributes have had a suffix added in
              // TemplateResult#getHTML to opt out of special attribute
              // handling. To look up the attribute value we also need to add
              // the suffix.

              const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
              const attributeValue = node.getAttribute(attributeLookupName);
              node.removeAttribute(attributeLookupName);
              const statics = attributeValue.split(markerRegex);
              this.parts.push({
                type: 'attribute',
                index,
                name,
                strings: statics
              });
              partIndex += statics.length - 1;
            }
          }

          if (node.tagName === 'TEMPLATE') {
            stack.push(node);
            walker.currentNode = node.content;
          }
        } else if (node.nodeType === 3
      /* Node.TEXT_NODE */
      ) {
          const data = node.data;

          if (data.indexOf(marker) >= 0) {
            const parent = node.parentNode;
            const strings = data.split(markerRegex);
            const lastIndex = strings.length - 1; // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts

            for (let i = 0; i < lastIndex; i++) {
              let insert;
              let s = strings[i];

              if (s === '') {
                insert = createMarker();
              } else {
                const match = lastAttributeNameRegex.exec(s);

                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                  s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                }

                insert = document.createTextNode(s);
              }

              parent.insertBefore(insert, node);
              this.parts.push({
                type: 'node',
                index: ++index
              });
            } // If there's no text, we must insert a comment to mark our place.
            // Else, we can trust it will stick around after cloning.


            if (strings[lastIndex] === '') {
              parent.insertBefore(createMarker(), node);
              nodesToRemove.push(node);
            } else {
              node.data = strings[lastIndex];
            } // We have a part for each match found


            partIndex += lastIndex;
          }
        } else if (node.nodeType === 8
      /* Node.COMMENT_NODE */
      ) {
          if (node.data === marker) {
            const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
            // the following are true:
            //  * We don't have a previousSibling
            //  * The previousSibling is already the start of a previous part

            if (node.previousSibling === null || index === lastPartIndex) {
              index++;
              parent.insertBefore(createMarker(), node);
            }

            lastPartIndex = index;
            this.parts.push({
              type: 'node',
              index
            }); // If we don't have a nextSibling, keep this node so we have an end.
            // Else, we can remove it to save future costs.

            if (node.nextSibling === null) {
              node.data = '';
            } else {
              nodesToRemove.push(node);
              index--;
            }

            partIndex++;
          } else {
            let i = -1;

            while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
              // Comment node has a binding marker inside, make an inactive part
              // The binding won't work, but subsequent bindings will
              // TODO (justinfagnani): consider whether it's even worth it to
              // make bindings in comments work
              this.parts.push({
                type: 'node',
                index: -1
              });
              partIndex++;
            }
          }
        }
    } // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}

exports.Template = Template;

const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};

const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.


exports.isTemplatePartActive = isTemplatePartActive;

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */


exports.createMarker = createMarker;
const lastAttributeNameRegex = // eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
exports.lastAttributeNameRegex = lastAttributeNameRegex;
},{}],"../node_modules/lit-html/lib/template-instance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateInstance = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // There are a number of steps in the lifecycle of a template instance's
    // DOM fragment:
    //  1. Clone - create the instance fragment
    //  2. Adopt - adopt into the main document
    //  3. Process - find part markers and create parts
    //  4. Upgrade - upgrade custom elements
    //  5. Update - set node, attribute, property, etc., values
    //  6. Connect - connect to the document. Optional and outside of this
    //     method.
    //
    // We have a few constraints on the ordering of these steps:
    //  * We need to upgrade before updating, so that property values will pass
    //    through any property setters.
    //  * We would like to process before upgrading so that we're sure that the
    //    cloned fragment is inert and not disturbed by self-modifying DOM.
    //  * We want custom elements to upgrade even in disconnected fragments.
    //
    // Given these constraints, with full custom elements support we would
    // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
    //
    // But Safari does not implement CustomElementRegistry#upgrade, so we
    // can not implement that order and still have upgrade-before-update and
    // upgrade disconnected fragments. So we instead sacrifice the
    // process-before-upgrade constraint, since in Custom Elements v1 elements
    // must not modify their light DOM in the constructor. We still have issues
    // when co-existing with CEv0 elements like Polymer 1, and with polyfills
    // that don't strictly adhere to the no-modification rule because shadow
    // DOM, which may be created in the constructor, is emulated by being placed
    // in the light DOM.
    //
    // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
    // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
    // in one step.
    //
    // The Custom Elements v1 polyfill supports upgrade(), so the order when
    // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
    // Connect.
    const fragment = _dom.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(fragment, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode(); // Loop through all the nodes and parts of a template

    while (partIndex < parts.length) {
      part = parts[partIndex];

      if (!(0, _template.isTemplatePartActive)(part)) {
        this.__parts.push(undefined);

        partIndex++;
        continue;
      } // Progress the tree walker until we find our next part's node.
      // Note that multiple parts may share the same node (attribute parts
      // on a single element), so this loop may not run at all.


      while (nodeIndex < part.index) {
        nodeIndex++;

        if (node.nodeName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }

        if ((node = walker.nextNode()) === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      } // We've arrived at our part's node.


      if (part.type === 'node') {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);

        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }

      partIndex++;
    }

    if (_dom.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

exports.TemplateInstance = TemplateInstance;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/template-result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGTemplateResult = exports.TemplateResult = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */

/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
  createHTML: s => s
});
const commentMarker = ` ${_template.marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */

class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isCommentBinding = false;

    for (let i = 0; i < l; i++) {
      const s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
      // into the template source before it's parsed by the browser's HTML
      // parser. The marker type is based on whether the expression is in an
      // attribute, text, or comment position.
      //   * For node-position bindings we insert a comment with the marker
      //     sentinel as its text content, like <!--{{lit-guid}}-->.
      //   * For attribute bindings we insert just the marker sentinel for the
      //     first binding, so that we support unquoted attribute bindings.
      //     Subsequent bindings can use a comment marker because multi-binding
      //     attributes must be quoted.
      //   * For comment bindings we insert just the marker sentinel so we don't
      //     close the comment.
      //
      // The following code scans the template source, but is *not* an HTML
      // parser. We don't need to track the tree structure of the HTML, only
      // whether a binding is inside a comment, and if not, if it appears to be
      // the first binding in an attribute.

      const commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
      // comment close. Because <-- can appear in an attribute value there can
      // be false positives.

      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceding the
      // expression. This can match "name=value" like structures in text,
      // comments, and attribute values, so there can be false-positives.

      const attributeMatch = _template.lastAttributeNameRegex.exec(s);

      if (attributeMatch === null) {
        // We're only in this branch if we don't have a attribute-like
        // preceding sequence. For comments, this guards against unusual
        // attribute values like <div foo="<!--${'bar'}">. Cases like
        // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
        // below.
        html += s + (isCommentBinding ? commentMarker : _template.nodeMarker);
      } else {
        // For attributes we use just a marker sentinel, and also append a
        // $lit$ suffix to the name to opt-out of attribute-specific parsing
        // that IE and Edge do for style and certain SVG attributes.
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + _template.boundAttributeSuffix + attributeMatch[3] + _template.marker;
      }
    }

    html += this.strings[l];
    return html;
  }

  getTemplateElement() {
    const template = document.createElement('template');
    let value = this.getHTML();

    if (policy !== undefined) {
      // this is secure because `this.strings` is a TemplateStringsArray.
      // TODO: validate this when
      // https://github.com/tc39/proposal-array-is-template-object is
      // implemented.
      value = policy.createHTML(value);
    }

    template.innerHTML = value;
    return template;
  }

}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */


exports.TemplateResult = TemplateResult;

class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }

  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    (0, _dom.reparentNodes)(content, svgElement.firstChild);
    return template;
  }

}

exports.SVGTemplateResult = SVGTemplateResult;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/parts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isIterable = exports.isPrimitive = void 0;

var _directive = require("./directive.js");

var _dom = require("./dom.js");

var _part = require("./part.js");

var _templateInstance = require("./template-instance.js");

var _templateResult = require("./template-result.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};

exports.isPrimitive = isPrimitive;

const isIterable = value => {
  return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */


exports.isIterable = isIterable;

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts = this.parts; // If we're assigning an attribute via syntax like:
    //    attr="${foo}"  or  attr=${foo}
    // but not
    //    attr="${foo} ${bar}" or attr="${foo} baz"
    // then we don't want to coerce the attribute value into one long
    // string. Instead we want to just return the value itself directly,
    // so that sanitizeDOMValue can get the actual value rather than
    // String(value)
    // The exception is if v is an array, in which case we do want to smash
    // it together into a string without calling String() on the array.
    //
    // This also allows trusted values (when using TrustedTypes) being
    // assigned to DOM sinks without being stringified in the process.

    if (l === 1 && strings[0] === '' && strings[1] === '') {
      const v = parts[0].value;

      if (typeof v === 'symbol') {
        return String(v);
      }

      if (typeof v === 'string' || !isIterable(v)) {
        return v;
      }
    }

    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === 'string' ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}
/**
 * A Part that controls all or part of an attribute value.
 */


exports.AttributeCommitter = AttributeCommitter;

class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }

  setValue(value) {
    if (value !== _part.noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!(0, _directive.isDirective)(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while ((0, _directive.isDirective)(this.value)) {
      const directive = this.value;
      this.value = _part.noChange;
      directive(this);
    }

    if (this.value === _part.noChange) {
      return;
    }

    this.committer.commit();
  }

}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */


exports.AttributePart = AttributePart;

class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild((0, _template.createMarker)());
    this.endNode = container.appendChild((0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part.__insert(this.startNode = (0, _template.createMarker)());

    part.__insert(this.endNode = (0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref.__insert(this.startNode = (0, _template.createMarker)());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }

    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    const value = this.__pendingValue;

    if (value === _part.noChange) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof _templateResult.TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === _part.nothing) {
      this.value = _part.nothing;
      this.clear();
    } else {
      // Fallback, will render the string representation
      this.__commitText(value);
    }
  }

  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  __commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this.__insert(value);

    this.value = value;
  }

  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value; // If `value` isn't already a string, we explicitly convert it here in case
    // it can't be implicitly converted - i.e. it's a symbol.

    const valueAsString = typeof value === 'string' ? value : String(value);

    if (node === this.endNode.previousSibling && node.nodeType === 3
    /* Node.TEXT_NODE */
    ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = valueAsString;
      } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }

    this.value = value;
  }

  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value instanceof _templateInstance.TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new _templateInstance.TemplateInstance(template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this.__commitNode(fragment);

      this.value = instance;
    }
  }

  __commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  clear(startNode = this.startNode) {
    (0, _dom.removeNodes)(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */


exports.NodePart = NodePart;

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const value = !!this.__pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }

      this.value = value;
    }

    this.__pendingValue = _part.noChange;
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */


exports.BooleanAttributePart = BooleanAttributePart;

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false; // eslint-disable-next-line @typescript-eslint/no-explicit-any

      this.element[this.name] = this._getValue();
    }
  }

}

exports.PropertyCommitter = PropertyCommitter;

class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.


exports.PropertyPart = PropertyPart;
let eventOptionsSupported = false; // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module

(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.addEventListener('test', options, options); // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.removeEventListener('test', options, options);
  } catch (_e) {// event options not supported
  }
})();

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this.__boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    this.value = newListener;
    this.__pendingValue = _part.noChange;
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.


exports.EventPart = EventPart;

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);
},{"./directive.js":"../node_modules/lit-html/lib/directive.js","./dom.js":"../node_modules/lit-html/lib/dom.js","./part.js":"../node_modules/lit-html/lib/part.js","./template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./template-result.js":"../node_modules/lit-html/lib/template-result.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/default-template-processor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

var _parts = require("./parts.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const committer = new _parts.PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }

    if (prefix === '@') {
      return [new _parts.EventPart(element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new _parts.BooleanAttributePart(element, name.slice(1), strings)];
    }

    const committer = new _parts.AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new _parts.NodePart(options);
  }

}

exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
const defaultTemplateProcessor = new DefaultTemplateProcessor();
exports.defaultTemplateProcessor = defaultTemplateProcessor;
},{"./parts.js":"../node_modules/lit-html/lib/parts.js"}],"../node_modules/lit-html/lib/template-factory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateFactory = templateFactory;
exports.templateCaches = void 0;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  } // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content


  const key = result.strings.join(_template.marker); // Check if we already have a Template for this key

  template = templateCache.keyString.get(key);

  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new _template.Template(result, result.getTemplateElement()); // Cache the Template for this key

    templateCache.keyString.set(key, template);
  } // Cache all future queries for this TemplateStringsArray


  templateCache.stringsArray.set(result.strings, template);
  return template;
}

const templateCaches = new Map();
exports.templateCaches = templateCaches;
},{"./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.parts = void 0;

var _dom = require("./dom.js");

var _parts = require("./parts.js");

var _templateFactory = require("./template-factory.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

exports.parts = parts;

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    (0, _dom.removeNodes)(container, container.firstChild);
    parts.set(container, part = new _parts.NodePart(Object.assign({
      templateFactory: _templateFactory.templateFactory
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

exports.render = render;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./parts.js":"../node_modules/lit-html/lib/parts.js","./template-factory.js":"../node_modules/lit-html/lib/template-factory.js"}],"../node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.DefaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "defaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.defaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.SVGTemplateResult;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.TemplateResult;
  }
});
Object.defineProperty(exports, "directive", {
  enumerable: true,
  get: function () {
    return _directive.directive;
  }
});
Object.defineProperty(exports, "isDirective", {
  enumerable: true,
  get: function () {
    return _directive.isDirective;
  }
});
Object.defineProperty(exports, "removeNodes", {
  enumerable: true,
  get: function () {
    return _dom.removeNodes;
  }
});
Object.defineProperty(exports, "reparentNodes", {
  enumerable: true,
  get: function () {
    return _dom.reparentNodes;
  }
});
Object.defineProperty(exports, "noChange", {
  enumerable: true,
  get: function () {
    return _part.noChange;
  }
});
Object.defineProperty(exports, "nothing", {
  enumerable: true,
  get: function () {
    return _part.nothing;
  }
});
Object.defineProperty(exports, "AttributeCommitter", {
  enumerable: true,
  get: function () {
    return _parts.AttributeCommitter;
  }
});
Object.defineProperty(exports, "AttributePart", {
  enumerable: true,
  get: function () {
    return _parts.AttributePart;
  }
});
Object.defineProperty(exports, "BooleanAttributePart", {
  enumerable: true,
  get: function () {
    return _parts.BooleanAttributePart;
  }
});
Object.defineProperty(exports, "EventPart", {
  enumerable: true,
  get: function () {
    return _parts.EventPart;
  }
});
Object.defineProperty(exports, "isIterable", {
  enumerable: true,
  get: function () {
    return _parts.isIterable;
  }
});
Object.defineProperty(exports, "isPrimitive", {
  enumerable: true,
  get: function () {
    return _parts.isPrimitive;
  }
});
Object.defineProperty(exports, "NodePart", {
  enumerable: true,
  get: function () {
    return _parts.NodePart;
  }
});
Object.defineProperty(exports, "PropertyCommitter", {
  enumerable: true,
  get: function () {
    return _parts.PropertyCommitter;
  }
});
Object.defineProperty(exports, "PropertyPart", {
  enumerable: true,
  get: function () {
    return _parts.PropertyPart;
  }
});
Object.defineProperty(exports, "parts", {
  enumerable: true,
  get: function () {
    return _render.parts;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.render;
  }
});
Object.defineProperty(exports, "templateCaches", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateCaches;
  }
});
Object.defineProperty(exports, "templateFactory", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateFactory;
  }
});
Object.defineProperty(exports, "TemplateInstance", {
  enumerable: true,
  get: function () {
    return _templateInstance.TemplateInstance;
  }
});
Object.defineProperty(exports, "createMarker", {
  enumerable: true,
  get: function () {
    return _template.createMarker;
  }
});
Object.defineProperty(exports, "isTemplatePartActive", {
  enumerable: true,
  get: function () {
    return _template.isTemplatePartActive;
  }
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function () {
    return _template.Template;
  }
});
exports.svg = exports.html = void 0;

var _defaultTemplateProcessor = require("./lib/default-template-processor.js");

var _templateResult = require("./lib/template-result.js");

var _directive = require("./lib/directive.js");

var _dom = require("./lib/dom.js");

var _part = require("./lib/part.js");

var _parts = require("./lib/parts.js");

var _render = require("./lib/render.js");

var _templateFactory = require("./lib/template-factory.js");

var _templateInstance = require("./lib/template-instance.js");

var _template = require("./lib/template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @packageDocumentation
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// TODO(justinfagnani): remove line when we get NodePart moving methods
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */


const html = (strings, ...values) => new _templateResult.TemplateResult(strings, values, 'html', _defaultTemplateProcessor.defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */


exports.html = html;

const svg = (strings, ...values) => new _templateResult.SVGTemplateResult(strings, values, 'svg', _defaultTemplateProcessor.defaultTemplateProcessor);

exports.svg = svg;
},{"./lib/default-template-processor.js":"../node_modules/lit-html/lib/default-template-processor.js","./lib/template-result.js":"../node_modules/lit-html/lib/template-result.js","./lib/directive.js":"../node_modules/lit-html/lib/directive.js","./lib/dom.js":"../node_modules/lit-html/lib/dom.js","./lib/part.js":"../node_modules/lit-html/lib/part.js","./lib/parts.js":"../node_modules/lit-html/lib/parts.js","./lib/render.js":"../node_modules/lit-html/lib/render.js","./lib/template-factory.js":"../node_modules/lit-html/lib/template-factory.js","./lib/template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./lib/template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/gsap/gsap-core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getCache = exports._getSetter = exports._missingPlugin = exports._round = exports._roundModifier = exports._config = exports._ticker = exports._plugins = exports._checkPlugin = exports._replaceRandom = exports._colorStringFilter = exports._sortPropTweensByPriority = exports._forEachName = exports._removeLinkedListItem = exports._setDefaults = exports._relExp = exports._renderComplexString = exports._isUndefined = exports._isString = exports._numWithUnitExp = exports._numExp = exports._getProperty = exports.shuffle = exports.interpolate = exports.unitize = exports.pipe = exports.mapRange = exports.toArray = exports.splitColor = exports.clamp = exports.getUnit = exports.normalize = exports.snap = exports.random = exports.distribute = exports.wrapYoyo = exports.wrap = exports.Circ = exports.Expo = exports.Sine = exports.Bounce = exports.SteppedEase = exports.Back = exports.Elastic = exports.Strong = exports.Quint = exports.Quart = exports.Cubic = exports.Quad = exports.Linear = exports.Power4 = exports.Power3 = exports.Power2 = exports.Power1 = exports.Power0 = exports.default = exports.gsap = exports.PropTween = exports.TweenLite = exports.TweenMax = exports.Tween = exports.TimelineLite = exports.TimelineMax = exports.Timeline = exports.Animation = exports.GSCache = void 0;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
/*!
 * GSAP 3.6.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _suppressOverwrites,
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
_isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_relExp = /[+-]=-?[.\d]+/,
    _delimitedValueExp = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
    _unitExp = /[\d.+\-=]+(?:e[-+]\d*)*/i,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property, v) {
  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _parseVars = function _parseVars(params, type, parent) {
  //reads the arguments passed to one of the key methods and figures out if the user is defining things with the OLD/legacy syntax where the duration is the 2nd parameter, and then it adjusts things accordingly and spits back the corrected vars object (with the duration added if necessary, as well as runBackwards or startAt or immediateRender). type 0 = to()/staggerTo(), 1 = from()/staggerFrom(), 2 = fromTo()/staggerFromTo()
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars;

  isLegacy && (vars.duration = params[1]);
  vars.parent = parent;

  if (type) {
    irVars = vars;

    while (parent && !("immediateRender" in irVars)) {
      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }

    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
  }

  return vars;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  _lazyTweens.length && _lazyRender();
  animation.render(time, suppressEvents, force);
  _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || p === "duration" || p === "ease" || (obj[p] = defaults[p]);
  }
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
  child._act = 0;
},
    _uncache = function _uncache(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
    var a = animation;

    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
},
    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
_animationCycle = function _animationCycle(tTime, cycleDuration) {
  var whole = Math.floor(tTime /= cycleDuration);
  return tTime && whole === tTime ? whole - 1 : whole;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
},
    _setEnd = function _setEnd(animation) {
  return animation._end = _round(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
},
    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
  var parent = animation._dp;

  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _round(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

    _setEnd(animation);

    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
  }

  return animation;
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_postAddChecks = function _postAddChecks(timeline, child) {
  var t;

  if (child._time || child._initted && !child._dur) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    t = _parentToChildTotalTime(timeline.rawTime(), child);

    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
    //in case any of the ancestors had completed but should now be enabled...
    if (timeline._dur < timeline.duration()) {
      t = timeline;

      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

        t = t._dp;
      }
    }

    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
  }
},
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _round(position + child._delay);
  child._end = _round(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  timeline._recent = child;
  skipChecks || _postAddChecks(timeline, child);
  return timeline;
},
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
},
    _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
  _initTween(tween, totalTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);

    tween._lazy = [totalTime, suppressEvents];
    return 1;
  }
},
    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
},
    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
_renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) || (tween._ts < 0 || tween._dp._ts < 0) && tween.data !== "isFromStart" && tween.data !== "isStart") ? 0 : 1,
      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0.
  repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    // in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    prevIteration = _animationCycle(tween._tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

    if (iteration !== prevIteration) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }

  if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
      return;
    }

    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    suppressEvents || _callback(tween, "onStart");
    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);

      if (!suppressEvents) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (!child._dur && child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (!child._dur && child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat,
      dur = _round(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _round(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  i,
      offset;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    i = position.charAt(0);

    if (i === "<" || i === ">") {
      return (i === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0);
    }

    i = position.indexOf("=");

    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }

    offset = +(position.charAt(i - 1) + position.substr(i + 1));
    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1)) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position;
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value) {
  if (typeof value !== "string") {
    return "";
  }

  var v = _unitExp.exec(value);

  return v ? value.substr(v.index + v[0].length) : "";
},
    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
toArray = function toArray(value, leaveStrings) {
  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call(_doc.querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    shuffle = function shuffle(a) {
  return a.sort(function () {
    return .5 - Math.random();
  });
},
    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }

      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _round(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()

  return function (raw) {
    var n = Math.round(parseFloat(raw) / v) * v * p;
    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;

    if (snapTo.values) {
      snapTo = toArray(snapTo.values);

      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total || 0;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + ((value - inMin) / inRange * outRange || 0);
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      params,
      scope;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

  return params ? callback.apply(scope, params) : callback.call(scope);
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
},
    _quickTween,
    _createPlugin = function _createPlugin(config) {
  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

  var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
    this._props = [];
  } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
  instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  },
      statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };

  _wake();

  if (config !== Plugin) {
    if (_plugins[name]) {
      return;
    }

    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


    _plugins[Plugin.prop = name] = Plugin;

    if (config.targetTest) {
      _harnessPlugins.push(Plugin);

      _reservedProps[name] = 1;
    }

    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
  }

  _addGlobal(name, Plugin);

  config.register && config.register(gsap, Plugin, PropTween);
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    _hue = function _hue(h, m1, m2) {
  h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length < 6) {
        //for shorthand like #9F0 or #9F0F (could have alpha)
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
      }

      if (v.length === 9) {
        // hex with alpha, like #fd5e53ff
        a = parseInt(v.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1); //cast as number

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = ~~(h + .5);
    a[1] = ~~(s * 100 + .5);
    a[2] = ~~(l * 100 + .5);
  }

  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
},
    _colorOrderData = function _colorOrderData(v) {
  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
  var values = [],
      c = [],
      i = -1;
  v.split(_colorExp).forEach(function (v) {
    var a = v.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
},
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
  var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;

  if (!colors) {
    return s;
  }

  colors = colors.map(function (color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });

  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;

    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }

  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;

    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }

  return result + shell[l];
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

    return true;
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch,
        time,
        frame;

    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;

    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1000;
      _self.time = time = time / 1000;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }

    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

    if (dispatch) {
      for (_i = 0; _i < _listeners.length; _i++) {
        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
      }
    }
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1000 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    },
    fps: function fps(_fps) {
      _gap = 1000 / (_fps || 240);
      _nextTime = _self.time * 1000 + _gap;
    },
    add: function add(callback) {
      _listeners.indexOf(callback) < 0 && _listeners.push(callback);

      _wake();
    },
    remove: function remove(callback) {
      var i;
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _valueInParentheses = function _valueInParentheses(value) {
  var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
  var child = timeline._first,
      ease;

  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }

    child = child._next;
  }
},
    _parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


exports._ticker = _ticker;
exports._colorStringFilter = _colorStringFilter;
exports.splitColor = splitColor;
exports.interpolate = interpolate;
exports.mapRange = mapRange;
exports._replaceRandom = _replaceRandom;
exports.wrapYoyo = wrapYoyo;
exports.wrap = wrap;
exports.normalize = normalize;
exports.unitize = unitize;
exports.pipe = pipe;
exports.random = random;
exports.snap = snap;
exports._roundModifier = _roundModifier;
exports.distribute = distribute;
exports.shuffle = shuffle;
exports.toArray = toArray;
exports.clamp = clamp;
exports.getUnit = getUnit;
exports._removeLinkedListItem = _removeLinkedListItem;
exports._setDefaults = _setDefaults;
exports._round = _round;
exports._forEachName = _forEachName;
exports._getProperty = _getProperty;
exports._getCache = _getCache;
exports._plugins = _plugins;
exports._missingPlugin = _missingPlugin;
exports._relExp = _relExp;
exports._numWithUnitExp = _numWithUnitExp;
exports._numExp = _numExp;
exports._isUndefined = _isUndefined;
exports._isString = _isString;
exports._config = _config;

_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];

_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */


var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */


exports.GSCache = GSCache;

var Animation = /*#__PURE__*/function () {
  function Animation(vars, time) {
    var parent = vars.parent || _globalTimeline;
    this.vars = vars;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }

    this._ts = 1;

    _setDuration(this, +vars.duration, 1, 1);

    this.data = vars.data;
    _tickerActive || _ticker.wake();
    parent && _addToTimeline(parent, this, time || time === 0 ? time : parent._time, 1);
    vars.reversed && this.reverse();
    vars.paused && this.paused(true);
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this._dp;

    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);

      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

      while (parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
      //   this._lock = 1;

      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
      //}

    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % this._dur || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }

    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    return _recacheAncestors(this.totalTime(_clamp(-this._delay, this._tDur, tTime), true));
  };

  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }

    if (this._ps !== value) {
      this._ps = value;

      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();

        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && (this._tTime -= _tinyNum) && Math.abs(this._zTime) !== _tinyNum); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detatched parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };

  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
        time = arguments.length ? rawTime : animation.rawTime();

    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }

    return time;
  };

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat === -2 ? Infinity : this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      this._rDelay = value;
      return _onUpdateTotalDuration(this);
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }

    return this._rts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };

  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
        var _then = self.then;
        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };

      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

exports.Animation = Animation;

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, time) {
    var _this;

    if (vars === void 0) {
      vars = {};
    }

    _this = _Animation.call(this, vars, time) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _this.parent && _postAddChecks(_this.parent, _assertThisInitialized(_this));
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 0, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 1, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    new Tween(targets, _parseVars(arguments, 2, this), _parsePosition(this, _isNumber(fromVars) ? arguments[4] : position));
    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), _parsePosition(this, position));
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = this !== _globalTimeline && totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;

    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;

      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _round(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

          if (prevTime !== this._time || prevPaused !== !this._ts) {
            return this;
          }

          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


          _propagateYoyoEase(this, isYoyo);
        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _round(prevTime), _round(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
      }

      !prevTime && (time || !dur && totalTime >= 0) && !suppressEvents && _callback(this, "onStart");

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);

          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this2 = this;

    _isNumber(position) || (position = _parsePosition(this, position));

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _round(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        isGlobalTime = _isNumber(onlyActive),
        // a number is interpreted as a global time. If the animation spans
    children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  } // potential future feature - targets() on timelines
  // targets() {
  // 	let result = [];
  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
  // 	return result;
  // }
  ;

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};

    var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        immediateRender = _vars.immediateRender,
        tween = Tween.to(tl, _setDefaults({
      ease: "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        var duration = vars.duration || Math.abs((endTime - tl._time) / tl.timeScale());
        tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
      }
    }, vars));

    return immediateRender ? tween.render(0) : tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate() {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate();
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        start,
        parent;

    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }

    if (self._dirty) {
      parent = self.parent;

      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;

        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }

        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;

          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }

          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }

        child._end > max && child._ts && (max = child._end);
        child = prev;
      }

      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

      self._dirty = 0;
    }

    return self._tDur;
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

      _lastRenderedFrame = _ticker.frame;
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        child || _ticker.sleep();
      }
    }
  };

  return Timeline;
}(Animation);

exports.TimelineLite = exports.TimelineMax = exports.Timeline = Timeline;

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      end = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);
    }
  }

  if (parsedStart !== end) {
    if (!isNaN(parsedStart * end)) {
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_initTween = function _initTween(tween, time) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  if (!tl) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    cleanVars = _copyExcluding(vars, _reservedProps);
    prevStartAt && prevStartAt.render(-1, true).kill();

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      if (immediateRender) {
        if (time > 0) {
          autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
        } else if (dur && !(time < 0 && prevStartAt)) {
          time && (tween._zTime = time);
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (prevStartAt) {
        !autoRevert && (tween._startAt = 0);
      } else {
        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

        p = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

        _removeFromParent(tween._startAt = Tween.set(targets, p));

        if (!immediateRender) {
          _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

        } else if (!time) {
          return;
        }
      }
    }

    tween._pt = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        plugin.priority && (hasPriority = 1);
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(0)); //Also make sure the overwriting doesn't overwrite THIS tween!!!


        overwritten = !tween.parent;
        _overwritingTween = 0;
      }

      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }

    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
    _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


exports._checkPlugin = _checkPlugin;

var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, time, skipInherit) {
    var _this3;

    if (typeof vars === "number") {
      time.duration = vars;
      vars = time;
      time = null;
    }

    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars), time) || this;
    var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = _this3.parent,
        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {}
      });
      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;

      if (keyframes) {
        _setDefaults(tl.vars.defaults, {
          ease: "none"
        });

        keyframes.forEach(function (frame) {
          return tl.to(parsedTargets, frame, ">");
        });
      } else {
        l = parsedTargets.length;
        staggerFunc = stagger ? distribute(stagger) : _emptyFunc;

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = {};

          for (p in vars) {
            if (_staggerPropsToSkip.indexOf(p) < 0) {
              copy[p] = vars[p];
            }
          }

          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
        }

        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    parent && _postAddChecks(parent, _assertThisInitialized(_this3));

    if (immediateRender || !duration && !keyframes && _this3._start === _round(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay)); //in case delay is negative

    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);

        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          return this;
        }

        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_round(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted) {
        if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }

        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      time && !prevTime && !suppressEvents && _callback(this, "onStart");
      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }

      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate() {
    this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate();
    return _Animation2.prototype.invalidate.call(this);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }

    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }

            delete curLookup[p];
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return new Tween(targets, _parseVars(arguments, 1));
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return new Tween(targets, _parseVars(arguments, 2));
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

exports.TweenLite = exports.TweenMax = exports.Tween = Tween;

_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = _slice.call(arguments, 0);

    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


exports._sortPropTweensByPriority = _sortPropTweensByPriority;
exports._renderComplexString = _renderComplexString;
exports._getSetter = _getSetter;

var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks


exports.PropTween = PropTween;

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */

var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        // in case it's an alias, like "rotate" for "rotation".
    setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);

    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref2) {
    var name = _ref2.name,
        effect = _ref2.effect,
        plugins = _ref2.plugins,
        defaults = _ref2.defaults,
        extendTimeline = _ref2.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem,
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
  var pt = plugin._pt;

  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }

  return pt;
},
    _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          // is a plugin
          pt = _getPluginPropTween(pt, p);
        }

        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt;

    for (p in vars) {
      pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
      pt && (pt.op = p);

      this._props.push(p);
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i] || 0, value[i]);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.


exports.default = exports.gsap = gsap;
Tween.version = Timeline.version = gsap.version = "3.6.0";
_coreReady = 1;

if (_windowExists()) {
  _wake();
}

var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;
exports.Circ = Circ;
exports.Expo = Expo;
exports.Sine = Sine;
exports.Bounce = Bounce;
exports.SteppedEase = SteppedEase;
exports.Back = Back;
exports.Elastic = Elastic;
exports.Strong = Strong;
exports.Quint = Quint;
exports.Quart = Quart;
exports.Cubic = Cubic;
exports.Quad = Quad;
exports.Linear = Linear;
exports.Power4 = Power4;
exports.Power3 = Power3;
exports.Power2 = Power2;
exports.Power1 = Power1;
exports.Power0 = Power0;
},{}],"../node_modules/gsap/CSSPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPrefix = exports._createElement = exports._getBBox = exports.default = exports.CSSPlugin = void 0;

var _gsapCore = require("./gsap-core.js");

/*!
 * CSSPlugin 3.6.0
 * https://greensock.com
 *
 * Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _win,
    _doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
},
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5;

  if (property in s && !preferPrefix) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(_prefixes[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
},
    _initCore = function _initCore() {
  if (_windowExists() && window.document) {
    _win = window;
    _doc = _win.document;
    _docElement = _doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }

  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
  style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);

  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return (0, _gsapCore._round)(toPercent ? curValue / px * amount : curValue / 100 * px);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === _doc || !parent.appendChild) {
    parent = _doc.body;
  }

  cache = parent._gsap;

  if (cache && toPercent && cache.width && horizontal && cache.time === _gsapCore._ticker.time) {
    return (0, _gsapCore._round)(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";

    if (horizontal && toPercent) {
      cache = (0, _gsapCore._getCache)(parent);
      cache.time = _gsapCore._ticker.time;
      cache.width = parent[measureProperty];
    }
  }

  return (0, _gsapCore._round)(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
},
    _get = function _get(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();

  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || (0, _gsapCore._getProperty)(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
  }

  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
},
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  //note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  if (!start || start === "none") {
    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
    var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);

    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
  }

  var pt = new _gsapCore.PropTween(this._pt, target.style, prop, 0, 1, _gsapCore._renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      relative,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];
  (0, _gsapCore._colorStringFilter)(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().

  start = a[0];
  end = a[1];
  startValues = start.match(_gsapCore._numWithUnitExp) || [];
  endValues = end.match(_gsapCore._numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _gsapCore._numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

        if (relative) {
          endValue = endValue.substr(2);
        }

        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _gsapCore._numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _gsapCore._config.units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        } //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: relative ? relative * endNum : endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  _gsapCore._relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    value = x;
    x = y;
    y = value;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      if (cache) {
        cache.svg && target.removeAttribute("transform");

        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


        cache.uncache = 1;
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;

      plugin._props.push(property);

      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_gsapCore._numExp).map(_gsapCore._round);
},
    _getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap || (0, _gsapCore._getCache)(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !target.offsetParent) {
      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
      addedToDOM = 1; //flag

      nextSibling = target.nextSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");

    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }

  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
},
    _parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new _gsapCore.GSCache(target);

  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  matrix = _getMatrix(target, cache.svg);

  if (cache.svg) {
    t1 = !cache.uncache && target.getAttribute("data-svg-origin");

    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.cos(skewX * _DEG2RAD));

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = (0, _gsapCore._round)(Math.sqrt(a * a + b * b + c * c));
      scaleY = (0, _gsapCore._round)(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  cache.x = x - ((cache.xPercent = x && (cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = (0, _gsapCore._round)(scaleX);
  cache.scaleY = (0, _gsapCore._round)(scaleY);
  cache.rotation = (0, _gsapCore._round)(rotation) + deg;
  cache.rotationX = (0, _gsapCore._round)(rotationX) + deg;
  cache.rotationY = (0, _gsapCore._round)(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _gsapCore._config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = (0, _gsapCore.getUnit)(start);
  return (0, _gsapCore._round)(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = (0, _gsapCore._round)(a11);
    a21 = (0, _gsapCore._round)(a21);
    a12 = (0, _gsapCore._round)(a12);
    a22 = (0, _gsapCore._round)(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = (0, _gsapCore._round)(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = (0, _gsapCore._round)(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = (0, _gsapCore._round)(tx + xPercent / 100 * temp.width);
    ty = (0, _gsapCore._round)(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
  var cap = 360,
      isString = (0, _gsapCore._isString)(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = relative ? endNum * relative : endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new _gsapCore.PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var style = _tempDivStyler.style,
      startCache = target._gsap,
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;
  style.cssText = getComputedStyle(target).cssText + ";position:absolute;display:block;"; //%-based translations will fail unless we set the width/height to match the original target (and padding/borders can affect it)

  style[_transformProp] = transforms;

  _doc.body.appendChild(_tempDivStyler);

  endCache = _parseTransform(_tempDivStyler, 1);

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = (0, _gsapCore.getUnit)(startValue);
      endUnit = (0, _gsapCore.getUnit)(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new _gsapCore.PropTween(plugin._pt, startCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;

      plugin._props.push(p);
    }
  }

  _doc.body.removeChild(_tempDivStyler);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


exports._getBBox = _getBBox;
exports.checkPrefix = _checkPropPrefix;
exports._createElement = _createElement;
(0, _gsapCore._forEachName)("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
    return index < 2 ? name + side : "border" + side + name;
  });

  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;

    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }

    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startAt = tween.vars.startAt,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority;
    _pluginInitted || _initCore();

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_gsapCore._plugins[p] && (0, _gsapCore._checkPlugin)(p, vars, tween, index, target, targets)) {
        // plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = (0, _gsapCore._replaceRandom)(endValue);
      }

      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        startUnit = (0, _gsapCore.getUnit)(startValue);
        endUnit = (0, _gsapCore.getUnit)(endValue);
        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          p in _gsapCore._config.units && !(0, _gsapCore.getUnit)(startValue) && (startValue += _gsapCore._config.units[p]); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
        } else {
          startValue = _get(target, p);
        }

        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new _gsapCore.PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new _gsapCore.PropTween(this._pt, cache, "scaleY", cache.scaleY, relative ? relative * endNum : endNum - cache.scaleY);
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, endValue, relative);

            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);

            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = (0, _gsapCore.getUnit)(endValue) || (p in _gsapCore._config.units ? _gsapCore._config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new _gsapCore.PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit) {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, target[p], endValue, index, targets);
          } else {
            (0, _gsapCore._missingPlugin)(p, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, endValue);
        }

        props.push(p);
      }
    }

    hasPriority && (0, _gsapCore._sortPropTweensByPriority)(this);
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !(0, _gsapCore._isUndefined)(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : (0, _gsapCore._getSetter)(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
exports.default = exports.CSSPlugin = CSSPlugin;
_gsapCore.gsap.utils.checkPrefix = _checkPropPrefix;

(function (positionAndScale, rotation, others, aliases) {
  var all = (0, _gsapCore._forEachName)(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });
  (0, _gsapCore._forEachName)(rotation, function (name) {
    _gsapCore._config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  (0, _gsapCore._forEachName)(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

(0, _gsapCore._forEachName)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _gsapCore._config.units[name] = "px";
});

_gsapCore.gsap.registerPlugin(CSSPlugin);
},{"./gsap-core.js":"../node_modules/gsap/gsap-core.js"}],"../node_modules/gsap/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _gsapCore.Linear;
  }
});
Object.defineProperty(exports, "Quad", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quad;
  }
});
Object.defineProperty(exports, "Cubic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Cubic;
  }
});
Object.defineProperty(exports, "Quart", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quart;
  }
});
Object.defineProperty(exports, "Quint", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quint;
  }
});
Object.defineProperty(exports, "Strong", {
  enumerable: true,
  get: function () {
    return _gsapCore.Strong;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Elastic;
  }
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _gsapCore.Back;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _gsapCore.SteppedEase;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _gsapCore.Bounce;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _gsapCore.Sine;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _gsapCore.Expo;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _gsapCore.Circ;
  }
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TweenLite;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineLite;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineMax;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.CSSPlugin;
  }
});
exports.TweenMax = exports.default = exports.gsap = void 0;

var _gsapCore = require("./gsap-core.js");

var _CSSPlugin = require("./CSSPlugin.js");

var gsapWithCSS = _gsapCore.gsap.registerPlugin(_CSSPlugin.CSSPlugin) || _gsapCore.gsap,
    // to protect from tree shaking
TweenMaxWithCSS = gsapWithCSS.core.Tween;

exports.TweenMax = TweenMaxWithCSS;
exports.default = exports.gsap = gsapWithCSS;
},{"./gsap-core.js":"../node_modules/gsap/gsap-core.js","./CSSPlugin.js":"../node_modules/gsap/CSSPlugin.js"}],"../static/data/graduateData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graduates = void 0;
const Graduates = [{
  studentNumber: "19745141",
  firstName: "Bailey",
  lastName: "Gatland",
  email: "info@bgatland.com",
  major: "Graphic Design",
  bio: "An avid sports fan with an intricate plan, I can't wait to make my mark in the design industry. \n\nLet's talk about what I know best... design (in-particular Photoshop) and sports! Throughout my time of juggling university, interning with the Perth Wildcats & Fremantle Dockers, representing Curtin University on the AGDA WA board and staying afloat socially (hardly), I have maintained a high standard of work throughout all aspects of uni. \n\nHanding in 300-400 page process documents became a normality throughout my final year (much to Lee's despair), helping accumulate two vice-chancellors certificates, a head of school commendation and a fabled reputation amongst the tutors. \n\nBetween sports, design, a pint of Swan and a good Chicken Parmi, i'll be a good fit wherever I'm traded. I'm always up for the challenge, am keen to learn and will give 110% for the team. I'm primed and ready, so are you going to take me with your pick in the Curtin 2021 Draft?",
  tagLine: "The Rookie of the Year",
  portfolio: "https://www.bgatland.com/",
  linkedin: "https://www.linkedin.com/in/baileygatland/",
  instagram: "https://www.bgatland.com/",
  twitter: "#",
  vimeo: "#",
  artStation: "#",
  behance: "https://www.behance.net/baileygatland",
  dribbble: "#",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19745141_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19745141_BGattand_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19745141_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19745141_BGattand_main.jpg",
  imageOne: "../images/work/Bailey_Gatland_19745141_1 - Bailey Gatland.jpg",
  imageTwo: "../images/work/Bailey_Gatland_19745141_2 - Bailey Gatland.jpg",
  imageThree: "../images/work/Bailey_Gatland_19745141_3 - Bailey Gatland.jpg",
  imageFour: "../images/work/Bailey_Gatland_19745141_4 - Bailey Gatland.jpg",
  imageFive: "../images/work/Bailey_Gatland_19745141_5 - Bailey Gatland.jpg",
  imageSix: "../images/work/Bailey_Gatland_19745141_6 - Bailey Gatland.jpg"
}, {
  studentNumber: "19760513",
  firstName: "Brooke",
  lastName: "Fanto",
  email: "19760513@student.curtin.edu.au",
  major: "Graphic Design",
  bio: "I am a Graphic Designer from Perth who has a passion for design and bringing ideas to life. I am passionate about sustainable design and  packaging design. I believe that ideation and pushing the boundaries creates the best solution for the design problem. My passion is packaging design and publications and have done many branding projects. Design is an important selling attribute and is what brings clients in. I believe beautiful and well designed branding is key to building a business and long term clients.",
  tagLine: "Pushing the boundaries creates the best solution.",
  portfolio: "https://brookefanto.myportfolio.com",
  linkedin: "https://www.linkedin.com/in/brooke-fanto-345909180/",
  instagram: "https://www.instagram.com/brooke_alexia_portfolio/",
  twitter: "#",
  vimeo: "#",
  artStation: "#",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19760513_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19760513_BFanto_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19760513_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19760513_BFanto_main.jpg",
  imageOne: "../images/work/Brooke_Fanto_19760513_1 - brooke fanto.jpg",
  imageTwo: "../images/work/Brooke_Fanto_19760513_2 - brooke fanto.jpg",
  imageThree: "../images/work/Brooke_Fanto_19760513_3 - brooke fanto.jpg",
  imageFour: "../images/work/Brooke_Fanto_19760513_4 - brooke fanto.jpg",
  imageFive: "../images/work/Brooke_Fanto_19760513_5 - brooke fanto.jpg",
  imageSix: "../images/work/Brooke_Fanto_19760513_6 - brooke fanto.jpg"
}, {
  studentNumber: "17159355",
  firstName: "Lachlan",
  lastName: "Robertson",
  email: "ambitxdesign@gmail.com",
  major: "Animation and Game Design",
  bio: "3D asset designer specializing in prop development, with skills in illustration and motion graphics. Open to opportunities.",
  tagLine: "Give gold, get gold.",
  portfolio: "https://www.artstation.com/ambitxdesign",
  linkedin: "https://www.linkedin.com/in/lachlan-robertson-axd/",
  instagram: "https://www.instagram.com/ambitxdesign/",
  twitter: "https://twitter.com/AmbitxDesign",
  vimeo: "",
  artStation: "https://www.artstation.com/ambitxdesign",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/17159355_alt.jpg",
  avatarTwo: "./images/graduateAvatars/17159355_Lrobertson_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/17159355_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/17159355_Lrobertson_main.jpg",
  imageOne: "../images/work/Lachlan_Robertson_17159355_1 - Lachlan Robertson.jpg",
  imageTwo: "../images/work/Lachlan_Robertson_17159355_2 - Lachlan Robertson.jpg",
  imageThree: "../images/work/Lachlan_Robertson_17159355_3 - Lachlan Robertson.jpg",
  imageFour: "../images/work/Lachlan_Robertson_17159355_4 - Lachlan Robertson.jpg",
  imageFive: "",
  imageSix: ""
}, {
  studentNumber: "19760814",
  firstName: "Anna",
  lastName: "Mai",
  email: "annamai00@outlook.com",
  major: "Graphic Design",
  bio: "I am a graphic designer who specializes in packaging design as well as branding that will help clients achieve a clear form of identity by creating compelling strategies that enhance the experience of the target audience. I highly value communication not only between working creatives but also between a design and the viewer. I make it a goal to empathize with the target audience and allow them to bathe in a magical experience when coming face to face with my works. With the Magician as my main archetype, I am an approachable creative who is mystical, transformative and all in all ensure that my clients and target audience have the best time of their lives. \n",
  tagLine: "Design with a hint of magic.",
  portfolio: "https://www.behance.net/annamai1",
  linkedin: "www.linkedin.com/in/i-am-anna-mai",
  instagram: "",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/annamai1",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19760814_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19760814_AMai_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19760814_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19760814_AMai_main.jpg",
  imageOne: "../images/work/Anna_Mai_19760814_1 - Anna Mai.jpg",
  imageTwo: "../images/work/Anna_Mai_19760814_2 - Anna Mai.jpg",
  imageThree: "../images/work/Anna_Mai_19760814_3 - Anna Mai.jpg",
  imageFour: "../images/work/Anna_Mai_19760814_4 - Anna Mai.jpg",
  imageFive: "../images/work/Anna_Mai_19760814_5 - Anna Mai.jpg",
  imageSix: ""
}, {
  studentNumber: "20037952",
  firstName: "Tian Hock",
  lastName: "Yan",
  email: "tianhockyan1122@gmail.com",
  major: "Digital Experience and Interaction Design",
  bio: "My name is Tian Hock Yan, and I am a UI/UX focused Digital Designer based in Perth, Western Australia. I am originally from Malaysia, and I am able to speak in three languages (Mandarin, English and Malay).\n\nI started doing design since I came to Curtin College, and all my designs were mainly in UX/UI. My main focus is on UX/UI design, and also minor in Graphic Design which enhanced my skills towards UX/UI design.\n\nI am passionate about learning new skills in design related areas. I’ve recently dived into learning photography, but also love digital art and animation.",
  tagLine: "My design is the one that bring you luck.",
  portfolio: "www.tiandigitaldesign.com",
  linkedin: "https://www.linkedin.com/in/tianhockyan/",
  instagram: "https://www.instagram.com/tiandigitaldesign/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/tianhockyan",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/20037952_alt.jpg",
  avatarTwo: "./images/graduateAvatars/20037952_THYan_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/20037952_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/20037952_THYan_main.jpg",
  imageOne: "../images/work/1t - Tian Hock Yan.jpg",
  imageTwo: "../images/work/2t - Tian Hock Yan.jpg",
  imageThree: "../images/work/3t - Tian Hock Yan.jpg",
  imageFour: "",
  imageFive: "",
  imageSix: ""
}, {
  studentNumber: "19467322",
  firstName: "Ruitan",
  lastName: "Huang",
  email: "ruitan1520@gmail.com",
  major: "Digital Experience and Interaction Design",
  bio: "Hi, I'm Ruitan. I'm an upbeat, self-motivated team player with strong communication skills. I love tackling design problems, and undertaking research to better understand users' needs and pain points. I am passionate  about learning new things and keeping up to date with design trends. ",
  tagLine: "I love learning new things, and I’m also an avid photographer",
  portfolio: "http://ruitanexpdesign.com",
  linkedin: "https://www.linkedin.com/in/ruitan-huang/",
  instagram: "https://www.instagram.com/ruitan_uidesign/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/ruitanhuang",
  dribbble: "https://dribbble.com/zeffa/collections",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19467322_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19467322_RHuang_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19467322_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19467322_RHuang_main.jpg",
  imageOne: "../images/work/Ruitan_Huang_19467322_2 - Ruitan Huang.jpg",
  imageTwo: "../images/work/Ruitan_Huang_19467322_4 - Ruitan Huang.png",
  imageThree: "../images/work/Ruitan_Huang_19467322_5 - Ruitan Huang.jpg",
  imageFour: "../images/work/Ruitan_Huang_19467322_1 - Ruitan Huang.png",
  imageFive: "../images/work/Ruitan_Huang_19467322_3 - Ruitan Huang.png",
  imageSix: "../images/work/Ruitan_Huang_19467322_6 - Ruitan Huang.png"
}, {
  studentNumber: "19168735",
  firstName: "Nicole Cassandra",
  lastName: "Torres",
  email: "nicsndratorres@gmail.com",
  major: "Graphic Design",
  bio: "Hi! Hello! Pleasure to meet you! I’m Nics, your local Filipino Graphic Designer. I've also studied Illustration! My family described me as passionate and dedicated. My friends described me as self-driven and reliable. I described myself as a dreamer who loves listening to showtunes. No, I can't sing. I’ve always been a dreamer, creating stories and characters through my drawings as an outlet for my vivid imagination. Due to my Illustration background, I always add my love for visual storytelling to my designs. This gives my work a unique concept and voice. I want my work to leave a positive lasting impression on people, the same feeling when your favourite show ended beautifully.",
  tagLine: "I may be only 152cm but I have my dreams and determination on my side",
  portfolio: "https://www.instagram.com/nicsndra/",
  linkedin: "",
  instagram: "https://www.instagram.com/nicsndra/",
  twitter: "https://twitter.com/nicsndra",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/nicsndra",
  dribbble: "https://dribbble.com/nicsndra",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19168735_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19168735_NCassandra_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19168735_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19168735_NCassandra_main.jpg",
  imageOne: "../images/work/Nicole_Torres_19168735_1 - Nicole Cassandra Torres.jpg",
  imageTwo: "../images/work/Nicole_Torres_19168735_3 - Nicole Cassandra Torres.jpg",
  imageThree: "../images/work/Nicole_Torres_19168735_5 - Nicole Cassandra Torres.jpg",
  imageFour: "../images/work/Nicole_Torres_19168735_2 - Nicole Cassandra Torres.jpg",
  imageFive: "../images/work/Nicole_Torres_19168735_4 - Nicole Cassandra Torres.jpg",
  imageSix: "../images/work/Nicole_Torres_19168735_6 - Nicole Cassandra Torres.jpg"
}, {
  studentNumber: "19785231",
  firstName: "Milla",
  lastName: "Zhai",
  email: "19785231@student.curtin.edu.au",
  major: "Graphic Design",
  bio: "I come from a sport and design background. 2 very different thing but interestingly enough they need each other to flourish. Let’s just say the choice was tough when deciding on my future but eventually I realised I could combine the two, where hopefully in the future I’ll be able to work in the sport industry as a graphic designer. \n\nMy eagerness and determination has allowed me to hone my skills at Curtin, where I am able to mix in photography, illustration and story telling into a variety of projects. I love how design can emulate someone’s dream or passion into a reality. It’s always so pleasing to see my work on display in the real world. For myself, brand marketing, publication and poster design are my main attributes. \n\nThe last 2 years I’ve been exploring freelance and had the opportunity to intern at The R Collective , a sustainable fashion brand, as a recipient of NCP or the New Colombo mobility plan OR in simpler terms I was supposed to complete my internship in Hong Kong (it’s not like this is the third trip that has been cancelled on me). Tasks that I worked on was UX design on their website, developing icons and their branding guidelines.",
  tagLine: "To sum myself up in four words: all. over. the. place. ",
  portfolio: "https://www.instagram.com/designedbymilla/",
  linkedin: "https://www.linkedin.com/in/milla-zhai-0a4b4617b/",
  instagram: "https://www.instagram.com/designedbymilla/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19785231_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19785231_MZhai_main.jpg",
  avatarOneHQ: "",
  avatarTwoHQ: "",
  imageOne: "../images/work/Milla_Zhai_19785231_1 - milla zhai.jpg",
  imageTwo: "../images/work/Milla_Zhai_19785231_2 - milla zhai.jpg",
  imageThree: "../images/work/Milla_Zhai_19785231_6 - milla zhai.jpg",
  imageFour: "../images/work/Milla_Zhai_19785231_4 - milla zhai.jpg",
  imageFive: "../images/work/Milla_Zhai_19785231_5 - milla zhai.jpg",
  imageSix: "../images/work/Milla_Zhai_19785231_ 3 - milla zhai.jpg"
}, {
  studentNumber: "19775669",
  firstName: "Paris",
  lastName: "Doick",
  email: "parisdoick@gmail.com",
  major: "Graphic Design",
  bio: "I’m Paris Doick, graphic designer and word refiner with a love for all things in the design realm, whether that be graphics, copy, photography, fashion or furniture. I’m passionate, gregarious and motivated; I love collaborating with other driven people and clients to create something killer. I value innovative craft, open communication and stretching the limits of ideation to create something truly special.\nA friend once told me to “feed your brain” – a sentiment that has stuck with me and now drives my design process. It pushes me to delve into the most uncommon of places to create unique and strategic design solutions.\nI believe that copy and graphics are intrinsically entwined, that the verbal and visual identity of your brand must have a solid foundation in order to engage positively with new and existing audiences. That’s why I offer both services here at Studio Double Knot, simplifying the search for a copy writer and graphic designer by providing both! A two-in-one deal if you will.\nWhen I’m not huddled over my computer designing away, you’ll find me going for walks in the bush, buying yet ANOTHER book and most definitely cooking up some mushrooms!\n",
  tagLine: "Studio Double Knot – catchy copy & striking graphics that deliver bold, thoughtful and audacious design solutions ",
  portfolio: "studiodoubleknot.squarespace.com",
  linkedin: "https://www.linkedin.com/in/paris-doick-173b9b17b/",
  instagram: "https://www.instagram.com/dbl.knt/?hl=en",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19775669_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19775669_PDoick_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19775669_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19775669_PDoick_main.jpg",
  imageOne: "../images/work/Paris_Doick_19775669_1 - Paris Doick.jpg",
  imageTwo: "../images/work/Paris_Doick_19775669_3 - Paris Doick.jpg",
  imageThree: "../images/work/Paris_Doick_19775669_5 - Paris Doick.jpg",
  imageFour: "../images/work/Paris_Doick_19775669_2 - Paris Doick.jpg",
  imageFive: "../images/work/Paris_Doick_19775669_4 - Paris Doick.jpg",
  imageSix: "../images/work/Paris_Doick_19775669_6 - Paris Doick.jpg"
}, {
  studentNumber: "19192187",
  firstName: "Ella",
  lastName: "Edwards",
  email: "30Ella.Edwards@gmail.com",
  major: "Graphic Design",
  bio: "I have always enjoyed creating identities and helping communicate peoples stories and passions since high school. Majoring in both film and graphic design, my aspiration is to one day become a specialist in design and marketing for film in Australia. While the journey hasn’t always been easy and I still have a long way to go I have managed to grow so much since my first semester. Working part-time and doing work experience while at University, I have developed strong organisation and problem solving skills. Whilst most of my ideas can be quite wacky, I ensure every brand or film I work on is backed by research and strategic planning to elevate a brand from its competitors. All round I am a hardworking empathic individual always looking to improve and help shape the design and film industry in Australia.\n",
  tagLine: "An enthusiastic creative always looking to tell a story through design, marketing and film.",
  portfolio: "https://www.instagram.com/ella.filmanddesign/",
  linkedin: "",
  instagram: "https://www.instagram.com/ella.filmanddesign/",
  twitter: "",
  vimeo: "https://vimeo.com/user156458001",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19192187_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19192187_EEdwards_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19192187_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19192187_EEdwards_main.jpg",
  imageOne: "../images/work/ELLA_EDWARDS_19192187_1 - Ella.jpg",
  imageTwo: "../images/work/ELLA_EDWARDS_19192187_2 - Ella.jpg",
  imageThree: "../images/work/ELLA_EDWARDS_19192187_3 - Ella.jpg",
  imageFour: "../images/work/ELLA_EDWARDS_19192187_4 - Ella.jpg",
  imageFive: "../images/work/ELLA_EDWARDS_19192187_5 - Ella.jpg",
  imageSix: "../images/work/ELLA_EDWARDS_19192187_6 - Ella.jpg"
}, {
  studentNumber: "19769662",
  firstName: "Mali ",
  lastName: "Merttens",
  email: "merttensmali@gmail.com",
  major: "Graphic Design",
  bio: "Hello! I’m a graphic designer with a passion for publication design and illustration. My goal with all designs is to help bring clients’ stories to life and elevate their brand through visual narratives. I believe in designing with purpose and creating stories that resonate with audiences so as to encourage connection and community. When I’m not designing I enjoy settling down with a good book, and playing Dungeons and Dragons. ",
  tagLine: "A daydream believer ",
  portfolio: "https://merttensmali.myportfolio.com",
  linkedin: "",
  instagram: "https://www.instagram.com/mal.ttens/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/malimerttens",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19769662_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19769662_MMerttens_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19769662_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19769662_MMerttens_main.jpg",
  imageOne: "../images/work/Mali_Merttens_19769662_1 - Marley.jpg",
  imageTwo: "../images/work/Mali_Merttens_19769662_3 - Marley.jpg",
  imageThree: "../images/work/Madi_Horler_19454722_5 - Madison Horler.jpg",
  imageFour: "../images/work/Mali_Merttens_19769662_2 - Marley.jpg",
  imageFive: "../images/work/Mali_Merttens_19769662_4 - Marley.jpg",
  imageSix: "../images/work/Mali_Merttens_19769662_6 - Marley.jpg"
}, {
  studentNumber: "18813157",
  firstName: "Adrina",
  lastName: "Chung",
  email: "dionysia.adrina@gmail.com",
  major: "Graphic Design",
  bio: "I am a curious creative who is ambitious and genuine. I seek to appeal not only in the aesthetic aspects but also in social causes. I specialise in brand identity and packaging, hoping to redefine the limits with acquired specialised knowledge in graphic design, advertising and entrepreneur experiences. My operations seek to embolden and highlight both established and new brands. I am always on the pursuit for innovation and designs which are close to the heart. I value giving back to the a larger cause, and seek collaboration with like-minded businesses and individuals. As a business owner myself, I have a deeper understanding of the struggles and challenges in putting a brand forth, and these experiences will better align and aid with customers request. ",
  tagLine: "Bridging your dreams into reality ",
  portfolio: "https://www.instagram.com/projectme.n.u",
  linkedin: "https://www.linkedin.com/in/adrinacsy/",
  instagram: "https://www.instagram.com/projectme.n.u",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/adrinacsy/",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/18813157_alt.jpg",
  avatarTwo: "./images/graduateAvatars/18813157_AChung_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/18813157_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/18813157_AChung_main.jpg",
  imageOne: "../images/work/Adrina_Chung_18813157_1 - adrina chung.jpg",
  imageTwo: "../images/work/Adrina_Chung_18813157_3 - adrina chung.jpg",
  imageThree: "../images/work/Adrina_Chung_18813157_5 - adrina chung.jpg",
  imageFour: "../images/work/Adrina_Chung_18813157_2 - adrina chung.jpg",
  imageFive: "../images/work/Adrina_Chung_18813157_4 - adrina chung.jpg",
  imageSix: "../images/work/Adrina_Chung_18813157_6 - adrina chung.jpg"
}, {
  studentNumber: "19768986",
  firstName: "Leah",
  lastName: "Schultz",
  email: "leahgschultz@gmail.com",
  major: "Graphic Design",
  bio: "I specialise in branding and illustration with aspirations to be a change maker, storyteller, and collaborator. I believe the experience of design impacts our everyday lives and provides a relief to our community.\n\nDesign has been in my bones throughout my life. I studied Design in High School, which coincidentally, my mum was my teacher. I have her to thank. She’s taught me about design and passed it down in my very DNA.\nI really did get it from my mama. I never wanted to study design leaving school. After all, both my older sisters were already designers in their fields. No way was I going to be the third designer in the family.\nBut... here I am, graduating in Bachelor of Design at Curtin, and something I’ll never regret doing and wear with pride to be apart of a creative family.",
  tagLine: "I got it from my mama",
  portfolio: "https://www.instagram.com/bystudioleah/",
  linkedin: "",
  instagram: "https://www.instagram.com/bystudioleah/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "https://dribbble.com/leah-schultz",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19768986_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19768986_LSchultz_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19768986_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19768986_LSchultz_main.jpg",
  imageOne: "../images/work/Leah_Schultz_19768986_1 - Leah Schultz.jpg",
  imageTwo: "../images/work/Leah_Schultz_19768986_3 - Leah Schultz.jpg",
  imageThree: "../images/work/Leah_Schultz_19768986_5 - Leah Schultz.jpg",
  imageFour: "../images/work/Leah_Schultz_19768986_2 - Leah Schultz.jpg",
  imageFive: "../images/work/Leah_Schultz_19768986_4 - Leah Schultz.jpg",
  imageSix: "../images/work/Leah_Schultz_19768986_6 - Leah Schultz.jpeg"
}, {
  studentNumber: "19720863",
  firstName: "Joshua",
  lastName: "Michell",
  email: "joshua_m_13@hotmail.com",
  major: "Animation and Game Design",
  bio: "Originally, I was going to study ancient life before I chose to pursue an art degree. I am a 3D generalist, supported by my 2D illustration skills. At uni I’ve found a love for animation I didn’t know I had and aspire to one day work on character animation. Every stage of animating is fascinating to me, from start to finish. Whether 2D or 3D, for games, television, or art, my dream is to join a studio team I can work with and learn from. I’ve been inspired by creative storytelling all my life, and I’m eager to use what I’ve learned at Curtin to inspire creativity and passion in the audience I reach. \nIf my work can spark someone’s imagination and inspire them to try being creative, I will have made the positive difference I want to see in the world.",
  tagLine: "A serial dreamer, aiming to inspire",
  portfolio: "artstation.com/possibly_joshua",
  linkedin: "linkedin.com/in/joshua-michell-5131b01a4/",
  instagram: "instagram.com/possibly_joshua_/",
  twitter: "twitter.com/possibly_joshua",
  vimeo: "",
  artStation: "artstation.com/possibly_joshua",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19720863_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19720863_JMichell_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19720863_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19720863_JMichell_main.jpg",
  imageOne: "../images/work/Joshua_Michell_19720863_1 - Serial Dreamer.jpg",
  imageTwo: "../images/work/Joshua_Michell_19720863_3 - Serial Dreamer.jpg",
  imageThree: "../images/work/Joshua_Michell_19720863_5 - Serial Dreamer.jpg",
  imageFour: "../images/work/Joshua_Michell_19720863_2 - Serial Dreamer.jpg",
  imageFive: "../images/work/Joshua_Michell_19720863_4 - Serial Dreamer.jpg",
  imageSix: "../images/work/Joshua_Michell_19720863_6 - Serial Dreamer.jpg"
}, {
  studentNumber: "19773249",
  firstName: "Michelle",
  lastName: "Thomas",
  email: "michellethomasx@hotmail.com",
  major: "Animation and Game Design",
  bio: "Hello! I’m Michelle and I like to make cute things that move. My strengths lie in 3D animation and character rigging, but I’m always trying to learn new skills so I can continue to make what I love. I aspire to be part of a project that will show others the beauty of animation. In my spare time I watch animations, read, and game.",
  tagLine: "I like making the pixels move",
  portfolio: "https://www.artstation.com/michelleqt",
  linkedin: "https://www.linkedin.com/in/michelleqthomas/",
  instagram: "",
  twitter: "https://twitter.com/michelleqthomas",
  vimeo: "",
  artStation: "https://www.artstation.com/michelleqt",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19773249_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19773249_MThomas_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19773249_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19773249_MThomas_main.jpg",
  imageOne: "../images/work/Michelle_Thomas_19773249_1 - Michelle Thomas.jpg",
  imageTwo: "../images/work/Michelle_Thomas_19773249_3 - Michelle Thomas.jpg",
  imageThree: "../images/work/Michelle_Thomas_19773249_5 - Michelle Thomas.jpg",
  imageFour: "../images/work/Michelle_Thomas_19773249_2 - Michelle Thomas.jpg",
  imageFive: "../images/work/Michelle_Thomas_19773249_4 - Michelle Thomas.jpg",
  imageSix: ""
}, {
  studentNumber: "19756130",
  firstName: "Alexandra",
  lastName: "McGee",
  email: "alexandrarosem2000@gmail.com",
  major: "Graphic Design",
  bio: "A graphic design student focused on creating brands that leave an impact on the viewer. Using my interest in illustration, I combine multiple mediums during the design process, and I won’t be satisfied until I’ve tried everything. I experiment with every possible facet I can think of, from digital work to spray paint, until I reach a solution. I am incredibly passionate about illustration and brand identity and how I can merge those two to create. I’m known for having an encyclopedia of random useless information due to my never-ending curiosity (did you know a crocodile can’t stick its tongue out?) I read somewhere that your brain dies when you stop learning, and I try to live by that.",
  tagLine: "A designer who embraces risk",
  portfolio: "axmcgeedesign.com",
  linkedin: "",
  instagram: "https://www.instagram.com/axmcgee.design/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19756130_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19756130_AMcbee_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19756130_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19756130_AMcbee_main.jpg",
  imageOne: "../images/work/Alexandra_McGee_19756130_1 - Alexandra McGee.jpg",
  imageTwo: "../images/work/Alexandra_McGee_19756130_3 - Alexandra McGee.jpg",
  imageThree: "../images/work/Alexandra_McGee_19756130_5 - Alexandra McGee.jpg",
  imageFour: "../images/work/Alexandra_McGee_19756130_2 - Alexandra McGee.jpg",
  imageFive: "../images/work/Alexandra_McGee_19756130_4 - Alexandra McGee.jpg",
  imageSix: "../images/work/Alexandra_McGee_19756130_6 - Alexandra McGee.jpg"
}, {
  studentNumber: "19160142",
  firstName: "Beth",
  lastName: "Naim",
  email: "bethnaim@gmail.com",
  major: "Graphic Design",
  bio: "I’m a graphic designer, creative advertiser and above all, a creative problem solver. I design and strategise with purpose, take pride in transparency and retaining an openminded attitude. Valuer of individualism and authenticity. Driver for cultural, social and corporate responsibility. Highly motivated and driven to break boundaries, both in and out of the workplace.\n\nI have an interest in pursuing strategy and art direction. Currently working on pushing personal and design barriers, and establishing myself as a creative within the advertising community.",
  tagLine: "Creative problem solver, driven by purpose",
  portfolio: "https://www.instagram.com/bnaim_studio/",
  linkedin: "https://www.linkedin.com/in/bethnaim/",
  instagram: "https://www.instagram.com/bnaim_studio/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/bethnaim",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19160142_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19160142_BNaim_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19160142_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19160142_BNaim_main.jpg",
  imageOne: "../images/work/BETH_NAIM_19160142_1 - Beth Naim.jpg",
  imageTwo: "../images/work/BETH_NAIM_19160142_3 - Beth Naim.jpg",
  imageThree: "../images/work/BETH_NAIM_19160142_5 - Beth Naim.jpg",
  imageFour: "../images/work/BETH_NAIM_19160142_2 - Beth Naim.jpg",
  imageFive: "../images/work/BETH_NAIM_19160142_4 - Beth Naim.jpg",
  imageSix: "../images/work/BETH_NAIM_19160142_6 - Beth Naim.jpg"
}, {
  studentNumber: "19096535",
  firstName: "Sylvia",
  lastName: "Chen",
  email: "chao.chen10@student.curtin.edu.au",
  major: "Animation and Game Design",
  bio: "I am a 3D environment and character artist with both art and postgraduate science degrees that specialized in creating detailed and realistic gaming assets. My passion for the creative art urged me to change my established scientific career. I have a natural affinity for geometry, and 3D space and structure which enables me to model characters, architecture, environment and create textures with ease and great personal enjoyment. I started out as a traditional 2D concept illustrator, and I am skilled in painting classically trained human anatomy. I can produce fine line art and refined traditional sketch with speed and quality, and paint polished concept art for both characters and environments. Though my main passion lies in creating realistic-styled characters and environmental assets, I can also create more stylised and abstract design. I take special interest in history and fantasy theme and are more experienced in creating assets for these genres. ",
  tagLine: "Creator of Worlds and Characters, Lover of Art, History, Culture, and Science",
  portfolio: "https://sylviachen.artstation.com/",
  linkedin: "https://www.linkedin.com/in/sylvia-chen-00071b225/",
  instagram: "",
  twitter: "https://twitter.com/wtxwkl",
  vimeo: "https://vimeo.com/user101612277",
  artStation: "https://www.artstation.com/sylviachen",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19096535_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19096535_SChaoChen_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19096535_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19096535_SChaoChen_main.jpg",
  imageOne: "../images/work/SylviaChen_19096535_1 - wtxwkl.jpg",
  imageTwo: "../images/work/SylviaChen_19096535_2 - wtxwkl.jpg",
  imageThree: "../images/work/SylviaChen_19096535_3 - wtxwkl.jpg",
  imageFour: "../images/work/SylviaChen_19096535_4 - wtxwkl.jpg",
  imageFive: "../images/work/SylviaChen_19096535_5 - wtxwkl.jpg",
  imageSix: "../images/work/SylviaChen_19096535_6 - wtxwkl.jpg"
}, {
  studentNumber: "19792888",
  firstName: "Dana",
  lastName: "Knowles",
  email: "deej333@hotmail.com.au",
  major: "Animation and Game Design",
  bio: "I wanted to start a career in something I was passionate about and have loved developing new skills and creating projects throughout the degree. Raised on old school Nintendo and PCs and a background of drawing and painting, I chose a Double Degree in Graphic Design and Animation and Game Design and found I have a passion for modelling, idea generation and creating things from scratch across the pipeline of a project.",
  tagLine: "Get lost in the rabbit hole of Modelling ",
  portfolio: "https://www.artstation.com/danaknowles5/",
  linkedin: "https://www.linkedin.com/in/dana-knowles-7bab3117b/",
  instagram: " https://www.instagram.com/dee_designs_333",
  twitter: "",
  vimeo: "",
  artStation: "https://www.artstation.com/danaknowles5/",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19792888_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19792888_DKnowles_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19792888_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19792888_DKnowles_main.jpg",
  imageOne: "../images/work/Dana_Knowles_19792888_1 - Dana Knowles.jpg",
  imageTwo: "../images/work/Dana_Knowles_19792888_2 - Dana Knowles.jpg",
  imageThree: "../images/work/Dana_Knowles_19792888_3 - Dana Knowles.jpg",
  imageFour: "../images/work/Dana_Knowles_19792888_4 - Dana Knowles.jpg",
  imageFive: "../images/work/Dana_Knowles_19792888_5 - Dana Knowles.jpg",
  imageSix: "../images/work/Dana_Knowles_19792888_6 - Dana Knowles.jpg"
}, {
  studentNumber: "19485502",
  firstName: "Tessa",
  lastName: "Stirling",
  email: "19485502@student.curtin.edu.au",
  major: "Graphic Design",
  bio: "I walk a fine line between graphic designer, artist and brand consultant. Art was my first love and has allowed me to seamlessly weave into the world of design thinking and brand strategy. I strive to create distinctive, unique branding which stands alone in the oversaturated online world of businesses. My passion for art and illustration allows me to create unique visual narratives which showcase brands personalities, values and their mission. My design process is carefully tailored to each of my clients, ensuring the final outcome appeals to their intended audience and engages with their needs, wants and interests. I thrive in creative environments and enjoy working collaboratively to create brands which have a strong focus on sustainability and empower businesses to disrupt their industry.   ",
  tagLine: "Microsoft Word Artist ",
  portfolio: "https://www.tessrstirlingdesigns.com/la-sola-studio",
  linkedin: "https://www.linkedin.com/in/tessa-stirling-583963219/",
  instagram: "@tessrstirling.designs",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/tessastirling",
  dribbble: "https://dribbble.com/tessastirling",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19485502_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19485502_TStirling_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19485502_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19485502_TStirling_main.jpg",
  imageOne: "../images/work/Tessa_Stirling_19485502_1 - Tessa Stirling.jpg",
  imageTwo: "../images/work/Tessa_Stirling_19485502_2 - Tessa Stirling.jpg",
  imageThree: "../images/work/Tessa_Stirling_19485502_3 - Tessa Stirling.jpg",
  imageFour: "../images/work/Tessa_Stirling_19485502_4 - Tessa Stirling.jpg",
  imageFive: "../images/work/Tessa_Stirling_19485502_5 - Tessa Stirling.jpg",
  imageSix: "../images/work/Tessa_Stirling_19485502_6 - Tessa Stirling.jpg"
}, {
  studentNumber: "19965680",
  firstName: "Hannah",
  lastName: "Jones",
  email: "designs.by.hann@outlook.com",
  major: "Graphic Design",
  bio: "Hello! I’m Hannah. What started with a Microsoft Paint addiction at the age of 7, has quickly turned into a strong love for Graphic Design. Over the past three years of studying at Curtin University, I have developed a passion for branding and packaging design. I have completed a diverse range of projects, and believe that I will be able to continuously create new and refreshing designs with my unique set of skills I’ve gained throughout my time at Curtin. I strive to enable my clients to achieve their goals for their brand through the use of clear branding strategies and clever design solutions.",
  tagLine: "Lover of all things creative",
  portfolio: "https://www.instagram.com/designs.by.hann/",
  linkedin: "",
  instagram: "https://www.instagram.com/designs.by.hann/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19965680_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19965680_HJones_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19965680_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19965680_HJones_main.jpg",
  imageOne: "../images/work/Hannah_Jones_19965680_1 - Hannah Jones.jpg",
  imageTwo: "../images/work/Hannah_Jones_19965680_2 - Hannah Jones.jpg",
  imageThree: "../images/work/Hannah_Jones_19965680_3 - Hannah Jones.jpg",
  imageFour: "../images/work/Hannah_Jones_19965680_4 - Hannah Jones.jpg",
  imageFive: "../images/work/Hannah_Jones_19965680_5 - Hannah Jones.jpg",
  imageSix: "../images/work/Hannah_Jones_19965680_6 - Hannah Jones.jpg"
}, {
  studentNumber: "18846674",
  firstName: "Samantha",
  lastName: "Maliwat",
  email: "sammy.maliwat@gmail.com",
  major: "Graphic Design",
  bio: "I am Samantha and I like spending my time on computers making posters and gaming. I own two lovely guinea pigs named Gilbert and Rupert who are my service pigs that got me through crazy uni assessments. I also have passion in watching movies. Horror is my favourite genre and my dream job is to work as a Graphic Designer for the movie industry from anywhere to Australia to Hollywood California.",
  tagLine: "Eccentric, Experimental, Out of the box",
  portfolio: "https://www.instagram.com/s.maliwat_designs/",
  linkedin: "",
  instagram: "https://www.instagram.com/s.maliwat_designs/",
  twitter: "https://twitter.com/smaliwatdesigns",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/18846674_alt.jpg",
  avatarTwo: "./images/graduateAvatars/18846674_SMabirrat_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/18846674_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/18846674_SMabirrat_main.jpg",
  imageOne: "../images/work/Samantha_Maliwat_18846674_1 - Bacon Omnom.jpg",
  imageTwo: "../images/work/Samantha_Maliwat_18846674_2 - Bacon Omnom.jpg",
  imageThree: "../images/work/Samantha_Maliwat_18846674_3 - Bacon Omnom.jpg",
  imageFour: "../images/work/Samantha_Maliwat_18846674_4 - Bacon Omnom.jpg",
  imageFive: "../images/work/Samantha_Maliwat_18846674_5 - Bacon Omnom.jpg",
  imageSix: "../images/work/Samantha_Maliwat_18846674_6 - Bacon Omnom.jpg"
}, {
  studentNumber: "19499736",
  firstName: "Jordan",
  lastName: "Nesic",
  email: "nesicjordan@gmail.com",
  major: "Graphic Design",
  bio: "Hi, my name's Jordan! Here's a little bit about myself - I love cinnamon scrolls, rap and design. My passion as a designer is coming up with creative solutions for unique brands. New enterprises’ being my bread and butter; my design solutions are all lead by a breadth of research, ideation and intuition. I take research as an opportunity to learn more and teach some - utilising my designs to bridge a gap, while providing my own personal touch and serving up brands an identity that won't go stale.",
  tagLine: "Quick witted designer that's hungry and not afraid to take the first bite.",
  portfolio: "www.jnesic.com",
  linkedin: "https://www.linkedin.com/in/jordan-nesic-323659220",
  instagram: "@jordan.nesic_design",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19499736_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19499736_JNesic_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19499736_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19499736_JNesic_main.jpg",
  imageOne: "../images/work/Jordan_Nesic_19499736_1 - Jordan N.jpg",
  imageTwo: "../images/work/Jordan_Nesic_19499736_2 - Jordan N.jpg",
  imageThree: "../images/work/Jordan_Nesic_19499736_3 - Jordan N.jpg",
  imageFour: "../images/work/Jordan_Nesic_19499736_4 - Jordan N.jpg",
  imageFive: "",
  imageSix: ""
}, {
  studentNumber: "18342224",
  firstName: "Jamin",
  lastName: "Saw",
  email: "jaminsawanimation@gmail.com",
  major: "Animation and Game Design",
  bio: "Hi, I'm Jamin, I'm an animator. When I was  younger, I was obsessed with cartoons, I loved the way they pushed the boundries of reality. I knew that animation was the best way to create the worlds of my imagination. Even before I started my creative journey, I had a craving to learn all I could about how my favorite cartoons and animated movies were made.\nI value the passion that creatives put into their work and I'm inspired when it shows through. I want to pass on the same creative spark that I was given by those cartoons I watched as a kid. I love music and enjoy gaming and movies in my free time, but whatever I do, I love it more when it's shared with others.",
  tagLine: "An animator that's always looking for new music",
  portfolio: "https://jaminsawanimations.com",
  linkedin: "https://www.linkedin.com/in/jamin-saw-198139177/",
  instagram: "https://www.instagram.com/j.s_animator",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/jaminsaw",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/18342224_alt.jpg",
  avatarTwo: "./images/graduateAvatars/18342224_JSaw_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/18342224_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/18342224_JSaw_main.jpg",
  imageOne: "../images/work/Jamin_Saw_18342224_1 - Jamin Saw.jpg",
  imageTwo: "../images/work/Jamin_Saw_18342224_2 - Jamin Saw.jpg",
  imageThree: "../images/work/Jamin_Saw_18342224_3 - Jamin Saw.jpg",
  imageFour: "../images/work/Jamin_Saw_18342224_4 - Jamin Saw.jpg",
  imageFive: "../images/work/Jamin_Saw_18342224_5 - Jamin Saw.jpg",
  imageSix: "../images/work/Jamin_Saw_18342224_6 - Jamin Saw.jpg"
}, {
  studentNumber: "19148724",
  firstName: "Eden",
  lastName: "Leicester",
  email: "eleicester.art@gmail.com",
  major: "Animation and Game Design",
  bio: "Hello! My name is Eden Leicester and my favourite colour is pink. I am an illustrator and animator who likes drawing funny cartoon people to make them do funny cartoon things. When designing characters, I enjoy creating contrast and variety within a cast, playing with complementary themes and visual language. If I have the chance, I like incorporating mixed media into my work, such as photography and scanned fabric patterns, to create something that couldn’t be done by illustration alone. When making animations I like to use a mix of 2d frame by frame animation and motion graphic animation. My tutors don't understand why I like to use Premiere Pro for animation and I don’t understand why more people aren’t using it for animation (I also know After Effects too, don’t stress). My main goal for anything I create is for it to be fun. It’s easy for me to get lost in my own world with my own ideas, but I believe it is important to enjoy what you create in order to create something that is enjoyed by others!",
  tagLine: "I like making fun things for fun!",
  portfolio: "https://www.edenleicester.com/",
  linkedin: "https://www.linkedin.com/in/eden-leicester-5aa111219/",
  instagram: "https://www.instagram.com/eden_leicester/",
  twitter: "https://twitter.com/EdenLeicester",
  vimeo: "https://vimeo.com/user124067459",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19148724_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19148724_ELeicester_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19148724_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19148724_ELeicester_main.jpg",
  imageOne: "../images/work/Eden_Leicester_19148724_1 - Eden Leicester.jpg",
  imageTwo: "../images/work/Eden_Leicester_19148724_2 - Eden Leicester.jpg",
  imageThree: "../images/work/Eden_Leicester_19148724_3 - Eden Leicester.jpg",
  imageFour: "../images/work/Eden_Leicester_19148724_4 - Eden Leicester.jpg",
  imageFive: "../images/work/Eden_Leicester_19148724_5 - Eden Leicester.jpg",
  imageSix: "../images/work/Eden_Leicester_19148724_6 - Eden Leicester.jpg"
}, {
  studentNumber: "19749253",
  firstName: "Yaeram",
  lastName: "Kim",
  email: "destinylover45@gmail.com",
  major: "Animation and Game Design",
  bio: "Attending a visual art specialist high school, I wanted to do something that I know I would want to do and enjoy. Animation and Game Design was just that. Going to Curtin University for the Animation and Game Design course really helped me to focus on the skills I need and experience the things that would push me to higher steps. With these new skills and experiences that I have gained and will gain, I hope to create the things that other people would enjoy just as much as I enjoyed other's.",
  tagLine: '"There are no accidents." - Master Oogway',
  portfolio: "https://www.artstation.com/yaeramkim5",
  linkedin: "https://www.linkedin.com/in/yaeram-kim-a1b270181/",
  instagram: "https://www.instagram.com/yaeramk/?hl=en",
  twitter: "",
  vimeo: "",
  artStation: "https://www.artstation.com/yaeramkim5",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19749253_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19749253_YKim_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19749253_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19749253_YKim_main.jpg",
  imageOne: "../images/work/Yaeram_Kim_19749253_1 - yaeram kim.png",
  imageTwo: "../images/work/Yaeram_Kim_19749253_2 - yaeram kim.png",
  imageThree: "../images/work/Yaeram_Kim_19749253_3 - yaeram kim.png",
  imageFour: "../images/work/Yaeram_Kim_19749253_4 - yaeram kim.png",
  imageFive: "../images/work/Yaeram_Kim_19749253_5 - yaeram kim.JPG",
  imageSix: "../images/work/Yaeram_Kim_19749253_6 - yaeram kim.JPG"
}, {
  studentNumber: "19762328",
  firstName: "Lilybelle",
  lastName: "Tarr",
  email: "Lilybelle.tarr@gmail.com",
  major: "Graphic Design",
  bio: "Hi, I'm Lily and I specialise in innovative brand strategy solutions for small businesses in the hospitality industry. I enjoy creating vibrant and bold design solutions that challenge the norm, and break stereotypes. Above all, I value empathy, and believe empathy should lead all design solutions. Branding for the hospitality industry is truly my calling due to the fact I have five years of experience in the industry, mostly as a barista. In many ways, working in a café has many similarities to delivering a project. Be efficient, put the customer first and always remember the small details, even if it is a quarter sugar in your flat white. ",
  tagLine: "Small Places, Big Ideas.",
  portfolio: "https://www.instagram.com/lilybelle.design/",
  linkedin: "https://www.linkedin.com/in/lilybelle-tarr-585164175/",
  instagram: "https://www.instagram.com/lilybelle.design/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19762328_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19762328_LTarr_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19762328_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19762328_LTarr_main.jpg",
  imageOne: "../images/work/Lilybelle_Tarr_19762328_1 - Lilybelle tarr.jpg",
  imageTwo: "../images/work/Lilybelle_Tarr_19762328_2 - Lilybelle tarr.jpg",
  imageThree: "../images/work/Lilybelle_Tarr_19762329_3 - Lilybelle tarr.jpg",
  imageFour: "../images/work/Lilybelle_Tarr_19762328_4 - Lilybelle tarr.jpg",
  imageFive: "../images/work/Lilybelle_Tarr_19762328_5 - Lilybelle tarr.jpg",
  imageSix: "../images/work/Lilybelle_Tarr_19762328_6 - Lilybelle tarr.jpg"
}, {
  studentNumber: "19790316",
  firstName: "Jekko",
  lastName: "Cabral",
  email: "jekkocabral@gmail.com",
  major: "Animation and Game Design",
  bio: "Since I was young, I was interested in technologies and 3D modelling. This interest grew into a passion, and I was motivated into studying design courses with a long-term goal of developing video games and animations. In particular, I take interest in level designing, creating narrative stories with themes, and programming 3D objects and characters in a digital environment. Recently, I also grew an appreciation for 2D animation and popular design trends, art styles, and creative motion graphics.",
  tagLine: "Passionate about level designing, 3D modelling and animating.",
  portfolio: "https://www.artstation.com/jcabral",
  linkedin: "",
  instagram: "",
  twitter: "",
  vimeo: "",
  artStation: "https://www.artstation.com/jcabral",
  behance: "https://www.behance.net/jekkocabral",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19790316_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19790316_JCabral_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19790316_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19790316_JCabral_main.jpg",
  imageOne: "../images/work/Jekko_Cabral_19790316_1 - J C.jpg",
  imageTwo: "../images/work/Jekko_Cabral_19790316_2 - J C.jpg",
  imageThree: "../images/work/Jekko_Cabral_19790316_3 - J C.jpg",
  imageFour: "../images/work/Jekko_Cabral_19790316_4 - J C.jpg",
  imageFive: "../images/work/Jekko_Cabral_19790316_5 - J C.jpg",
  imageSix: "../images/work/Jekko_Cabral_19790316_6 - J C.jpg"
}, {
  studentNumber: "19918406",
  firstName: "Nina",
  lastName: "Dakin",
  email: "ninaddakin@gmail.com",
  major: "Animation and Game Design",
  bio: "I am someone who loves a good story, be it in a comic, an animation, a theatre show or poem. I have tried my hand at Stop motion, 3D and 2D animation, but my passion lies in pre-visualisation or storyboarding, because it is where the story gets told and can make or break a production. Contributing to the organisation and betterment of the larger art community is very important to me, and I have gotten involved, tabled, and volunteered in events such as the Perth Comic Arts Festival and Xerox Days Zine Market. I have been a committee member for the Curtin Animation Club and Curtin Illustration Club and this coming year, I will be the President of the Illustration Club. My comics has been published in Myth 5 and 6, and The West Coast Comic Anthology. I always try and get involved wherever I can and was the 2020 WAnimate 3Thirty Tertiary Award Winner, the 2021 WAnimate 48 Hour Animation Challenge winner, the winner of the 2021 Curtin Story Jam Storyboarding Prize and the 2020 Creative Jam Design Competition 2020 winner. I am an organised and passionate person who brings a level of thoughtfulness and complexity to any project I do.",
  tagLine: "Storyboarding, 3D and Comic-making.",
  portfolio: "https://ninadakin.wixsite.com/my-site-1",
  linkedin: "https://au.linkedin.com/in/nina-dakin-0a8688176",
  instagram: "https://www.instagram.com/ninadakin/",
  twitter: "",
  vimeo: "https://vimeo.com/user127964005",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19918406_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19918406_NDakin_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19918406_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19918406_NDakin_main.jpg",
  imageOne: "../images/work/Nina_Dakin_19918406_1 - Nina Dakin.jpg",
  imageTwo: "../images/work/Nina_Dakin_19918406_2 - Nina Dakin.jpg",
  imageThree: "../images/work/Nina_Dakin_19918406_3 - Nina Dakin.jpg",
  imageFour: "../images/work/Nina_Dakin_19918406_4 - Nina Dakin.jpg",
  imageFive: "../images/work/Nina_Dakin_19918406_5 - Nina Dakin.jpg",
  imageSix: "../images/work/Nina_Dakin_19918406_6 - Nina Dakin.jpg"
}, {
  studentNumber: "19770295",
  firstName: "Daffa",
  lastName: "Rizkiadi",
  email: "daffa.sr@gmail.com",
  major: "Animation and Game Design",
  bio: "You ever had an idea in your head and wanted to make it a reality? Turn it into something more than just a fleeting thought shelved in an imaginary locker in your brain never to see the light of day? That's what led me here. That and because this degree have no exams. The chance to make something that will put people through a roller coaster of visual and emotional spectacle that leaves them with something new, or being a viewer yourself and being inspired by the work of others. What am I drawn to make? Things involving 3D modelling and illustration, especially stylised works that integrate both 2D and 3D elements. The charm of the design field is how each step is a stairway of growth as you experiment, fail, learn and improve your craft, because your mediocre work today is what leads to your magnum opus tomorrow. Its hard to gauge just how passionate you are at something, but when you get excited at the render finally looking just right by willingly staying up till 3AM, its hard to say you're not invested. Not everyone have the opportunity to turn passion into profession, so its best to try and make the most of it.\n\nAnd remember, stay hydrated.\n\n- Sincerely, me at 3AM\n",
  tagLine: '"Remember to check your settings before rendering" - Sun Tzu, Art of War',
  portfolio: "https://www.artstation.com/daffarizkiadi",
  linkedin: "https://www.linkedin.com/in/daffa-rizkiadi-444b63204/",
  instagram: "",
  twitter: "",
  vimeo: "",
  artStation: "https://www.artstation.com/daffarizkiadi",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19770295_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19770295_DRizkiadi_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19770295_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19770295_DRizkiadi_main.jpg",
  imageOne: "../images/work/Daffa_Rizkiadi_19770295_1 - Daffa Rizkiadi.jpg",
  imageTwo: "../images/work/Daffa_Rizkiadi19770295_2 - Daffa Rizkiadi.jpg",
  imageThree: "../images/work/Daffa_Rizkiadi_19770295_3 - Daffa Rizkiadi.jpg",
  imageFour: "../images/work/Daffa_Rizkiadi_19770295_4 - Daffa Rizkiadi.jpg",
  imageFive: "../images/work/Daffa_Rizkiadi_19770295_5 - Daffa Rizkiadi.jpg",
  imageSix: "../images/work/Daffa_Rizkiadi_19770295_6 - Daffa Rizkiadi.jpg"
}, {
  studentNumber: "19467092",
  firstName: "Julian",
  lastName: "Osborn",
  email: "19467092@student.curtin.edu.au",
  major: "Digital Experience and Interaction Design",
  bio: "Hello there. I'm Julian, a designer & developer with a keen eye for curating aesthetics. I draw from a wide range of sources and strive to create meaningful work. I'm well-versed in web development, design, and art. Check out my personal website for an in-depth look at my work.",
  tagLine: "Friendly guy with strong skills in web & graphic design",
  portfolio: "https://www.julianosborn.com",
  linkedin: "",
  instagram: "https://www.instagram.com/yourbestfriendjippy/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "https://github.com/julian099",
  shirt: "https://yourbestfriendjippy.com",
  avatarOne: "./images/graduateBags/_DSC1411.jpg",
  avatarTwo: "./images/graduateBags/_DSC1408.jpg",
  avatarOneHQ: "./images/graduateBagsHQ/_DSC1411.jpg",
  avatarTwoHQ: "./images/graduateBagsHQ/_DSC1408.jpg",
  imageOne: "../images/work/Julian_Osborn_19467092_1 - Jippy.jpg",
  imageTwo: "../images/work/Julian_Osborn_19467092_2 - Jippy.jpg",
  imageThree: "../images/work/Julian_Osborn_19467092_3 - Jippy.jpg",
  imageFour: "../images/work/Julian_Osborn_19467092_4 - Jippy.jpg",
  imageFive: "../images/work/Julian_Osborn_19467092_5 - Jippy.jpg",
  imageSix: "../images/work/Julian_Osborn_19467092_6 - Jippy.jpg"
}, {
  studentNumber: "17373236",
  firstName: "Emily",
  lastName: "Harding",
  email: "17373236@student.curtin.edu.au",
  major: "Graphic Design",
  bio: "Hey stranger! I’m Emily and there are a few things you should know about me; I’m partial to a bit of 80’s rock music, a good glass of wine and am low-key obsessed with my cat, Sabbath. I’ve always been a bit of a social misfit and found it hard to fit in, but if design has taught me anything it’s that those who stand out are the ones who make a lasting impression! It’s this notion of standing out, of being different, that drives me as a designer. Guided by in-depth research and rock-solid strategy I observe what exists in the market and combine creative new concepts with inspiration from even the strangest of places to create brand identities that unapologetically break the mould. I firmly believe that the edge is where truly creative solutions are found so I throw everything I have into each and every project and push myself to achieve an outcome that can please even my own perfectionist tendencies. In my spare time you’ll find me converting my Toyota Coaster bus into a home on wheels, tending to the demands of my screaming hell panther of a cat or obsessing over some new found crafty hobby that will almost certainly be short lived. ",
  tagLine: "A strange girl who loves design and good wine",
  portfolio: "http://studiostrangestranger.com.au/",
  linkedin: "",
  instagram: "https://www.instagram.com/studiostrangestranger/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/17373236_alt.jpg",
  avatarTwo: "./images/graduateAvatars/17373236_EHarding_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/17373236_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/17373236_EHarding_main.jpg",
  imageOne: "../images/work/Emily_Harding_17373236_1 - Emily Harding.jpg",
  imageTwo: "../images/work/Emily_Harding_17373236_2 - Emily Harding.jpg",
  imageThree: "../images/work/Emily_Harding_17373236_3 - Emily Harding.jpg",
  imageFour: "../images/work/Emily_Harding_17373236_4 - Emily Harding.jpg",
  imageFive: "../images/work/Emily_Harding_17373236_5 - Emily Harding.jpg",
  imageSix: "../images/work/Emily_Harding_17373236_6 - Emily Harding.jpg"
}, {
  studentNumber: "19449087",
  firstName: "Matthew",
  lastName: "Gilmour",
  email: "Matthew.Gilmour26@gmail.com",
  major: "Graphic Design",
  bio: "With an addictive (almost unnatural) passion for packaging and branding design, I produce practical yet creative driven solutions that break the barrier between traditional and modern design. I am a creative individual that puts in the hours to get the results that he wants. I like to take on briefs that challenge me and push me to design solutions that are out of my regular style and form. I want clients and consumers to feel the difference in the designs that I create and realise that there is a purpose behind each decision and solution. Through the help of a detailed and in-depth analysis process, conducted on a brand and their strategy, I can confidently provide both sensible and unique solutions that go beyond their regular expectations. This process of mine is supported by the expert education provided by Curtin University, along with experienced knowledge from leaders in the Perth Graphic Design community, as well as other expert Brand Consultants. Over the past few years, I have grown a rapid love hate relationship with the Adobe Creative Suite, especially with Photoshop, Illustrator and Indesign. Luckily, I have acquired a number of skills from those mistakes and successes, and I feel my ability in these programs reflects the passion that I have for this industry. From the projects that I have completed, the amount of effort and passion that I pour into each brief is clearly visible in the final results and client satisfaction. I push myself to include this motivation as an important value of mine is to give the best of myself to each project I contribute to. Looking into the future, I want to continue to develop my knowledge and skills in the Graphic Design and Creative Advertising space, as well as continue to learn from industry leaders so that I too can evolve into a successful leader in this industry.",
  tagLine: "A creative on a mission to brand and package the world - including everything inside it.",
  portfolio: "https://www.instagram.com/cosmic_studios_perth/",
  linkedin: "",
  instagram: "https://www.instagram.com/cosmic_studios_perth/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19449087_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19449087_MGilmoor_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19449087_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19449087_MGilmoor_main.jpg",
  imageOne: "../images/work/Matthew_Gilmour_19449087_1 - Matthew Gilmour.jpg",
  imageTwo: "../images/work/Matthew_Gilmour_19449087_2 - Matthew Gilmour.jpg",
  imageThree: "../images/work/Matthew_Gilmour_19449087_3 - Matthew Gilmour.jpg",
  imageFour: "../images/work/Matthew_Gilmour_19449087_4 - Matthew Gilmour.jpg",
  imageFive: "../images/work/Matthew_Gilmour_19449087_5 - Matthew Gilmour.jpg",
  imageSix: "../images/work/Matthew_Gilmour_19449087_6 - Matthew Gilmour.jpg"
}, {
  studentNumber: "19131148",
  firstName: "Joshua",
  lastName: "Foti",
  email: "joshuafoti98@hotmail.com",
  major: "Graphic Design",
  bio: "Hi. I'm Josh, or you can call me lil vinci. The nickname is a stupidly long story, so all you  need to know is that it comes from two things- I like rap & renaissance art. This clash of modernity and tradition is the backbone of my work and identity. Consider me a vibrant graphic designer & passionate visual artist; who manages to excel in both these creative areas. This talented and unique skill set has opened many doors for me (and hopefully many more), as my passion to combine the two disciplines sets me apart from the rest...",
  tagLine: "Designer. Illustrator. Artist.",
  portfolio: "josh-foti.com",
  linkedin: "",
  instagram: "@lil.vinci",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19131148_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19131158_JFoti_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19131148_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19131158_JFoti_main.jpg",
  imageOne: "../images/work/Joshua_Foti_19131148_1 - lilvinci.jpg",
  imageTwo: "../images/work/Joshua_Foti_19131148_2 - lilvinci.jpg",
  imageThree: "../images/work/Joshua_Foti_19131148_3 - lilvinci.jpg",
  imageFour: "../images/work/Joshua_Foti_19131148_4 - lilvinci.jpg",
  imageFive: "../images/work/Joshua_Foti_19131148_5 - lilvinci.jpg",
  imageSix: "../images/work/Joshua_Foti_19131148_6 - lilvinci.jpg"
}, {
  studentNumber: "19783853",
  firstName: "Olivia ",
  lastName: "Ialacci",
  email: "olivia.ialacci@student.curtin.edu.au",
  major: "Graphic Design",
  bio: "I am a designer who believes the most powerful tool we can utilise in this business is empathy. Being able to take on and appreciate the perspective of another person is vital to connecting with the target audience, clients and colleagues.  I was first interested in design because I wanted to explore the way it can emotionally move you and amplify unexpected voices and perspectives. \n\nThe combination of graphic design, advertising and illustration skills enables me to create high quality work from the initial ideation stage all the way to post production. I always aim to think of projects and design solutions from a novel and unexpected angle that tells a story the target audience feels invested in or intrigued by.",
  tagLine: "Every great design begins with an even better story",
  portfolio: "www.oliviaialacci.com",
  linkedin: "https://www.linkedin.com/in/oliviaialacci/",
  instagram: "https://www.instagram.com/oialacci_design/?utm_medium=copy_link",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19783853_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19783853_OLalacci_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19783853_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19783853_OLalacci_main.jpg",
  imageOne: "../images/work/Olivia_Ialacci_19783853_1 - Olivia Ialacci.jpg",
  imageTwo: "../images/work/Olivia_Ialacci_19783853_2 - Olivia Ialacci.jpg",
  imageThree: "../images/work/Olivia_Ialacci_19783853_3 - Olivia Ialacci.jpg",
  imageFour: "../images/work/Olivia_Ialacci_19783853_4 - Olivia Ialacci.jpg",
  imageFive: "../images/work/Olivia_Ialacci_19783853_5 - Olivia Ialacci.jpg",
  imageSix: "../images/work/Olivia_Ialacci_19783853_6 - Olivia Ialacci.jpg"
}, {
  studentNumber: "19501903",
  firstName: "Sophie",
  lastName: "Till",
  email: "sophietill.art@gmail.com",
  major: "Animation and Game Design",
  bio: "Since childhood I have loved animals, the natural world and the fantastical, and tried to replicate the feeling of wonder that these awoke inside me. First I followed this to biology before pivoting to animation due to my wish to be able to share my fascination with life with others. My passion for 3D and animation has since bloomed while helping me to explore the depths of my creativity. I'm enraptured by the art of storytelling and have always enjoyed engaging with creative mediums. I recently discovered I have aphantasia, which has only fuelled my passion. Being able to see my creations come to life, compensating for the lack of visuals in my head is incredibly rewarding.\nWhile 3D character design of both humans and animals is my personal passion, I have broadened myself to a 3D generalist as I enjoy other parts of the creative pipeline, including rigging, animation, and environment modelling, as well as gaining significant experience working with game engines. Throughout my studies I have also found a passion for teamwork and love exploring ideas with others to create beautiful stories, be it through games or animations. My dream for the future is to work with other creative individuals on weird and wonderful projects that we can share with the world.",
  tagLine: "3D artist here to help create that magical world that brings everyones inner kid out.",
  portfolio: "http://sophietillart.com/",
  linkedin: "https://www.linkedin.com/in/sophie-till-178a55219/",
  instagram: "https://www.instagram.com/sophietillart/",
  twitter: "",
  vimeo: "",
  artStation: "https://www.artstation.com/sophietill",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19501903_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19501903_STill_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19501903_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19501903_STill_main.jpg",
  imageOne: "../images/work/Sophie_Till_19501903_1 - Sophie Till.jpg",
  imageTwo: "../images/work/Sophie_Till_19501903_2 - Sophie Till.jpg",
  imageThree: "../images/work/Sophie_Till_19501903_3 - Sophie Till.jpg",
  imageFour: "../images/work/Sophie_Till_19501903_4 - Sophie Till.jpg",
  imageFive: "../images/work/Sophie_Till_19501903_5 - Sophie Till.jpg",
  imageSix: "../images/work/Sophie_Till_19501903_6 - Sophie Till.jpg"
}, {
  studentNumber: "17817860",
  firstName: "Alex",
  lastName: "Bertilone",
  email: "alex.bertilone@gmail.com",
  major: "Animation and Game Design",
  bio: "I am Alex Bertilone.\nMy major is in animation and game design. I also have a minor in fine arts.\n\nThe work I do is focused on animation, motion graphics and creating images. When creating projects, my tools of choice are Adobe Photoshop and Adobe After Effects. I also enjoy using Adobe Illustrate. I really enjoy creating art.\n\nWhen not making art, I enjoy surfing the web to get new ideas for future projects. I also enjoy watching movies (Star Wars is a definite favourite of mine). \n\nI also love cats.\n\n",
  tagLine: "I animate, I draw, I make art",
  portfolio: "https://alex_berti_a.artstation.com/",
  linkedin: "",
  instagram: "",
  twitter: "",
  vimeo: "",
  artStation: "https://www.artstation.com/alex_berti_a",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/17817860_alt.jpg",
  avatarTwo: "./images/graduateAvatars/17817860_ABertilone_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/17817860_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/17817860_ABertilone_main.jpg",
  imageOne: "../images/work/Alex_Bertilone_17817860_1 - Alex Bertilone.jpg",
  imageTwo: "../images/work/Alex_Bertilone_17817860_2 - Alex Bertilone.jpg",
  imageThree: "../images/work/Alex_Bertilone_17817860_3 - Alex Bertilone.jpg",
  imageFour: "../images/work/Alex_Bertilone_17817860_4 - Alex Bertilone.jpg",
  imageFive: "../images/work/Alex_Bertilone_17817860_5 - Alex Bertilone.jpg",
  imageSix: ""
}, {
  studentNumber: "19157254",
  firstName: "Eleyna",
  lastName: "Newby",
  email: "eleyna.newbye@gmail.com",
  major: "Graphic Design",
  bio: "From a young age, since I first discovered photoshop and all of the wondrous things I could create, I just haven’t stopped. Through a bubbly and bright vision, I hope to bring a splash of creativity to every project that I design. A practice of mine is learning random facts and trivia about the world and applying them to my design process. I love to bring projects to life through unique and exciting choices while still maintaining a sense of balance. Specifically, I tend to gravitate towards packaging and branding with illustration based designs. Through applying all of my passion and experience I can successfully tackle any design project thrown my way. \n\n",
  tagLine: "Only a Newby in name, not in Design.",
  portfolio: "https://www.instagram.com/humble_bee_design",
  linkedin: "",
  instagram: "https://www.instagram.com/humble_bee_design",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19157254_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19157254_ENewby_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19157254_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19157254_ENewby_main.jpg",
  imageOne: "../images/work/Eleyna_Newby_19157254_1 - Elle Rose.jpg",
  imageTwo: "../images/work/Eleyna_Newby_19157254_2 - Elle Rose.jpg",
  imageThree: "../images/work/Eleyna_Newby_19157254_3 - Elle Rose.jpg",
  imageFour: "../images/work/Eleyna_Newby_19157254_4 - Elle Rose.jpg",
  imageFive: "../images/work/Eleyna_Newby_19157254_5 - Elle Rose.jpg",
  imageSix: "../images/work/Eleyna_Newby_19157254_6 - Elle Rose.jpg"
}, {
  studentNumber: "19454722",
  firstName: "Madi",
  lastName: "Horler",
  email: "madihorler@gmail.com",
  major: "Graphic Design",
  bio: "I am a graphic designer with a passion for building radically different brands that leave a lasting impression on the mind and soul. My heart lies in building cohesive brand identities that harmoniously marry the forces of colour, typography, pattern, illustration, copy and some old school art and craft every now and then. Behind each of my works lies a thoughtful strategy and considered research plan, giving me the tools to develop brands that are truly unique within their market. As a designer, every decision I make is based on differentiating from what’s currently out there, leading me to create intriguing works that challenge audience perceptions in their respective categories. When I’m not passionately brainstorming ideas or scrolling through the depths of Pinterest, you’ll catch me and my alter ego in the gym lifting heavy things, out on the netball court or fiercely dancing to Beyonce.",
  tagLine: "Cultivator of mad little ideas",
  portfolio: " madihorlercreative.com",
  linkedin: "",
  instagram: "https://www.instagram.com/madihorler_creative/?hl=en",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19454722_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19454722_MHorler_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19454722_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19454722_MHorler_main.jpg",
  imageOne: "../images/work/Madi_Horler_19454722_1 - Madison Horler.jpg",
  imageTwo: "../images/work/Madi_Horler_19454722_2 - Madison Horler.jpg",
  imageThree: "../images/work/Madi_Horler_19454722_3 - Madison Horler.jpg",
  imageFour: "../images/work/Madi_Horler_19454722_4 - Madison Horler.jpg",
  imageFive: "../images/work/Madi_Horler_19454722_5 - Madison Horler.jpg",
  imageSix: "../images/work/Madi_Horler_19454722_6 - Madison Horler.jpg"
}, {
  studentNumber: "19606154",
  firstName: "Ghassani",
  lastName: "Ridarta",
  email: "gatsarina@gmail.com",
  major: "Graphic Design",
  bio: "I am a designer with a keen eye for detail that utilises strategic thinking to create meaningful design solutions.  I am motivated and passionate in everything I do, whether that's design, photography or shopping! ",
  tagLine: "Graphic designer. Photographer. Fashionista. ",
  portfolio: "https://ghassanir.myportfolio.com/",
  linkedin: "",
  instagram: "https://www.instagram.com/ghassaniridartadesign/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19606154_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19606154_GRidarta_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19606154_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19606154_GRidarta_main.jpg",
  imageOne: "../images/work/Ghassani_Ridarta_19606154_1 - Ghassani A Ridarta.jpg",
  imageTwo: "../images/work/Ghassani_Ridarta_19606154_2 - Ghassani A Ridarta.jpg",
  imageThree: "../images/work/Ghassani_Ridarta_19606154_3 - Ghassani A Ridarta.jpg",
  imageFour: "../images/work/Ghassani_Ridarta_19606154_4 - Ghassani A Ridarta.jpg",
  imageFive: "../images/work/Ghassani_Ridarta_19606154_5 - Ghassani A Ridarta.jpg",
  imageSix: ""
}, {
  studentNumber: "19490085",
  firstName: "Danielle",
  lastName: "Musarra",
  email: "danielle@qbit.com.au",
  major: "Graphic Design",
  bio: "Hi there, I’m Danielle! After 4 years of binge-watching Illustrator tutorials on YouTube, I’m officially graduating from my Degree in Graphic Design and Advertising! \n\nAll my life, art has been a huge passion of mine. Whether that be painting, ceramics, drawing, and now more than ever, design. I knew in my future I wanted to have a career where I could use my love for design to help others achieve their goals and support causes I care about, and now I’m finally able to do so.\n\nI’ve always believed in designing with purpose and with that, I want to build brands that will make an impact on people’s lives. I am a problem solver who always puts my absolute best into everything I do, and I strive to create a positive and happy environment everywhere I go.\n",
  tagLine: '"Whoever said orange is the new pink was seriously disturbed" - Elle Woods',
  portfolio: "onetouchstudio.com.au",
  linkedin: "https://www.linkedin.com/in/danielle-musarra-768380193",
  instagram: "https://www.instagram.com/onetouchstudio_/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19490085_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19490085_DMusarra_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19490085_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19490085_DMusarra_main.jpg",
  imageOne: "../images/work/Danielle_Musarra_19490085_1 - Danielle Musarra.jpg",
  imageTwo: "../images/work/Danielle_Musarra_19490085_2 - Danielle Musarra.jpg",
  imageThree: "../images/work/Danielle_Musarra_19490085_3 - Danielle Musarra.jpg",
  imageFour: "../images/work/Danielle_Musarra_19490085_4 - Danielle Musarra.jpg",
  imageFive: "../images/work/Danielle_Musarra_19490085_5 - Danielle Musarra.jpg",
  imageSix: "../images/work/Danielle_Musarra_19490085_6 - Danielle Musarra.jpg"
}, {
  studentNumber: "19963587",
  firstName: "Ella",
  lastName: "Matthews",
  email: "ellamatthews6@gmail.com",
  major: "Animation and Game Design",
  bio: "Taking a dive into a world unknown, I have found my love for everything 3D. I am a determined and passionate artist searching for a life in 3D creation. I continue to develop my skills every day, not only improve my abilities but also my knowledge in this field. I love trying new things and experimenting in new software’s. I enjoy everything in the 3D world from the sculpting to the post processing. I strive to make great work and have fun. In my spare time I dabble in some personal projects and try to protect furniture and unsuspecting cords from my rabbits’ teeth. ",
  tagLine: "Rendering my imagination",
  portfolio: "https://ellamatthews7.artstation.com/",
  linkedin: "www.linkedin.com/in/ella-matthews-922275181",
  instagram: "https://www.instagram.com/em_3design/",
  twitter: "",
  vimeo: "https://vimeo.com/user120779514",
  artStation: "https://www.artstation.com/ellamatthews7",
  behance: "https://www.behance.net/ellamatthews",
  dribbble: "https://dribbble.com/EllaMatt/about",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19963587_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19963587_EMatthews_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19963587_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19963587_EMatthews_main.jpg",
  imageOne: "../images/work/Ella_Matthews_19963587_1 - Ella Matthews.jpg",
  imageTwo: "../images/work/Ella_Matthews_19963587_2 - Ella Matthews.jpg",
  imageThree: "../images/work/Ella_Matthews_19963587_3 - Ella Matthews.jpg",
  imageFour: "../images/work/Ella_Matthews_19963587_4 - Ella Matthews.jpg",
  imageFive: "",
  imageSix: ""
}, {
  studentNumber: "19133225",
  firstName: "Alexandra (Ali)",
  lastName: "Marbeck",
  email: "19133225@student.curtin.edu.au",
  major: "Graphic Design",
  bio: "Hello! I'm Ali, an illustrator and graphic designer with a love for creating brands that connect and comfort. Constructing cohesive brands that they feel like their own little world is something I specialise in. I initially developed this skill set through my illustration work and have since prioritised incorporating this value into my graphic design projects. I believe that my background in these two complementary disciplines allows me to bring a unique approach to any brief.\n\nThe skills I've gained so far have allowed me to develop brands that create an emotional connection. These skills include; captivating character designs, immersive illustration styles and very strong colour theory. \n\nI have a real passion for creative endeavours that centre around mental health. My natural illustration style evokes a comforting source of escapism, tailor made for these types of projects. \n\nMy passion project at the moment has been illustrating and writing my own graphic novel, alongside creating new products for my small business - Ali Illustrations.\n",
  tagLine: "Your comfort characters.",
  portfolio: "https://www.aliillustrations.com/",
  linkedin: "",
  instagram: "https://www.instagram.com/ali.illustrations",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19133225_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19133225_AMarbeck_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19133225_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19133225_AMarbeck_main.jpg",
  imageOne: "../images/work/AlexandraMarbeck_19133225_1 - ali marbeck.jpg",
  imageTwo: "../images/work/AlexandraMarbeck_19133225_3 - ali marbeck.jpg",
  imageThree: "../images/work/AlexandraMarbeck_19133225_4 - ali marbeck.jpg",
  imageFour: "../images/work/AlexandraMarbeck_19133225_5 - ali marbeck.jpg",
  imageFive: "../images/work/AlexandraMarbeck_19133225_6 - ali marbeck.jpg",
  imageSix: "../images/work/Alexnadra_Marbeck_19133225_2 - ali marbeck.jpg"
}, {
  studentNumber: "19749402",
  firstName: "Gia",
  lastName: "Portelli",
  email: "gportelli12@gmail.com",
  major: "Graphic Design",
  bio: "To put this simply, I am a daydreamer - seeing things that aren't there. While my head is in the clouds, I aspire to be a brand builder, providing a specialised approach catering to the needs and interests of younger audiences. I wish to focus on sustainable practices during design production - a reduction of waste through the creation of timeless, functional and dynamic designs. It's time to make the world just a bit more whimsical through the enchanting nature of design.",
  tagLine: "Crafting something out of nothing.",
  portfolio: "https://www.instagram.com/incwhimsy/",
  linkedin: "",
  instagram: "https://www.instagram.com/incwhimsy/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19749402_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19749402_GPortelli_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19749402_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19749402_GPortelli_main.jpg",
  imageOne: "../images/work/Gia_Portelli_19749402_1 - Gia Portelli.jpg",
  imageTwo: "../images/work/Gia_Portelli_19749402_2 - Gia Portelli.jpg",
  imageThree: "../images/work/Gia_Portelli_19749402_3 - Gia Portelli.jpg",
  imageFour: "../images/work/Gia_Portelli_19749402_4 - Gia Portelli.jpg",
  imageFive: "../images/work/Gia_Portelli_19749402_5 - Gia Portelli.jpg",
  imageSix: "../images/work/Gia_Portelli_19749402_6 - Gia Portelli.jpg"
}, {
  studentNumber: "19451231",
  firstName: "Joaquin",
  lastName: "Atizado",
  email: "joaquininsonder@gmail.com",
  major: "Graphic Design",
  bio: "Meet Joaquin. \nA graphic designer.\nPronounced /hwɑːˈkiːn/. \nA first generation immigrant from the Philippines.\nHas travelled to numerous places around the world.\nFavourite place is New York City.\nLoves Taylor Swift.\n\nFrom these experiences, Joaquin's designs come from a place of culture, tradition and innovation. And's what's fascinating is that there's 7 billion people that are completely different from Joaquin's experience. Every design has a story and people are at the centre of it.",
  tagLine: "Each person has a story. Let's explore them together.",
  portfolio: "joaquininsonder.com",
  linkedin: "https://au.linkedin.com/in/joaquinatizado",
  instagram: "https://www.instagram.com/joaquininsonder/?hl=en",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "behance.net/joaquinatizado1",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19451231_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19451231_JAtizado_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19451231_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19451231_JAtizado_main.jpg",
  imageOne: "../images/work/Joaquin_Atizado_1451231_1 - Joaquin Atizado.jpeg",
  imageTwo: "../images/work/Joaquin_Atizado_1451231_2 - Joaquin Atizado.jpg",
  imageThree: "../images/work/Joaquin_Atizado_1451231_4 - Joaquin Atizado.jpg",
  imageFour: "../images/work/Joaquin_Atizado_1451231_5 - Joaquin Atizado.jpg",
  imageFive: "",
  imageSix: ""
}, {
  studentNumber: "18451382",
  firstName: "Cooper",
  lastName: "Geyer",
  email: "coopergeyerdesign@gmail.com",
  major: "Graphic Design",
  bio: "Like any good wine creative skills come with age, and for the last 3 years I have been stored in multiple barrels in a number of conditions. I specialise in advertising and branding design varieties, oftentimes blended together to ensure best results. Throughout my time at Curtin I have gained an overall understanding of who I am as a designer. My main creative strengths are: Strategy, Idea Generation, Lateral Thinking and Insights. I often deliver out-of-the-barrel approaches to the design problem, looking for a key point of difference. This largely stems from my curious nature, always wanting to find out the little details in large scope of topics, along with my experiences traveling and being exposed to different cultures.",
  tagLine: "Blender of branding and creative advertising.",
  portfolio: "https://coopergeyerdesign.com/",
  linkedin: "www.linkedin.com/in/cooper-geyer-1b4641159/",
  instagram: "www.instagram.com/coopergeyerdesign/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/coopergeyer",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/18451382_alt.jpg",
  avatarTwo: "./images/graduateAvatars/18451382_CGeyer_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/18451382_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/18451382_CGeyer_main.jpg",
  imageOne: "../images/work/Cooper_Geyer_18451382_1 - Cooper Geyer.png",
  imageTwo: "../images/work/Cooper_Geyer_18451382_2 - Cooper Geyer.png",
  imageThree: "../images/work/Cooper_Geyer_18451382_3 - Cooper Geyer.png",
  imageFour: "../images/work/Cooper_Geyer_18451382_4 - Cooper Geyer.png",
  imageFive: "../images/work/Cooper_Geyer_18451382_5 - Cooper Geyer.png",
  imageSix: "../images/work/Cooper_Geyer_18451382_6 - Cooper Geyer.png"
}, {
  studentNumber: "19691600",
  firstName: "Tey",
  lastName: "Quen Yi (Emily)",
  email: "teyquenyi@gmail.com",
  major: "Graphic Design",
  bio: "Hello! In a world that's constantly bustling, I help folks communicate something even more through the art of visual storytelling.",
  tagLine: "A Fusion of Storytelling, Community and Design.",
  portfolio: "thefolklorecreative.com",
  linkedin: "https://www.linkedin.com/in/emily-tey-989178b6/",
  instagram: "https://www.instagram.com/thefolklorecreative/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19691600_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19691600_Etey_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19691600_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19691600_Etey_main.jpg",
  imageOne: "../images/work/QuenYi_Tey_19691600_1 - Emily Tey.jpg",
  imageTwo: "../images/work/QuenYi_Tey_19691600_2 - Emily Tey.jpg",
  imageThree: "../images/work/QuenYi_Tey_19691600_3 - Emily Tey.jpg",
  imageFour: "../images/work/QuenYi_Tey_19691600_4 - Emily Tey.jpg",
  imageFive: "../images/work/QuenYi_Tey_19691600_5 - Emily Tey.jpg",
  imageSix: "../images/work/QuenYi_Tey_19691600_6 - Emily Tey.jpg"
}, {
  studentNumber: "19778697",
  firstName: "Imogen",
  lastName: "McCarthy",
  email: "hello@studioimi.com.au",
  major: "Graphic Design",
  bio: "Hey! I’m Imi. I develop bold, strategic brands for startups. I design through a human-centred approach, whilst capturing an untapped market. I'm a designer who solves problems and creates unique, lasting brands that make people happy. When I’m not designing you can find me sipping a cup of tea or drawing some smiley flowers.",
  tagLine: "Crafting thoughtful designs ",
  portfolio: "www.studioimi.com.au",
  linkedin: "",
  instagram: "https://www.instagram.com/studio__imi/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19778697_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19778697_IMaccarthy_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19778697_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19778697_IMaccarthy_main.jpg",
  imageOne: "../images/work/Imogen_McCarthy_19778697_1 - Imogen McCarthy.jpg",
  imageTwo: "../images/work/Imogen_McCarthy_19778697_2 - Imogen McCarthy.jpg",
  imageThree: "../images/work/Imogen_McCarthy_19778697_3 - Imogen McCarthy.jpg",
  imageFour: "../images/work/Imogen_McCarthy_19778697_4 - Imogen McCarthy.jpg",
  imageFive: "../images/work/Imogen_McCarthy_19778697_5 - Imogen McCarthy.jpg",
  imageSix: "../images/work/Imogen_McCarthy_19778697_6 - Imogen McCarthy.jpg"
}, {
  studentNumber: "19523266",
  firstName: "Emily",
  lastName: "Mee",
  email: "emilymee@pobox.com",
  major: "Digital Experience and Interaction Design",
  bio: "Hey! I'm Emily and I think design is deeply personal, powerful and political. The way we shape experiences impacts people in more ways than can be summarized by A/B testing or usage metrics. My main goal as a designer (and human) is to ask tricky questions: In what situations could this product cause harm? Is this experience equally accessible for everyone? How can we better protect users’ digital rights? I don’t know the answers, but I do know that it’s really important to consider the broader impacts of the technologies we design. When I’m not pixel-pushing in Figma, I write policy submissions, create informational primers, make vegan nacho dip, and watch sunsets.",
  tagLine: "Designer, burrito eater, surveillance capitalism cynic ",
  portfolio: "emilymee.com",
  linkedin: "https://www.linkedin.com/in/emily-mee-8549031b4/",
  instagram: "",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19523266_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19523266_EMee_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19523266_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19523266_EMee_main.jpg",
  imageOne: "../images/work/Emily_Mee_19523266_1 - Emily Mee.png",
  imageTwo: "../images/work/Emily_Mee_19523266_2 - Emily Mee.png",
  imageThree: "../images/work/Emily_Mee_19523266_3 - Emily Mee.png",
  imageFour: "",
  imageFive: "",
  imageSix: ""
}, {
  studentNumber: "19518259",
  firstName: "Emmi",
  lastName: "Rumsa",
  email: "emmi.rumsa@gmail.com",
  major: "Graphic Design",
  bio: "Hey there! My name is Emmi and I love all aspects of graphic design. My specific style is very feminine and I love to illustrate custom floral designs and type. ",
  tagLine: "Good design creates a lasting impression. ",
  portfolio: "https://emmigraphicdesign.myportfolio.com/",
  linkedin: "https://www.linkedin.com/in/emmigraphicdesign/",
  instagram: "https://www.instagram.com/emmigraphicdesign",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/emmirumsa",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19518259_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19518259_ERumsa_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19518259_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19518259_ERumsa_main.jpg",
  imageOne: "../images/work/Emmi_Rumsa_19518259_1  - Emmi Rumsa.jpg",
  imageTwo: "../images/work/Emmi_Rumsa_19518259_2 - Emmi Rumsa.jpg",
  imageThree: "../images/work/Emmi_Rumsa_19518259_3 - Emmi Rumsa.jpg",
  imageFour: "../images/work/Emmi_Rumsa_19518259_4 - Emmi Rumsa.jpg",
  imageFive: "../images/work/Emmi_Rumsa_19518259_5 - Emmi Rumsa.jpg",
  imageSix: "../images/work/Emmi_Rumsa_19518259_6 - Emmi Rumsa.jpg"
}, {
  studentNumber: "19490250",
  firstName: "Brandon",
  lastName: "Watson",
  email: "brandonwatson.g@gmail.com",
  major: "Digital Experience and Interaction Design",
  bio: "A capable web developer and illustrator, experienced in majority of the Adobe Creative Cloud applications as well as a number of front-end languages and libraries. I've completed an internship at BlueSky Digital Labs and am currently working by contract in front-end development. Personally I just really like nice visuals, I like things that are well balanced and cohesive, but also wacky and different, which is what I strive to create. \n",
  tagLine: "I know I'd hire me 💯",
  portfolio: "www.randogw.com",
  linkedin: "https://www.linkedin.com/in/brandon-watson-11416b21a/",
  instagram: "www.instagram.com/rando.gw",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19490250_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19490250_BWatson_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19490250_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19490250_BWatson_main.jpg",
  imageOne: "../images/work/Brandon_Watson_19490520_1 - Brandon Watson.jpg",
  imageTwo: "../images/work/Brandon_Watson_19490520_2 - Brandon Watson.jpg",
  imageThree: "../images/work/Brandon_Watson_19490520_3 - Brandon Watson.jpg",
  imageFour: "../images/work/Brandon_Watson_19490520_4 - Brandon Watson.jpg",
  imageFive: "",
  imageSix: ""
}, {
  studentNumber: "19349611",
  firstName: "Dimitri",
  lastName: "Koranis",
  email: "dimitri.koranis@hotmail.com",
  major: "Graphic Design",
  bio: "Identity, Packaging, Illustration.",
  tagLine: "Designing packaging for products I love ",
  portfolio: "https://instagram.com/dimitrikoranis.design",
  linkedin: "",
  instagram: "https://instagram.com/dimitrikoranis.design",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateBags/_DSC1293.jpg",
  avatarTwo: "./images/graduateBags/_DSC1294.jpg",
  avatarOneHQ: "./images/graduateBagsHQ/_DSC1293.jpg",
  avatarTwoHQ: "./images/graduateBagsHQ/_DSC1294.jpg",
  imageOne: "../images/work/dimitri_koranis_19349611_1 - Australia Post.jpg",
  imageTwo: "../images/work/dimitri_koranis_19349611_2 - Australia Post.jpg",
  imageThree: "../images/work/dimitri_koranis_19349611_3 - Australia Post.jpg",
  imageFour: "../images/work/dimitri_koranis_19349611_4 - Australia Post.jpg",
  imageFive: "../images/work/dimitri_koranis_19349611_5 - Australia Post.jpg",
  imageSix: "../images/work/dimitri_koranis_19349611_6 - Australia Post.jpg"
}, {
  studentNumber: "17978204",
  firstName: "Shi-ning",
  lastName: "Wang",
  email: "weiyuwuchang@gmail.com",
  major: "Digital Experience and Interaction Design",
  bio: "With a decent knowledge of working under pressure with people, I've developed the confidence and personality that can calm people down and never lose control. I have been exploring and developing skills for several roles: Website Developer, CRM Trainer & Tasks Designer, and Real Estate Photographer. Thanks to those experiences, I realize the most essential thing in collaboration is to maintain clear communication with others about the needs and expectations and close the loop. I'm passionate about full-stack development and always feel super excited when the new projects go up online.",
  tagLine: "Yes, Shi-ning, Two Words, Not Typo ;)",
  portfolio: "",
  linkedin: "",
  instagram: "",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/17978204_alt.jpg",
  avatarTwo: "./images/graduateAvatars/17978204_SWang_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/17978204_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/17978204_SWang_main.jpg",
  imageOne: "../images/work/Shining_Wang_17978204_1 - Shining Wang.jpg",
  imageTwo: "../images/work/Shining_Wang_17978204_2 - Shining Wang.jpg",
  imageThree: "",
  imageFour: "",
  imageFive: "",
  imageSix: ""
}, {
  studentNumber: "19162229",
  firstName: "Michael",
  lastName: "D'Costa",
  email: "uxbydcosta@gmail.com",
  major: "Digital Experience and Interaction Design",
  bio: "Hello, my name is Michael and I’m a User Interface & User Experience Designer. Studying design and collaborating with others has made me realise how powerful user interfaces and experiences are for everyone. However, I believe the greatest designers need to do more than just study. Therefore, I have pursued other interests to enhance my design perspective, including, running my own business and managing clients everyday, learning about disabilities and impairments. I have also had the opportunity to travel, experiencing different cultures and meeting new people. With this knowledge, I am able to offer my unique perspective and skills to others and help create a purposeful digital future.",
  tagLine: "Only a Sith deals in absolutes",
  portfolio: "www.uxbydcosta.com",
  linkedin: "linkedin.com/in/michael-dcosta",
  instagram: "instagram.com/uxbydcosta/",
  twitter: "twitter.com/uxbydcosta",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "dribbble.com/uxbydcosta",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19162229_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19162229_MCosta_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19162229_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19162229_MCosta_main.jpg",
  imageOne: "../images/work/Michael_D_Costa_19162229_1.jpg - Michael D_Costa.jpg",
  imageTwo: "../images/work/Michael_D_Costa_19162229_2.jpg - Michael D_Costa.jpg",
  imageThree: "../images/work/Michael_D_Costa_19162229_3.jpg - Michael D_Costa.jpg",
  imageFour: "../images/work/Michael_D_Costa_19162229_4.jpg - Michael D_Costa.jpg",
  imageFive: "../images/work/Michael_D_Costa_19162229_5 - Michael D_Costa.jpg",
  imageSix: "../images/work/Michael_D_Costa_19162229_6 - Michael D_Costa.jpg"
}, {
  studentNumber: "19132345",
  firstName: "Henry",
  lastName: "Malkovic",
  email: "henrymalkovicdesign@gmail.com",
  major: "Graphic Design",
  bio: "Copywriter and art director, but known to borrow other titles.",
  tagLine: "I come up with ideas and make them real, not always in that order.",
  portfolio: "https://www.instagram.com/henrymalkovic",
  linkedin: "https://www.linkedin.com/in/henry-malkovic-930a80205/",
  instagram: "https://www.instagram.com/henrymalkovic",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateBags/_DSC1305.jpg",
  avatarTwo: "./images/graduateBags/_DSC1306.jpg",
  avatarOneHQ: "./images/graduateBagsHQ/_DSC1305.jpg",
  avatarTwoHQ: "./images/graduateBagsHQ/_DSC1306.jpg",
  imageOne: "../images/work/Henry_Malkovic_19132345_ - Henry M.jpg",
  imageTwo: "../images/work/Henry_Malkovic_19132345_2 - Henry M.jpg",
  imageThree: "../images/work/Henry_Malkovic_19132345_3 - Henry M.jpg",
  imageFour: "../images/work/Henry_Malkovic_19132345_4 - Henry M.jpg",
  imageFive: "../images/work/Henry_Malkovic_19132345_5 - Henry M.jpg",
  imageSix: "../images/work/Henry_Malkovic_19132345_6 - Henry M.jpg"
}, {
  studentNumber: "19754202",
  firstName: "Zac",
  lastName: "Lo",
  email: "Zac.clo@outlook.com",
  major: "Graphic Design",
  bio: "Hey! I'm a creative who specialises in Graphic Design and Brand Strategy. This means I love empowering new and existing brands to help create or improve their brand strategy and visual identity. I'm passionate about design that is functional, engaging and suitable for its original purpose. (I'm also a huge sneaker enthusiast and pasta lover). I strive to bring excellence and a tenacious work ethic to everything I work on, bringing my unique perspective and learning everyone else's. I love collaborating alongside people and building a healthy and mutually benefiting relationship that extends far beyond a simple contract or transactional connection. I strongly believe that with any project, genuine empathy is the key to understanding problems, audiences and solutions. Above all I am passionate about what I do because I know it has the opportunity to help grow and mature people's dreams into realities, and as an avid dreamer myself, it's a joy to help bring them to life.",
  tagLine: "Graphic Designer & Brand Strategist who loves people and sneakers.",
  portfolio: "https://www.instagram.com/houseof.lostudio/",
  linkedin: "https://www.linkedin.com/in/zac-lo-87041720a/",
  instagram: "https://www.instagram.com/houseof.lostudio/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19754202_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19754202_ZLo_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19754202_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19754202_ZLo_main.jpg",
  imageOne: "../images/work/Zac_Lo_19754202_1 - Zac Lo.jpg",
  imageTwo: "../images/work/Zac_Lo_19754202_2 - Zac Lo.jpg",
  imageThree: "../images/work/Zac_Lo_19754202_3 - Zac Lo.jpg",
  imageFour: "../images/work/Zac_Lo_19754202_4 - Zac Lo.jpg",
  imageFive: "../images/work/Zac_Lo_19754202_5 - Zac Lo.png",
  imageSix: "../images/work/Zac_Lo_19754202_6 - Zac Lo.png"
}, {
  studentNumber: "19460062",
  firstName: "Charlotte",
  lastName: "Arena",
  email: "astridarcana@gmail.com",
  major: "Graphic Design",
  bio: "Hi there! My name is Charlotte Arena (but in a creative setting I go by Astrid), and I am a concept artist and illustrator from Perth, Australia who specialises in character design! Many of the characters I design range from modern-day humans, to adventure-seeking creatures from high fantasy worlds. Outside of artistic endeavours, I love to play video games, play D&D, watch anime and drink a wide variety of teas!",
  tagLine: "Creating worlds, destroying others.",
  portfolio: "https://astridarcana.wixsite.com/astridarcana",
  linkedin: "",
  instagram: "https://www.instagram.com/astridarcana/",
  twitter: "https://twitter.com/AstridArcana",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19460062_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19460062_CArena_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19460062_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19460062_CArena_main.jpg",
  imageOne: "../images/work/riley - Lotte Arena.png",
  imageTwo: "",
  imageThree: "",
  imageFour: "",
  imageFive: "",
  imageSix: ""
}, {
  studentNumber: "19471666",
  firstName: "Jet",
  lastName: "Trijo",
  email: "jet.trijo@hotmail.com",
  major: "Animation and Game Design",
  bio: "“Hi! My name is Jet. J-E-T. Like the jet-plane in the sky but without the plane.”  I consider myself a generalist. I am willing to investigate, learn and dive into the various areas and fields. I have a keen interest in 3D Modelling, Texturing and Animation. Creating worlds within a 3D space is quite amazing.  Creating VFX excites me, especially 3D that you can find within animation or games. It's amazing creating particles that grow, flow and dissipate magically.  I also dive into UI/UX. A great user interface can really make or break a product and paying attention to the user’s experience is at the heart of all things design.  Although, my main passion is Game Development. I love making a player feel a sense of awe, fun or excitement.  Overall, working for an Animation or Game studio would be a dream for me.  When I work on projects, I also tend to keep a positive, pleasant but still practical attitude and I believe in a good, pleasant team-working environment to be crucial to success.  In my spare time, you can catch me try-harding to reach Rank 1 in a MOBA, shooters, fighting games, or going out to the city with friends and family for lunch or dinner.  See you around! ",
  tagLine: "I enjoy creating fake worlds which exist within your screen that make you feel something. ",
  portfolio: "https://www.artstation.com/jet_trijo",
  linkedin: "https://www.linkedin.com/in/jet-t/",
  instagram: "https://www.instagram.com/jet.trijo.work/",
  twitter: "https://twitter.com/JetTrijo",
  vimeo: "",
  artStation: "https://www.artstation.com/jet_trijo",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19471666_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19471666_JTrijo.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19471666_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19471666_JTrijo.jpg",
  imageOne: "../images/work/Jet_Trijo_19471666_1 - Jet.jpg",
  imageTwo: "../images/work/Jet_Trijo_19471666_2 - Jet.jpg",
  imageThree: "../images/work/Jet_Trijo_19471666_3 - Jet.jpg",
  imageFour: "../images/work/Jet_Trijo_19471666_4 - Jet.jpg",
  imageFive: "../images/work/Jet_Trijo_19471666_5 - Jet.jpg",
  imageSix: "../images/work/Jet_Trijo_19471666_6 - Jet.jpg"
}, {
  studentNumber: "19483580",
  firstName: "Kasey",
  lastName: "Marks",
  email: "kasey.marks@student.curtin.edu.au",
  major: "Graphic Design",
  bio: "I am an illustrator and designer who loves to create enjoyable, meaningful projects. My goal is to help people’s ideas come to life, through both my design and illustration skills, to create exciting stories and brands that people can feel seen in. I'm extremely passionate about collaborating with other like-minded creatives to produce and share colourful stories, and adventuring into lively and exciting projects.",
  tagLine: "Illustrator, designer, chicken parent",
  portfolio: "https://www.kaseymarks.co/",
  linkedin: "",
  instagram: "https://www.instagram.com/kaseymarksillu/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateAvatars/19483580_alt.jpg",
  avatarTwo: "./images/graduateAvatars/19483580_KMarks_main.jpg",
  avatarOneHQ: "./images/graduateAvatarsHQ/19483580_alt.jpg",
  avatarTwoHQ: "./images/graduateAvatarsHQ/19483580_KMarks_main.jpg",
  imageOne: "../images/work/Kasey_Marks_19483580_1 - Kasey Marks.jpg",
  imageTwo: "../images/work/Kasey_Marks_19483580_2 - Kasey Marks.jpg",
  imageThree: "../images/work/Kasey_Marks_19483580_3 - Kasey Marks.jpg",
  imageFour: "../images/work/Kasey_Marks_19483580_4 - Kasey Marks.jpg",
  imageFive: "../images/work/Kasey_Marks_19483580_5 - Kasey Marks.jpg",
  imageSix: "../images/work/Kasey_Marks_19483580_6 - Kasey Marks.jpg"
}, {
  studentNumber: "19490292",
  firstName: "Emily",
  lastName: "Lowry",
  email: "em.lowry@icloud.com",
  major: "Graphic Design",
  bio: "My name is Emily Lowry I am a Graphics Student who dabbles in Film Design. I am a very passionate designer and love to create: the props, the makeup, the costumes, the set, the atmosphere. My goal is to bring imagination to life, through design and to be able to visualise and create any task given to me. I am a self taught buddying SFX makeup artist, with the passion to make things gruesome. For me design is the art behind film, and I have fallen in love with the process. Graphics provides me the talent and skill to create some amazing things both online and on camera. Its unconventional but I love it. ",
  tagLine: "Connecting Film & Graphics though Design",
  portfolio: "https://emilylowrypd.wixsite.com/productiondesign",
  linkedin: "https://www.linkedin.com/in/emily-lowry-305863193 HpQQ6d0WhA",
  instagram: "https://www.instagram.com/xem_lowryx",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateBags/_DSC1450.jpg",
  avatarTwo: "./images/graduateBags/_DSC1453.jpg",
  avatarOneHQ: "./images/graduateBagsHQ/_DSC1450.jpg",
  avatarTwoHQ: "./images/graduateBagsHQ/_DSC1453.jpg",
  imageOne: "../images/work/Emily_Lowry_19490292_1 - Em Lowry.jpg",
  imageTwo: "../images/work/Emily_Lowry_19490292_2 - Em Lowry.png",
  imageThree: "../images/work/Emily_Lowry_19490292_3 - Em Lowry.png",
  imageFour: "../images/work/Emily_Lowry_19490292_4 - Em Lowry.png",
  imageFive: "../images/work/Emily_Lowry_19490292_5 - Em Lowry.png",
  imageSix: "../images/work/Emily_Lowry_19490292_6 - Em Lowry.png"
}, {
  studentNumber: "19502317",
  firstName: "Lucas",
  lastName: "Vieira",
  email: "l_vieira1998@hotmail.com",
  major: "Digital Experience and Interaction Design",
  bio: "I am a Designer and Web Developer from Perth, Western Australia. I started my university career doing primarily Graphic Design, but it wasn't until my later units where I discovered a passion for Web Development - particuarly Front-end, where I developed a focus on clean, user centric design and interaction using tools such as Greensock, SASS and JavaScript. My Graphics work is heavily inspired by the arts, music and history, and backed up by years of experience in the printing industry which gives me the knowledge and confidence to create beautiful print designs.",
  tagLine: "Designer and Web Developer",
  portfolio: "lucasvieira.io",
  linkedin: "https://www.linkedin.com/in/lucas-vieira-2aa934218/",
  instagram: "https://www.instagram.com/carrougess/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/lucasavieira",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "./images/graduateBags/_DSC1450.jpg",
  avatarTwo: "./images/graduateBags/_DSC1453.jpg",
  avatarOneHQ: "./images/graduateBagsHQ/_DSC1450.jpg",
  avatarTwoHQ: "./images/graduateBagsHQ/_DSC1453.jpg",
  imageOne: "../images/work/vieira_lucas_19502317_1 - Scott Wicks.jpg",
  imageTwo: "../images/work/vieira_lucas_19502317_2 - Scott Wicks.jpg",
  imageThree: "../images/work/vieira_lucas_19502317_3 - Scott Wicks.jpg",
  imageFour: "../images/work/vieira_lucas_19502317_4 - Scott Wicks.jpg",
  imageFive: "../images/work/vieira_lucas_19502317_5 - Scott Wicks.jpg",
  imageSix: "../images/work/vieira_lucas_19502317_6 - Scott Wicks.jpg"
}, {
  studentNumber: "19517094",
  firstName: "Aisha",
  lastName: "Berecz",
  email: "aderrick1110@gmail.com",
  major: "Graphic Design",
  bio: "My name is Aisha, and I'm a brand strategist, graphic designer and Advertising graduate based in Perth, WA, specialising in executing conceptual, human-centred designs. For me, being a creative means going beyond initial problem solving, creating holistic solutions.",
  tagLine: "Brand Strategist and Creative Advertiser",
  portfolio: "aisharaindesign.com",
  linkedin: "",
  instagram: "https://www.instagram.com/aisharaindesign/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/aisharain",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "",
  avatarTwo: "",
  avatarOneHQ: "",
  avatarTwoHQ: "",
  imageOne: "../images/work/",
  imageTwo: "../images/work/",
  imageThree: "../images/work/",
  imageFour: "../images/work/",
  imageFive: "../images/work/",
  imageSix: "../images/work/"
}, {
  studentNumber: "19390758",
  firstName: "Annabelle",
  lastName: "Jenkins",
  email: "19390758@student.curtin.edu.au",
  major: "Graphic Design",
  bio: "Annie Jenkins is a freelance graphic designer who enjoys engaging in creative practices both on and off the screen. When she isn't designing, Annie loves upcycling clothing, screen printing, film photography, bush walking, and creating mosaics.",
  tagLine: "Graphic Design, Photography, Styling",
  portfolio: "slowdancestudio.com",
  linkedin: "",
  instagram: "https://www.instagram.com/slowdancestudio/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "",
  avatarTwo: "",
  avatarOneHQ: "",
  avatarTwoHQ: "",
  imageOne: "../images/work/",
  imageTwo: "../images/work/",
  imageThree: "../images/work/",
  imageFour: "../images/work/",
  imageFive: "../images/work/",
  imageSix: "../images/work/"
}, {
  studentNumber: "19780537",
  firstName: "Caitlyn",
  lastName: "Johnson",
  email: "johno.caitlyn@gmail.com",
  major: "Digital Experience and Interaction Design",
  bio: "Hi, I’m Caitlyn a digital designer with a passion for UX/UI design and just enough graphic design thrown in for good measure. I am a bit wacky a bit odd and a lot of fun - so most of my designs are too. I am a problem solver font hoarder and colour lover with a keen eye for detail and I will always rise to a challenge.\n\nI believe my lifes calling has always been to solve problems and help people, and what better way to do that then through deisgn. I believe the best designs are made when you listen to and understand the user and their probelm so all my work has a big focues on user centric design.",
  tagLine: "Day Dreamer, Star Watcher, Dinosaur Lover",
  portfolio: "https://dath-designs.netlify.app/",
  linkedin: "https://www.linkedin.com/in/caitlyn-johnson-24270b219/",
  instagram: "https://www.instagram.com/dath_designs/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "",
  avatarTwo: "",
  avatarOneHQ: "",
  avatarTwoHQ: "",
  imageOne: "../images/work/",
  imageTwo: "../images/work/",
  imageThree: "../images/work/",
  imageFour: "../images/work/",
  imageFive: "../images/work/",
  imageSix: "../images/work/"
}, {
  studentNumber: "18523692",
  firstName: "Kirren",
  lastName: "Jones",
  email: "hello@kirren.com.au",
  major: "Graphic Design",
  bio: "I am an advertising creative, recently having completed my degree in Creative Advertising and Graphic Design with Curtin University. Prior to Curtin I completed a Diploma AND Advanced Diploma in Graphic Design.\n\nIllustration has always been a huge part of my life, and as a result, plays a dominant role in my design process and how I like to create. I enjoy the challenge that comes with cracking open a new brief and putting pen to paper. I’m easily inspired, and find excitement in exploring every possible solution, which is why I specialise in storyboarding.\n\nI look forward to finding my way in Perth’s advertising scene, eager to learn more from the incredible talent our industry has to offer.",
  tagLine: "Be what you set out to be",
  portfolio: "kirren.com.au",
  linkedin: "https://www.linkedin.com/in/kirren-jones-512896199",
  instagram: "https://www.instagram.com/nerrik/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "",
  avatarTwo: "",
  avatarOneHQ: "",
  avatarTwoHQ: "",
  imageOne: "../images/work/",
  imageTwo: "../images/work/",
  imageThree: "../images/work/",
  imageFour: "../images/work/",
  imageFive: "../images/work/",
  imageSix: "../images/work/"
}, {
  studentNumber: "19453790",
  firstName: "Leander",
  lastName: "D'Cruz",
  email: "leanderjdcruz@gmail.com",
  major: "Graphic Design",
  bio: "I'm a graphic designer and illustrator based in Perth, Western Australia. I'm great at visualising and coming up with unique solutions to design problems. My strong communication skills allow me to work well in a team and explain design decisions to those who aren't as familiar with the conventions of graphic design. A lot of my work is heavily influenced by comic books, particularly Silver Age comics. I aim to create a sense of nostalgia with my work as I believe that it is a great way to establish a connection with the audience. I also am a big believer in adaptability and am able to illustrate in a variety of different styles to find the most appropriate one for the job.",
  tagLine: "“If you think a man draws the type of hands you want to draw. Steal them, take those hands” - Jack Kirby",
  portfolio: "https://leanderjdcruz.myportfolio.com/contact",
  linkedin: "https://www.linkedin.com/in/leander-d-cruz-9a0b51180/",
  instagram: "https://www.instagram.com/leanderdcruzdesigns/",
  twitter: "https://twitter.com/LeanderDCruz1",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/leanderdcruz1/projects",
  dribbble: "",
  github: "",
  shirt: "",
  avatarOne: "",
  avatarTwo: "",
  avatarOneHQ: "",
  avatarTwoHQ: "",
  imageOne: "../images/work/",
  imageTwo: "../images/work/",
  imageThree: "../images/work/",
  imageFour: "../images/work/",
  imageFive: "../images/work/",
  imageSix: "../images/work/"
}, {
  studentNumber: "18365331",
  firstName: "Louis",
  lastName: "Klause",
  email: "louis.klause@gmail.com",
  major: "Digital Experience and Interaction Design",
  bio: "Hi, my name's Louis 👋\n\nRecent graduate of User Experience and Interaction Design at Curtin University, Perth.\n\nI approach life and design with a double-diamond methodology, and if that doesn't work I'll usually resort to flexbox.\n\nThe images here and on my portfolio are just a sample of some of my projects undertaken at University and during my time as an intern at Humaan.\n\nWhen I'm not designing or coding, I'm illutrating, listening to Mac Miller, and wondering how they originally thought it would be a good idea to name the like button the 'awesome button'..",
  tagLine: "More steam than a locomotive scroll",
  portfolio: "louisklause.design",
  linkedin: "https://www.linkedin.com/in/louis-klause-09230180/",
  instagram: "https://www.instagram.com/louisklause.design/",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "",
  dribbble: "",
  github: "https://github.com/LouchaG9",
  shirt: "",
  avatarOne: "",
  avatarTwo: "",
  avatarOneHQ: "",
  avatarTwoHQ: "",
  imageOne: "../images/work/",
  imageTwo: "../images/work/",
  imageThree: "../images/work/",
  imageFour: "../images/work/",
  imageFive: "../images/work/",
  imageSix: "../images/work/"
}, {
  studentNumber: "19690717",
  firstName: "Rebekah",
  lastName: "van Zalm",
  email: "rebekahdigital@gmail.com",
  major: "Digital Experience and Interaction Design",
  bio: "Hello! I’m Rebekah, a UI / UX designer and frontend developer who loves bringing interfaces to life with code. My design approach is creative and empathetic, with an aim to create aesthetically-pleasing and intuitive applications— nothing compares to the feeling of solving a design problem! Outside of design, my hobbies include horse riding, photography, reading and tea-drinking. You might also find me daydreaming about the life I would have if I worked for Apple…",
  tagLine: 'var Rebekah = "Amazing Developer and UI / UX Designer"',
  portfolio: "https://www.rebekahdigital.com/",
  linkedin: "https://www.linkedin.com/in/rebekah-van-zalm-445b45197/",
  instagram: "https://instagram.com/rebekah_digital",
  twitter: "",
  vimeo: "",
  artStation: "",
  behance: "https://www.behance.net/rebekahvanzalm2",
  dribbble: "https://dribbble.com/rebekahdigital",
  github: "",
  shirt: "",
  avatarOne: "",
  avatarTwo: "",
  avatarOneHQ: "",
  avatarTwoHQ: "",
  imageOne: "../images/work/",
  imageTwo: "../images/work/",
  imageThree: "../images/work/",
  imageFour: "../images/work/",
  imageFive: "../images/work/",
  imageSix: "../images/work/"
}];
exports.Graduates = Graduates;
},{}],"Utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gsap = _interopRequireDefault(require("gsap"));

var _graduateData = require("./../static/data/graduateData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Utils {
  isMobile() {
    let viewportWidth = window.innerWidth;

    if (viewportWidth <= 768) {
      return true;
    } else {
      return false;
    }
  }

  shuffle(array) {
    let currentIndex = array.length,
        randomIndex; // While there remain elements to shuffle...

    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--; // And swap it with the current element.

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  pageIntroAnim() {
    const pageContent = document.querySelector(".page-content");
    if (!pageContent) return;

    _gsap.default.fromTo(pageContent, {
      opacity: 0,
      y: -12
    }, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 0.3
    });
  }

}

var _default = new Utils();

exports.default = _default;
},{"gsap":"../node_modules/gsap/index.js","./../static/data/graduateData":"../static/data/graduateData.js"}],"views/pages/home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./../../App"));

var _litHtml = require("lit-html");

var _Router = require("./../../Router");

var _Utils = _interopRequireDefault(require("./../../Utils"));

var _gsap = _interopRequireDefault(require("gsap"));

var _graduateData = require("./../../../static/data/graduateData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <va-app-header title=\"Home\"></va-app-header>\n\n      <div class=\"page-content\" id=\"pageContent\">\n        <section class=\"banner\">\n          <div class=\"left\">\n            <h2 class=\"subheading\">\n              Welcome to the DeStore 2021 Curtin Design Graduate Showcase\n            </h2>\n            <button\n              class=\"shop-graduates-btn\"\n              @click=\"", "\"\n            >\n              Shop all graduates\n            </button>\n          </div>\n          <div class=\"right\"></div>\n        </section>\n\n        <section class=\"majors\">\n          <div class=\"major-columns\">\n            <div\n              class=\"animation-column\"\n              @click=\"", "\"\n            >\n              <img\n                src=\"./images/AGD-Basket.svg\"\n                alt=\"animation basket\"\n                class=\"major-svg agd-svg\"\n              />\n              <div class=\"sign-item\">\n                <h3>Animation</h3>\n              </div>\n              <div class=\"sign-item\">\n                <h3>Game Design</h3>\n              </div>\n              <div class=\"sign-item\">\n                <h3>Fruit</h3>\n              </div>\n              <div class=\"sign-item\">\n                <h3>Vegetables</h3>\n              </div>\n            </div>\n\n            <div class=\"digex-column\" @click=\"", "\">\n              <img\n                src=\"./images/DD-Clip.svg\"\n                alt=\"Digital bread clip\"\n                class=\"major-svg dd-svg\"\n              />\n              <!-- https://drive.google.com/file/d/1IsaWr0JahaPZcVp5KBb7hjr1n7UpTelJ/view?usp=sharing -->\n              <div class=\"sign-item\">\n                <h3>Digital Design</h3>\n              </div>\n              <div class=\"sign-item\">\n                <h3>Baked Goods</h3>\n              </div>\n              <div class=\"sign-item\">\n                <h3>Fresh Bread</h3>\n              </div>\n              <div class=\"sign-item\">\n                <h3>Wraps</h3>\n              </div>\n            </div>\n\n            <div\n              class=\"graphic-column\"\n              @click=\"", "\"\n            >\n              <img\n                src=\"./images/GD-Tag.svg\"\n                alt=\"graphic design tag\"\n                class=\"major-svg gd-dvg\"\n              />\n              <div class=\"sign-item\">\n                <h3>Graphic Design</h3>\n              </div>\n              <div class=\"sign-item\">\n                <h3>Cold Meats</h3>\n              </div>\n              <div class=\"sign-item\">\n                <h3>Cheese</h3>\n              </div>\n              <div class=\"sign-item\">\n                <h3>Olives</h3>\n              </div>\n            </div>\n          </div>\n        </section>\n\n        <section class=\"about-us\">\n          <div class=\"left\">\n            <img\n              src=\"https://drive.google.com/uc?export=view&id=1JxGAVQPoi8QiT08CvTJ3HCLaUbvSQoiu\"\n              alt=\"Destore Logo\"\n              class=\"logo-img\"\n            />\n          </div>\n          <div class=\"right\">\n            <h2>What are we?</h2>\n            <p>\n              On the other hand, we denounce with righteous indignation and\n              dislike men who are so beguiled and demoralized by the charms of\n              pleasure of the moment, so blinded by desire, that they cannot\n              foresee the pain and trouble that are bound to ensue;<br /><br />and\n              equal blame belongs to those who fail in their duty through\n              weakness of will, which is the same as saying through shrinking\n              from toil and pain. These cases are perfectly simple and easy to\n              distinguish. In a free hour, when our power of choice is\n              untrammelled and when nothing prevents our being able to do what\n              we like best\n            </p>\n            <button class=\"learn\" @click=\"", "\">\n              Learn about us\n            </button>\n          </div>\n        </section>\n\n        <section class=\"reviews\">\n          <div class=\"left\">\n            <h2 class=\"subheading\">What are people saying?</h2>\n          </div>\n\n          <div class=\"right\">\n            <div class=\"quote-one\">\n              <h3 class=\"tutor\">Joel Louie</h3>\n              <h4>Digital Design Major Coordinator</h4>\n              <p>\n                \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed\n                elementum maximus sem non venenatis. In erat turpis, suscipit\n                non libero sed, fermentum interdum nunc. Duis sagittis neque sit\n                amet.\"\n              </p>\n            </div>\n            <div class=\"quote-two\">\n              <h3 class=\"tutor\">Lee Ingram</h3>\n              <h4>Graphic Design Major Coordinator</h4>\n              <p>\n                \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed\n                elementum maximus sem non venenatis. In erat turpis, suscipit\n                non libero sed, fermentum interdum nunc. Duis sagittis neque sit\n                amet.\"\n              </p>\n            </div>\n            <div class=\"quote-three\">\n              <h3 class=\"tutor\">Jonathon Pillai</h3>\n              <h4>Animation & Game Design Major Coordinator</h4>\n              <p>\n                \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed\n                elementum maximus sem non venenatis. In erat turpis, suscipit\n                non libero sed, fermentum interdum nunc. Duis sagittis neque sit\n                amet.\"\n              </p>\n            </div>\n          </div>\n        </section>\n      </div>\n\n      <footer>\n        <div class=\"footer-content\">\n          <div class=\"destore-col\">\n            <h3>DeStore</h3>\n            <p>\n              Monday - Closed <br />\n              Tuesday \u2013 Saturday: 7:00 am \u2013 3:00 pm <br />\n              Sunday: 9:00 am \u2013 2:00 pm<br />\n              Kent St, Bentley, 6102, Western Australia<br /><br />\n              @destore\n            </p>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-animation-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Animation</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Game Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fruit</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Vegetables</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-digex-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Digital Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Baked Goods</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fresh Bread</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Wraps</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-graphic-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Graphic Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cold Meats</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cheese</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Olives</h3>\n              </div>\n            </div>\n          </div>\n        </div>\n      </footer>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Graduates.map((graduate) => {
//   console.log(graduate.firstName);
// });
class HomeView {
  init() {
    console.log("HomeView.init");
    document.title = "Home";
    this.render();
    this.pageIntroAnim2();
  }

  pageIntroAnim2() {
    _gsap.default.from(".subheading", {
      x: -1000,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1
    });

    _gsap.default.from(".animation-column", {
      y: -600,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 3
    }, "-=1");

    _gsap.default.from(".digex-column", {
      y: -400,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 3
    });

    _gsap.default.from(".graphic-column", {
      y: -300,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 3
    }, "-=1");
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/about"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new HomeView();

exports.default = _default;
},{"./../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","./../../Router":"Router.js","./../../Utils":"Utils.js","gsap":"../node_modules/gsap/index.js","./../../../static/data/graduateData":"../static/data/graduateData.js"}],"views/pages/404.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./../../App"));

var _litHtml = require("lit-html");

var _Router = require("./../../Router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["    \n      <div class=\"calign\">\n        <h1>Opps!</h1>\n        <p>Sorry, we couldn't find that.</p>\n        <button\n          class=\"return-home-btn\"\n          @click=\"", "\"\n        >HOME\n        </button>\n      </div>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

class FourOFourView {
  init() {
    console.log('FourOFourView.init');
    document.title = '404 File not found';
    this.render();
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), () => (0, _Router.gotoRoute)("/"));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new FourOFourView();

exports.default = _default;
},{"./../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","./../../Router":"Router.js"}],"views/pages/about.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("../../App"));

var _litHtml = require("lit-html");

var _Router = require("../../Router");

var _Utils = _interopRequireDefault(require("../../Utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <va-app-header title=\"About page\"></va-app-header>\n      <div class=\"page-content\">\n        <section class=\"about-banner\">\n        \n          <div class=\"about-landing\">\n            <h1>About Us</h1>\n            <p>\n            Welcome to the DeStore 2021 Curtin Design Graduate Showcase! \n            We have prepared a scrumptious selection of tasty design treats to \n            tantalise your taste buds. This year's Curtin Design grads from Animation & \n            Game Design, Digital Experience & Interaction Design and Graphic Design \n            have served up a refined assortment of design products that feature a diversity \n            of modalities, aesthetics and conceptual/technical approaches.<br/><br/>\n            \n            Are you hankering for a treat that's full-fat and bursting with flavour, \n            or do you want something nutritious yet tasty? Do you have specific preferences \n            or intolerances? Need a custom short-order? Don't worry, our team have got you covered.<br/><br/>\n\n            Our artisan graduates put loving care and attention into every single design that they craft, \n            tailoring them to your unique tastes and requirements. So go on, try a sample by \n            checking out the quality portfolio work showcased by our grads. Freshness guaranteed!\n            </p>\n          </div>\n\n          <img src=\"https://drive.google.com/uc?export=view&id=1JxGAVQPoi8QiT08CvTJ3HCLaUbvSQoiu\" class=\"about-img\" />\n        </section>\n\n        <div class=\"values-logo\">\n          <div class=\"about-logo\"></div>\n          <h1>Our Values</h1>\n        </div>\n\n        <div class=\"values\">\n          <div class=\"value-1\">\n            <h4>Inclusivity</h4>\n            <p>\n              Providing equal access and opportunities to all members\n              of the Grad Show, creating a safe space for people to contribute.\n            </p>\n          </div>\n          <div class=\"value-2\">\n            <h4>Innovation</h4>\n            <p>\n              Always producing and designing new ideas, \n              creating advances in innovation and efficiency to\n              be the best that we can be.\n            </p>\n          </div>\n          <div class=\"value-3\">\n            <h4>Creativity</h4>\n            <p>\n             The ability to experiment, to value and learn from mistakes,\n              and build on the experience. \n            </p>\n          </div>\n          <div class=\"value-4\">\n            <h4>Diversity</h4>\n            <p>\n              Recognising and respecting people of all ethnicity, gender,\n              age, race, religion and sexual orientation - and \n              valuing their differences.\n            </p>\n          </div>\n        </div>\n\n        <div class=\"credit-logo\">\n          <div class=\"credits-logo\"></div>\n          <h1>Credits</h1>\n        </div>\n\n        <section class=\"block-100 credit-fill\">\n          <div class=\"credit-block\" id=\"tres\">\n            <h3>Treasury</h3>\n            <ul>\n              <li>Ella Edwards</li>\n              <li>Lachlan Robertson</li>\n            </ul>\n          </div>\n\n          <div class=\"credit-block\">\n            <h3>Testing & Quality Team</h3>\n            <ul>\n              <li>Nina Dakin</li>\n              <li>Daffa Rizkiadi</li>\n              <li>Julian Osborn</li>\n              <li>Lucas Vieira</li>\n              <li>Shi Ning Wang</li>\n              <li>Alexandra McGee</li>\n              <li>Sylvia Chen</li>\n              <li>Eden Leicester</li>\n              <li>Michelle Thomas</li>\n              <li>Lachlan Robertson</li>\n              <li>Jekko Cabral</li>\n              <li>Sophie Till</li>\n            </ul>\n          </div>\n\n          <div class=\"credit-block\">\n            <h3>Animation & Video Production Team</h3>\n            <ul>\n              <li>Sylvia Chen</li>\n              <li>Michelle Thomas</li>\n              <li>Sophie Till</li>\n              <li>Dana Knowles</li>\n              <li>Eden Leicester</li>\n              <li>Alex Bertilone</li>\n              <li>Nina Dakin</li>\n              <li>Ella Matthews</li>\n              <li>Joshua Michell</li>\n              <li>Daffa Rizkiadi</li>\n              <li>Lachlan Robertson</li>\n              <li>Jekko Cabral</li>\n              <li>Yaeram Kim</li>\n            </ul>\n          </div>\n\n          <div class=\"credit-block\">\n            <h3>Photography Team</h3>\n            <ul>\n              <li>Ruitan Huang</li>\n              <li>Dee</li>\n              <li>Jet</li>\n              <li>Rebekah</li>\n              <li>Caitlyn</li>\n              <li>Josh</li>\n              <li>Brandon</li>\n              <li>Rhys</li>\n              <li>Jake</li>\n            </ul>\n          </div>\n          \n          <div class=\"credit-block\">\n            <h3>Website Programmers</h3>\n            <ul>\n              <li>Emily Lowry</li>\n              <li>Joaquin Atizado</li>\n              <li>Michael D'Costa</li>\n              <li>Julian Osborn</li>\n              <li>Shi Ning Wang</li>\n              <li>Ruitan Huang</li>\n              <li>Tian Hock Yan</li>\n              <li>Lucas Vieira</li>\n              <li>Brandon Watson</li>\n              <li>Jet Trijo</li>\n            </ul>\n          </div>\n\n          <div class=\"credit-block\">\n            <h3>Communications & Logistics Team</h3>\n            <ul>\n              <li>Joshua Michell</li>\n              <li>Dana Knowles</li>\n              <li>Tian Hock Yan</li>\n              <li>Michael D'Costa</li>\n              <li>Ella Edwards</li>\n              <li>Ruitan Huang</li>\n              <li>Jet Trijo</li>\n              <li>Yaeram Kim</li>\n              <li>Emily Harding</li>\n              <li>Joaquin Atizado</li>\n            </ul>\n          </div>\n          <div class=\"credit-block\">\n            <h3>UI / UX Designers</h3>\n            <ul>\n              <li>Rebekah Van Zalm</li>\n              <li>Ruitan Huang</li>\n              <li>Tian Hock Yan</li>\n              <li>Michael D'Costa</li>\n            </ul>\n          </div>\n          <div class=\"credit-block\">\n            <h3>Social Media</h3>\n            <ul>\n              <li>Name LastName</li>\n              <li>Name LastName</li>\n              <li>Name LastName</li>\n            </ul>\n          </div>\n        </section>\n      </div>\n    \n      \n      <footer>\n        <div class=\"footer-content\">\n          <div class=\"destore-col\">\n            <h3>DeStore</h3>\n            <p>\n              Monday - Closed <br />\n              Tuesday \u2013 Saturday: 7:00 am \u2013 3:00 pm <br />\n              Sunday: 9:00 am \u2013 2:00 pm<br />\n              Kent St, Bentley, 6102, Western Australia<br /><br />\n              @destore\n            </p>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-animation-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Animation</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Game Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fruit</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Vegetables</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-digex-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Digital Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Baked Goods</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fresh Bread</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Wraps</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-graphic-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Graphic Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cold Meats</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cheese</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Olives</h3>\n              </div>\n            </div>\n          </div>\n        </div>\n      </footer>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

class AboutView {
  init() {
    document.title = "About Page";
    this.render();

    _Utils.default.pageIntroAnim();
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new AboutView();

exports.default = _default;
},{"../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","../../Router":"Router.js","../../Utils":"Utils.js"}],"views/pages/contact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("../../App"));

var _litHtml = require("lit-html");

var _Router = require("../../Router");

var _Utils = _interopRequireDefault(require("../../Utils"));

var _graduateData = require("./../../../static/data/graduateData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n            <div\n              style=\"height:200px; width:auto; min-width:300px; background:white; margin:1rem; border-radius:15px; padding:1rem\"\n            >\n              <h2>", "</h2>\n              <p>", "</p>\n            </div>\n          "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <div\n        style=\"display:flex; flex-direction:row; flex-flow:wrap; align-items:center; justify-content:center; width:80vw; margin: 0 auto\"\n      >\n        ", "\n      </div>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var agdGradsArray = _graduateData.Graduates.filter(function (grad) {
  return grad.major === "Animation and Game Design";
});

var digitalGradsArray = _graduateData.Graduates.filter(function (grad) {
  return grad.major === "Digital Experience and Interaction Design";
});

var graphicGradsArray = _graduateData.Graduates.filter(function (grad) {
  return grad.major === "Graphic Design";
});

console.log(agdGradsArray);
console.log(digitalGradsArray);
console.log(graphicGradsArray);

_Utils.default.shuffle(digitalGradsArray);

class ContactView {
  init() {
    document.title = "Playground Page";
    this.render();

    _Utils.default.pageIntroAnim();
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), digitalGradsArray.map(graduate => (0, _litHtml.html)(_templateObject2(), graduate.firstName, graduate.tagLine)));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new ContactView();

exports.default = _default;
},{"../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","../../Router":"Router.js","../../Utils":"Utils.js","./../../../static/data/graduateData":"../static/data/graduateData.js"}],"views/partials/splash.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litHtml = require("lit-html");

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n\n  <div class=\"app-splash\">\n    <div class=\"inner\">\n      <img class=\"app-logo\" src=\"/images/logo.svg\" />\n      <sl-spinner style=\"font-size: 2em;\"></sl-spinner>\n    </div>\n  </div>\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const splash = (0, _litHtml.html)(_templateObject());
var _default = splash;
exports.default = _default;
},{"lit-html":"../node_modules/lit-html/lit-html.js"}],"Toast.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./App"));

var _litHtml = require("lit-html");

var _gsap = require("gsap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Toast {
  static init() {
    this.showDuration = 2.5; // create container element

    this.containerEl = document.createElement('div');
    this.containerEl.id = 'toasts'; // append to <body>

    document.body.appendChild(this.containerEl);
  }

  static show(content) {
    let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    if (!content) return; // create element

    const toastEl = document.createElement('div');
    toastEl.className = 'toast-entry';
    if (type != "") toastEl.classList.add('is-error');
    toastEl.innerText = content; // appened to container

    this.containerEl.appendChild(toastEl); // animate using gsap

    const tl = _gsap.gsap.timeline();

    tl.from(toastEl, {
      y: 60,
      opacity: 0,
      duration: 0.3,
      ease: "power3.out"
    });
    tl.to(toastEl, {
      marginTop: -50,
      opacity: 0,
      delay: this.showDuration,
      duration: 0.3,
      onComplete: () => {
        toastEl.remove();
      }
    });
  }

}

exports.default = Toast;
},{"./App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","gsap":"../node_modules/gsap/index.js"}],"Auth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./App"));

var _Router = _interopRequireWildcard(require("./Router"));

var _splash = _interopRequireDefault(require("./views/partials/splash"));

var _litHtml = require("lit-html");

var _Toast = _interopRequireDefault(require("./Toast"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Auth {
  constructor() {
    this.currentUser = {};
  }

  async signUp(userData) {
    let fail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const response = await fetch("".concat(_App.default.apiBase, "/user"), {
      method: 'POST',
      body: userData
    }); // if response not ok

    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err); // show error      

      _Toast.default.show("Problem getting user: ".concat(response.status)); // run fail() functon if set


      if (typeof fail == 'function') fail();
    } /// sign up success - show toast and redirect to sign in page


    _Toast.default.show('Account created, please sign in'); // redirect to signin


    (0, _Router.gotoRoute)('/signin');
  }

  async signIn(userData) {
    let fail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const response = await fetch("".concat(_App.default.apiBase, "/auth/signin"), {
      method: 'POST',
      body: userData
    }); // if response not ok

    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err); // show error      

      _Toast.default.show("Problem signing in: ".concat(err.message), 'error'); // run fail() functon if set


      if (typeof fail == 'function') fail();
    } // sign in success


    const data = await response.json();

    _Toast.default.show("Welcome  ".concat(data.user.firstName)); // save access token (jwt) to local storage


    localStorage.setItem('accessToken', data.accessToken); // set current user

    this.currentUser = data.user; // console.log(this.currentUser)       

    _Router.default.init(); // Redirection


    if (data.user.newUser == true) {
      // Redirect NEW USER to the guide page! (url/guide)
      (0, _Router.gotoRoute)('/guide');
    } else {
      // If it is an EXISTING USER, bring them to the home page (url/)
      (0, _Router.gotoRoute)('/');
    }
  } // Redirect to home
  //***   Router.init()
  //***   gotoRoute('/')
  //*** }


  async check(success) {
    // show splash screen while loading ...   
    (0, _litHtml.render)(_splash.default, _App.default.rootEl); // check local token is there

    if (!localStorage.accessToken) {
      // no local token!
      _Toast.default.show("Please sign in"); // redirect to sign in page      


      (0, _Router.gotoRoute)('/signin');
      return;
    } // token must exist - validate token via the backend


    const response = await fetch("".concat(_App.default.apiBase, "/auth/validate"), {
      method: 'GET',
      headers: {
        "Authorization": "Bearer ".concat(localStorage.accessToken)
      }
    }); // if response not ok

    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err); // delete local token

      localStorage.removeItem('accessToken');

      _Toast.default.show("session expired, please sign in"); // redirect to sign in      


      (0, _Router.gotoRoute)('/signin');
      return;
    } // token is valid!


    const data = await response.json(); // console.log(data)
    // set currentUser obj

    this.currentUser = data.user; // run success

    success();
  }

  signOut() {
    _Toast.default.show("You are signed out"); // delete local token


    localStorage.removeItem('accessToken'); // redirect to sign in    

    (0, _Router.gotoRoute)('/signin'); // unset currentUser

    this.currentUser = null;
  }

}

var _default = new Auth();

exports.default = _default;
},{"./App":"App.js","./Router":"Router.js","./views/partials/splash":"views/partials/splash.js","lit-html":"../node_modules/lit-html/lit-html.js","./Toast":"Toast.js"}],"GraduateAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./App"));

var _Auth = _interopRequireDefault(require("./Auth"));

var _Toast = _interopRequireDefault(require("./Toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GraduateAPI {
  // GET ALL GRADUATES ------------------------------
  async getGraduates() {
    console.log(Graduates); // fetch the json data

    const response = await fetch("".concat(_App.default.apiBase, "/graduate")); // convert response payload into json - store as data

    const data = await response.json(); // return data

    return data;
  } // GET SINGLE GRADUATE ------------------------------


  async getGraduate(id) {
    // fetch the json data
    const response = await fetch("".concat(_App.default.apiBase, "/static/data/gradDataTwo.js"));
    console.log(response); // convert response payload into json - store as data

    const data = await response.json(); // return data

    return data;
  }

}

var _default = new GraduateAPI();

exports.default = _default;
},{"./App":"App.js","./Auth":"Auth.js","./Toast":"Toast.js"}],"views/pages/viewGraduate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./../../App"));

var _litHtml = require("lit-html");

var _Router = require("./../../Router");

var _Auth = _interopRequireDefault(require("./../../Auth"));

var _Utils = _interopRequireDefault(require("./../../Utils"));

var _GraduateAPI = _interopRequireDefault(require("./../../GraduateAPI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject3() {
  const data = _taggedTemplateLiteral(["\n              <!-- ABOUT THE STUDENT ---------------------------------->\n              <section class=\"block-50-50\">\n                <div class=\"column\">\n                  <img\n                    src=\"", "/images/", "\"\n                  />\n                </div>\n                <div class=\"column\">\n                  <h3>Major", "</h3>\n                  <h1>First Name", "</h1>\n                  <p>\n                    <strong>Quirky Fact</strong><br />Something\n                    quirky/interesting about the\n                    student.", "\n                  </p>\n                  <p>\n                    <strong>Hobbies</strong><br />A list of hobbies of the\n                    student.", "\n                  </p>\n\n                  <div class=\"buttons-wrapper\">\n                    <button class=\"secondary\">Portfolio</button>\n                    <button class=\"icon\">Linkedin</button>\n                    <button class=\"icon\">Instagram</button>\n                  </div>\n\n                  <p><strong>Description</strong></p>\n                  <p>\n                    ", "Lorem ipsum dolor sit amet,\n                    consectetur adipiscing elit. Tellus suspendisse non, sit\n                    euismod mauris ut. Suscipit non elit at sem massa eget\n                    semper. Eget tristique adipiscing congue turpis tincidunt\n                    non. Commodo tortor nunc lacus lacinia amet, platea. Ut nec\n                    leo, lobortis mattis. Tristique molestie orci nec nulla\n                    dapibus ultricies vel cursus. Eget dictumst volutpat integer\n                    eu, suscipit tincidunt gravida aliquam ultricies. Pretium\n                    parturient a, integer eget aenean vel. Diam commodo,\n                    pellentesque purus pretium, nisi nunc nisi tempus, tellus.\n                    Amet suspendisse sodales tristique purus. Netus est quam\n                    neque arcu elit aliquam. Tristique vulputate sed a in morbi.\n                    Enim, adipiscing a purus enim curabitur nunc, ac. Non, eu\n                    cursus arcu ut eu, ut.\n                  </p>\n                </div>\n              </section>\n\n              <!-- WORK ---------------------------------->\n              <section class=\"block-100 height-1\">\n                <h1>Jane Doe's Work</h1>\n                <div class=\"work-container\">\n                  <!-- This is where we will display a couple of the students best works. -->\n                </div>\n              </section>\n            "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = _taggedTemplateLiteral([" <sl-spinner></sl-spinner> "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <va-app-header\n        title=\"View Graduate\"\n        user=\"", "\"\n      ></va-app-header>\n      <div class=\"page-content\">\n        ", "\n        <!-- end of individual rendering -->\n        \n      </div>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

class viewGraduateView {
  init() {
    document.title = "View Graduate";
    this.graduate = null;
    this.render();

    _Utils.default.pageIntroAnim();

    this.getGraduate();
  }

  async getGraduate() {
    // get id param from URL
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("id"); // console.log(id)
    // get the graduate

    this.graduate = await _GraduateAPI.default.getGraduate(id);
    console.log(this.graduate);
    this.render();
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), JSON.stringify(_Auth.default.currentUser), this.graduate == null ? (0, _litHtml.html)(_templateObject2()) : (0, _litHtml.html)(_templateObject3(), _App.default.apiBase, this.graduate.normalPhoto, this.graduate.major, this.graduate.firstName, this.graduate.quirkyFact, this.graduate.hobbies, this.graduate.description));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new viewGraduateView();

exports.default = _default;
},{"./../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","./../../Router":"Router.js","./../../Auth":"Auth.js","./../../Utils":"Utils.js","./../../GraduateAPI":"GraduateAPI.js"}],"views/pages/graduates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("../../App"));

var _litHtml = require("lit-html");

var _Router = require("../../Router");

var _Utils = _interopRequireDefault(require("../../Utils"));

var _graduateData = require("../../../static/data/graduateData");

var _Toast = _interopRequireDefault(require("../../Toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  const data = _taggedTemplateLiteral(["\n                      <va-graduates\n                        class=\"graduate-card\"\n                        avatarTwo=\"", "\"\n                        avatarOne=\"", "\"\n                        avatarOneHQ=\"", "\"\n                        avatarTwoHQ=\"", "\"\n                        firstName=\"", "\"\n                        lastName=\"", "\"\n                        portfolio=\"", "\"\n                        tagLine=\"", "\"\n                        studentNumber=\"", "\"\n                      >\n                      </va-graduates>\n                    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  const data = _taggedTemplateLiteral(["\n                  ", "\n                "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = _taggedTemplateLiteral([" <sl-spinner></sl-spinner> "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <va-app-header title=\"Shop\"></va-app-header>\n      <div class=\"page-content\">\n        <!-- title -->\n        \n        <h1>ALL GRADUATES</h1>\n\n        <!-- FILTER DROPDOWN / SEARCH BAR ---------------------------------->\n        <section class=\"search-and-filter-container\">\n          <!-- search bar -->\n          <div class=\"search-input-container\">\n            <input\n              class=\"search-input\"\n              id=\"search-input\"\n              type=\"search\"\n              placeholder=\"Search\"\n              @keyup=", "\n              @keydown=", "\n            />\n            <i class=\"fas fa-search\"></i>\n          </div>\n\n          <!-- search filters -->\n          <label class=\"dropdown\">\n            <div class=\"dd-button\">Filter</div>\n            <input type=\"checkbox\" class=\"dd-input\" id=\"test\" />\n            <ul class=\"dd-menu\">\n              <li size=\"small\" @click=", ">\n                All Employees\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                data-match=\"animation-and-game-design\"\n                @click=", "\n              >\n                Animation & Game Design\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                data-match=\"graphic-design\"\n                @click=", "\n              >\n                Graphic Design\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                data-match=\"digital-design\"\n                @click=", "\n              >\n                Digital Design\n              </li>\n            </ul>\n          </label>\n        </section>\n\n        <!-- ALL STUDENTS ---------------------------------->\n        <section class=\"all-graduates-container\">\n          <!-- graduate component -->\n          <div class=\"graduate-grid\">\n            ", "\n          </div>\n          <!-- /component -->\n        </section>\n      </div>\n\n      <!-- FOOTER ---------------------------------->\n      <footer>\n        <div class=\"footer-content\">\n          <div class=\"destore-col\">\n            <h3>DeStore</h3>\n            <p>\n              Monday - Closed <br />\n              Tuesday \u2013 Saturday: 7:00 am \u2013 3:00 pm <br />\n              Sunday: 9:00 am \u2013 2:00 pm<br />\n              Kent St, Bentley, 6102, Western Australia<br /><br />\n              @destore\n            </p>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-animation-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Animation</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Game Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fruit</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Vegetables</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-digex-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Digital Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Baked Goods</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fresh Bread</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Wraps</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-graphic-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Graphic Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cold Meats</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cheese</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Olives</h3>\n              </div>\n            </div>\n          </div>\n        </div>\n      </footer>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

class AllGraduates {
  init() {
    document.title = "Shop";
    this.Graduates = _graduateData.Graduates;

    _Utils.default.shuffle(this.Graduates);

    this.render();

    _Utils.default.pageIntroAnim();
  }

  resetGrads() {
    this.Graduates = _graduateData.Graduates;
    this.render();
  }

  filterGraduates(field, match) {
    // validate
    if (!field || !match) return; // get fresh copy of the graduates - reset graduates so that no filters have been applied already

    this.Graduates;
    let filteredGraduates; // by firstName

    if (field == "firstName") {
      // filter this.graduate where graduate.name contains a searchQuery
      filteredGraduates = this.Graduates.filter(graduate => graduate.firstName.toLowerCase().includes(match.toLowerCase()));
    } // FIRSTNAME IS THE ONLY ONE THAT ACUTALLY WORKS OOPS
    // by major


    if (field == "major") {
      filteredGraduates = this.Graduates.filter(graduate => graduate.texture == match);
    } // by lastName


    if (field == "lastName") {
      // filter this.graduate where graduate.description contains a searchQuery
      filteredGraduates = this.Graduates.filter(graduate => graduate.lastName.toLowerCase().includes(match.toLowerCase()));
    } // set and render


    this.Graduates = filteredGraduates;
    this.render();
  }

  backSpaceHandler(e) {
    let key = e.keyCode || e.charCode;
    if (key == 8) return e.target.value;
    console.log(e.target.value);
  }

  handleSearchKeyup(e) {
    // if search query is empty, clear filters
    if (e.target.value == "") {
      this.resetGrads();
    } else {
      this.resetGrads(); // filter graduates based on name and search query

      this.filterGraduates("firstName", e.target.value);
      console.log(this.Graduates); // if no result, filter graduates based on description and search query

      if (this.Graduates.length === 0) {
        this.Graduates;
        this.filterGraduates("lastName", e.target.value);
      }
    }
  }

  handleAGDFilter(e) {
    console.log(e.target.dataset.match);

    let agdGrads = _graduateData.Graduates.filter(function (grad) {
      return grad.major === "Animation and Game Design";
    });

    this.Graduates = agdGrads;
    this.render();
  }

  handleGDFilter(e) {
    console.log(e.target.dataset.match);

    let graphicGrads = _graduateData.Graduates.filter(function (grad) {
      return grad.major === "Graphic Design";
    });

    this.Graduates = graphicGrads;
    this.render();
  }

  handleDDFilter(e) {
    console.log(e.target.dataset.match);

    let digitalGrads = _graduateData.Graduates.filter(function (grad) {
      return grad.major === "Digital Experience and Interaction Design";
    });

    this.Graduates = digitalGrads;
    this.render();
  }

  clearFilters() {
    this.resetGrads();
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), this.handleSearchKeyup.bind(this), this.backSpaceHandler.bind(this), this.clearFilters.bind(this), this.handleAGDFilter.bind(this), this.handleGDFilter.bind(this), this.handleDDFilter.bind(this), _graduateData.Graduates == null ? (0, _litHtml.html)(_templateObject2()) : (0, _litHtml.html)(_templateObject3(), this.Graduates.map(graduate => (0, _litHtml.html)(_templateObject4(), graduate.avatarTwo, graduate.avatarOne, graduate.avatarOneHQ, graduate.avatarTwoHQ, graduate.firstName, graduate.lastName, graduate.portfolio, graduate.tagLine, graduate.studentNumber))), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new AllGraduates();

exports.default = _default;
},{"../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","../../Router":"Router.js","../../Utils":"Utils.js","../../../static/data/graduateData":"../static/data/graduateData.js","../../Toast":"Toast.js"}],"views/pages/digitalGraduates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("../../App"));

var _litHtml = require("lit-html");

var _Router = require("../../Router");

var _Utils = _interopRequireDefault(require("../../Utils"));

var _graduateData = require("../../../static/data/graduateData");

var _Toast = _interopRequireDefault(require("../../Toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  const data = _taggedTemplateLiteral(["\n                      <va-graduates\n                        class=\"graduate-card\"\n                        avatarTwo=\"", "\"\n                        avatarOne=\"", "\"\n                        avatarOneHQ=\"", "\"\n                        avatarTwoHQ=\"", "\"\n                        firstName=\"", "\"\n                        lastName=\"", "\"\n                        portfolio=\"", "\"\n                        tagLine=\"", "\"\n                        studentNumber=", "\n                      >\n                      </va-graduates>\n                    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  const data = _taggedTemplateLiteral(["\n                  ", "\n                "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = _taggedTemplateLiteral([" <sl-spinner></sl-spinner> "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <va-app-header title=\"Shop\"></va-app-header>\n      <div class=\"page-content\">\n        <!-- title -->\n\n        <h1>Digital Design Graduates</h1>\n\n        <!-- FILTER DROPDOWN / SEARCH BAR ---------------------------------->\n        <section class=\"search-and-filter-container\">\n          <!-- search bar -->\n          <div class=\"search-input-container\">\n            <input\n              class=\"search-input\"\n              id=\"search-input\"\n              type=\"search\"\n              placeholder=\"Search\"\n              @keyup=", "\n              @keydown=", "\n            />\n            <i class=\"fas fa-search\"></i>\n          </div>\n\n          <!-- search filters -->\n          <label class=\"dropdown\">\n            <div class=\"dd-button\">Filter</div>\n            <input type=\"checkbox\" class=\"dd-input\" id=\"test\" />\n            <ul class=\"dd-menu\">\n              <li size=\"small\" @click=", ">\n                All Employees\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                size=\"small\"\n                data-field=\"major\"\n                data-match=\"animation-and-game-design\"\n                @click=", "\n              >\n                Animation & Game Design\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                size=\"small\"\n                data-field=\"major\"\n                data-match=\"graphic-design\"\n                @click=", "\n              >\n                Graphic Design\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                size=\"small\"\n                data-field=\"major\"\n                data-match=\"digital-design\"\n                @click=", "\n              >\n                Digital Design\n              </li>\n            </ul>\n          </label>\n        </section>\n\n        <!-- ALL STUDENTS ---------------------------------->\n        <section class=\"all-graduates-container\">\n          <!-- graduate component -->\n          <div class=\"graduate-grid\">\n            ", "\n          </div>\n          <!-- /component -->\n        </section>\n      </div>\n        <!-- FOOTER ---------------------------------->\n        <footer>\n        <div class=\"footer-content\">\n          <div class=\"destore-col\">\n            <h3>DeStore</h3>\n            <p>\n              Monday - Closed <br />\n              Tuesday \u2013 Saturday: 7:00 am \u2013 3:00 pm <br />\n              Sunday: 9:00 am \u2013 2:00 pm<br />\n              Kent St, Bentley, 6102, Western Australia<br /><br />\n              @destore\n            </p>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-animation-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Animation</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Game Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fruit</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Vegetables</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-digex-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Digital Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Baked Goods</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fresh Bread</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Wraps</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-graphic-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Graphic Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cold Meats</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cheese</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Olives</h3>\n              </div>\n            </div>\n          </div>\n        </div>\n      </footer>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var digitalGradsArray = _graduateData.Graduates.filter(function (grad) {
  return grad.major === "Digital Experience and Interaction Design";
});

class DigitalGraduatesView {
  init() {
    document.title = "Digital Grads";
    this.Graduates = _graduateData.Graduates;

    _Utils.default.shuffle(digitalGradsArray);

    this.render();
  }

  clearFilterBtns() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => btn.removeAttribute("type"));
  }

  resetGrads() {
    this.Graduates = _graduateData.Graduates;
    this.render();
  }

  filterGraduates(field, match) {
    // validate
    if (!field || !match) return; // get fresh copy of the graduates - reset graduates so that no filters have been applied already

    this.Graduates;
    let filteredGraduates; // by major

    if (field == "major") {
      filteredGraduates = this.Graduates.filter(graduate => graduate.texture == match);
    } // by firstName


    if (field == "firstName") {
      // filter this.graduate where graduate.name contains a searchQuery
      filteredGraduates = this.Graduates.filter(graduate => graduate.firstName.toLowerCase().includes(match.toLowerCase()));
    } // by lastName


    if (field == "lastName") {
      // filter this.graduate where graduate.description contains a searchQuery
      filteredGraduates = this.Graduates.filter(graduate => graduate.lastName.toLowerCase().includes(match.toLowerCase()));
    } // set and render


    this.Graduates = filteredGraduates;
    this.render();
  }

  backSpaceHandler(e) {
    let key = e.keyCode || e.charCode;
    if (key == 8) return e.target.value;
    console.log(e.target.value);
  }

  handleSearchKeyup(e) {
    // if search query is empty, clear filters
    if (e.target.value == "") {
      this.resetGrads();
    } else {
      this.resetGrads(); // filter graduates based on name and search query

      this.filterGraduates("firstName", e.target.value);
      console.log(this.Graduates); // if no result, filter graduates based on description and search query

      if (this.Graduates.length === 0) {
        this.Graduates;
        this.filterGraduates("lastName", e.target.value);
      }
    }
  }

  handleFilterBtn(e) {
    // clear all filter buttons active state (remove type = primary)
    this.clearFilterBtns(); // set button active (type = primary)

    e.target.setAttribute("type", "primary"); // extract the field and match from the button

    const field = e.target.getAttribute("data-field");
    const match = e.target.getAttribute("data-match"); // filter graduates

    this.filterGraduates(field, match);
  }

  clearFilters() {
    this.resetGrads();
    this.clearFilterBtns();
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), this.handleSearchKeyup.bind(this), this.backSpaceHandler.bind(this), this.clearFilters.bind(this), this.handleFilterBtn.bind(this), this.handleFilterBtn.bind(this), this.handleFilterBtn.bind(this), _graduateData.Graduates == null ? (0, _litHtml.html)(_templateObject2()) : (0, _litHtml.html)(_templateObject3(), digitalGradsArray.map(graduate => (0, _litHtml.html)(_templateObject4(), graduate.avatarTwo, graduate.avatarOne, graduate.avatarOneHQ, graduate.avatarTwoHQ, graduate.firstName, graduate.lastName, graduate.portfolio, graduate.tagLine, graduate.studentNumber))), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new DigitalGraduatesView();

exports.default = _default;
},{"../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","../../Router":"Router.js","../../Utils":"Utils.js","../../../static/data/graduateData":"../static/data/graduateData.js","../../Toast":"Toast.js"}],"views/pages/animationGraduates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("../../App"));

var _litHtml = require("lit-html");

var _Router = require("../../Router");

var _Utils = _interopRequireDefault(require("../../Utils"));

var _graduateData = require("../../../static/data/graduateData");

var _Toast = _interopRequireDefault(require("../../Toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  const data = _taggedTemplateLiteral(["\n                      <va-graduates\n                        class=\"graduate-card\"\n                        avatarTwo=\"", "\"\n                        avatarOne=\"", "\"\n                        avatarOneHQ=\"", "\"\n                        avatarTwoHQ=\"", "\"\n                        firstName=\"", "\"\n                        lastName=\"", "\"\n                        portfolio=\"", "\"\n                        tagLine=\"", "\"\n                        studentNumber=", "\n                      >\n                      </va-graduates>\n                    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  const data = _taggedTemplateLiteral(["\n                  ", "\n                "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = _taggedTemplateLiteral([" <sl-spinner></sl-spinner> "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <va-app-header title=\"Shop\"></va-app-header>\n      <div class=\"page-content\">\n        <!-- title -->\n\n        <h1>Animation And Game Design Graduates</h1>\n\n        <!-- FILTER DROPDOWN / SEARCH BAR ---------------------------------->\n        <section class=\"search-and-filter-container\">\n          <!-- search bar -->\n          <div class=\"search-input-container\">\n            <input\n              class=\"search-input\"\n              id=\"search-input\"\n              type=\"search\"\n              placeholder=\"Search\"\n              @keyup=", "\n              @keydown=", "\n            />\n            <i class=\"fas fa-search\"></i>\n          </div>\n\n          <!-- search filters -->\n          <label class=\"dropdown\">\n            <div class=\"dd-button\">Filter</div>\n            <input type=\"checkbox\" class=\"dd-input\" id=\"test\" />\n            <ul class=\"dd-menu\">\n              <li size=\"small\" @click=", ">\n                All Employees\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                size=\"small\"\n                data-field=\"major\"\n                data-match=\"animation-and-game-design\"\n                @click=", "\n              >\n                Animation & Game Design\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                size=\"small\"\n                data-field=\"major\"\n                data-match=\"graphic-design\"\n                @click=", "\n              >\n                Graphic Design\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                size=\"small\"\n                data-field=\"major\"\n                data-match=\"digital-design\"\n                @click=", "\n              >\n                Digital Design\n              </li>\n            </ul>\n          </label>\n        </section>\n\n        <!-- ALL STUDENTS ---------------------------------->\n        <section class=\"all-graduates-container\">\n          <!-- graduate component -->\n          <div class=\"graduate-grid\">\n            ", "\n          </div>\n          <!-- /component -->\n        </section>\n\n      </div>\n      <footer>\n        <div class=\"footer-content\">\n          <div class=\"destore-col\">\n            <h3>DeStore</h3>\n            <p>\n              Monday - Closed <br />\n              Tuesday \u2013 Saturday: 7:00 am \u2013 3:00 pm <br />\n              Sunday: 9:00 am \u2013 2:00 pm<br />\n              Kent St, Bentley, 6102, Western Australia<br /><br />\n              @destore\n            </p>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-animation-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Animation</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Game Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fruit</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Vegetables</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-digex-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Digital Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Baked Goods</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fresh Bread</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Wraps</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-graphic-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Graphic Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cold Meats</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cheese</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Olives</h3>\n              </div>\n            </div>\n          </div>\n        </div>\n      </footer>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var agdGradsArray = _graduateData.Graduates.filter(function (grad) {
  return grad.major === "Animation and Game Design";
});

class AnimationGraduatesView {
  init() {
    document.title = "AGD Grads";
    this.Graduates = _graduateData.Graduates;

    _Utils.default.shuffle(agdGradsArray);

    this.render();
  }

  clearFilterBtns() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => btn.removeAttribute("type"));
  }

  resetGrads() {
    this.Graduates = _graduateData.Graduates;
    this.render();
  }

  filterGraduates(field, match) {
    // validate
    if (!field || !match) return; // get fresh copy of the graduates - reset graduates so that no filters have been applied already

    this.Graduates;
    let filteredGraduates; // by major

    if (field == "major") {
      filteredGraduates = this.Graduates.filter(graduate => graduate.texture == match);
    } // by firstName


    if (field == "firstName") {
      // filter this.graduate where graduate.name contains a searchQuery
      filteredGraduates = this.Graduates.filter(graduate => graduate.firstName.toLowerCase().includes(match.toLowerCase()));
    } // by lastName


    if (field == "lastName") {
      // filter this.graduate where graduate.description contains a searchQuery
      filteredGraduates = this.Graduates.filter(graduate => graduate.lastName.toLowerCase().includes(match.toLowerCase()));
    } // set and render


    this.Graduates = filteredGraduates;
    this.render();
  }

  backSpaceHandler(e) {
    let key = e.keyCode || e.charCode;
    if (key == 8) return e.target.value;
    console.log(e.target.value);
  }

  handleSearchKeyup(e) {
    // if search query is empty, clear filters
    if (e.target.value == "") {
      this.resetGrads();
    } else {
      this.resetGrads(); // filter graduates based on name and search query

      this.filterGraduates("firstName", e.target.value);
      console.log(this.Graduates); // if no result, filter graduates based on description and search query

      if (this.Graduates.length === 0) {
        this.Graduates;
        this.filterGraduates("lastName", e.target.value);
      }
    }
  }

  handleFilterBtn(e) {
    // clear all filter buttons active state (remove type = primary)
    this.clearFilterBtns(); // set button active (type = primary)

    e.target.setAttribute("type", "primary"); // extract the field and match from the button

    const field = e.target.getAttribute("data-field");
    const match = e.target.getAttribute("data-match"); // filter graduates

    this.filterGraduates(field, match);
  }

  clearFilters() {
    this.resetGrads();
    this.clearFilterBtns();
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), this.handleSearchKeyup.bind(this), this.backSpaceHandler.bind(this), this.clearFilters.bind(this), this.handleFilterBtn.bind(this), this.handleFilterBtn.bind(this), this.handleFilterBtn.bind(this), _graduateData.Graduates == null ? (0, _litHtml.html)(_templateObject2()) : (0, _litHtml.html)(_templateObject3(), agdGradsArray.map(graduate => (0, _litHtml.html)(_templateObject4(), graduate.avatarTwo, graduate.avatarOne, graduate.avatarOneHQ, graduate.avatarTwoHQ, graduate.firstName, graduate.lastName, graduate.portfolio, graduate.tagLine, graduate.studentNumber))), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new AnimationGraduatesView();

exports.default = _default;
},{"../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","../../Router":"Router.js","../../Utils":"Utils.js","../../../static/data/graduateData":"../static/data/graduateData.js","../../Toast":"Toast.js"}],"views/pages/graphicGraduates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("../../App"));

var _litHtml = require("lit-html");

var _Router = require("../../Router");

var _Utils = _interopRequireDefault(require("../../Utils"));

var _graduateData = require("../../../static/data/graduateData");

var _Toast = _interopRequireDefault(require("../../Toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  const data = _taggedTemplateLiteral(["\n                      <va-graduates\n                        class=\"graduate-card\"\n                        avatarTwo=\"", "\"\n                        avatarOne=\"", "\"\n                        avatarOneHQ=\"", "\"\n                        avatarTwoHQ=\"", "\"\n                        firstName=\"", "\"\n                        lastName=\"", "\"\n                        portfolio=\"", "\"\n                        tagLine=\"", "\"\n                        studentNumber=", "\n                      >\n                      </va-graduates>\n                    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  const data = _taggedTemplateLiteral(["\n                  ", "\n                "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = _taggedTemplateLiteral([" <sl-spinner></sl-spinner> "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <va-app-header title=\"Shop\"></va-app-header>\n      <div class=\"page-content\">\n        <!-- title -->\n\n        <h1>Graphic Design Graduates</h1>\n\n        <!-- FILTER DROPDOWN / SEARCH BAR ---------------------------------->\n        <section class=\"search-and-filter-container\">\n          <!-- search bar -->\n          <div class=\"search-input-container\">\n            <input\n              class=\"search-input\"\n              id=\"search-input\"\n              type=\"search\"\n              placeholder=\"Search\"\n              @keyup=", "\n              @keydown=", "\n            />\n            <i class=\"fas fa-search\"></i>\n          </div>\n\n          <!-- search filters -->\n          <label class=\"dropdown\">\n            <div class=\"dd-button\">Filter</div>\n            <input type=\"checkbox\" class=\"dd-input\" id=\"test\" />\n            <ul class=\"dd-menu\">\n              <li size=\"small\" @click=", ">\n                All Employees\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                size=\"small\"\n                data-field=\"major\"\n                data-match=\"animation-and-game-design\"\n                @click=", "\n              >\n                Animation & Game Design\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                size=\"small\"\n                data-field=\"major\"\n                data-match=\"graphic-design\"\n                @click=", "\n              >\n                Graphic Design\n              </li>\n              <li class=\"divider\"></li>\n              <li\n                class=\"filter-btn\"\n                size=\"small\"\n                data-field=\"major\"\n                data-match=\"digital-design\"\n                @click=", "\n              >\n                Digital Design\n              </li>\n            </ul>\n          </label>\n        </section>\n\n        <!-- ALL STUDENTS ---------------------------------->\n        <section class=\"all-graduates-container\">\n          <!-- graduate component -->\n          <div class=\"graduate-grid\">\n            ", "\n          </div>\n          <!-- /component -->\n        </section>\n\n      </div>\n      <footer>\n        <div class=\"footer-content\">\n          <div class=\"destore-col\">\n            <h3>DeStore</h3>\n            <p>\n              Monday - Closed <br />\n              Tuesday \u2013 Saturday: 7:00 am \u2013 3:00 pm <br />\n              Sunday: 9:00 am \u2013 2:00 pm<br />\n              Kent St, Bentley, 6102, Western Australia<br /><br />\n              @destore\n            </p>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-animation-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Animation</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Game Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fruit</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Vegetables</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-digex-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Digital Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Baked Goods</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fresh Bread</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Wraps</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-graphic-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Graphic Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cold Meats</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cheese</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Olives</h3>\n              </div>\n            </div>\n          </div>\n        </div>\n      </footer>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var graphicGradsArray = _graduateData.Graduates.filter(function (grad) {
  return grad.major === "Graphic Design";
});

class GraphicGraduatesView {
  init() {
    document.title = "Graphic Grads";
    this.Graduates = _graduateData.Graduates;

    _Utils.default.shuffle(graphicGradsArray);

    this.render();
  }

  clearFilterBtns() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => btn.removeAttribute("type"));
  }

  resetGrads() {
    this.Graduates = graphicGradsArray;
    this.render();
  }

  filterGraduates(field, match) {
    // validate
    if (!field || !match) return; // get fresh copy of the graduates - reset graduates so that no filters have been applied already

    this.Graduates;
    let filteredGraduates; // by major

    if (field == "major") {
      filteredGraduates = this.Graduates.filter(graduate => graduate.texture == match);
    } // by firstName


    if (field == "firstName") {
      // filter this.graduate where graduate.name contains a searchQuery
      filteredGraduates = this.Graduates.filter(graduate => graduate.firstName.toLowerCase().includes(match.toLowerCase()));
    } // by lastName


    if (field == "lastName") {
      // filter this.graduate where graduate.description contains a searchQuery
      filteredGraduates = this.Graduates.filter(graduate => graduate.lastName.toLowerCase().includes(match.toLowerCase()));
    } // set and render


    this.Graduates = filteredGraduates;
    this.render();
  }

  backSpaceHandler(e) {
    let key = e.keyCode || e.charCode;
    if (key == 8) return e.target.value;
    console.log(e.target.value);
  }

  handleSearchKeyup(e) {
    // if search query is empty, clear filters
    if (e.target.value == "") {
      this.resetGrads();
    } else {
      this.resetGrads(); // filter graduates based on name and search query

      this.filterGraduates("firstName", e.target.value);
      console.log(this.Graduates); // if no result, filter graduates based on description and search query

      if (this.Graduates.length === 0) {
        this.Graduates;
        this.filterGraduates("lastName", e.target.value);
      }
    }
  }

  handleFilterBtn(e) {
    // clear all filter buttons active state (remove type = primary)
    this.clearFilterBtns(); // set button active (type = primary)

    e.target.setAttribute("type", "primary"); // extract the field and match from the button

    const field = e.target.getAttribute("data-field");
    const match = e.target.getAttribute("data-match"); // filter graduates

    this.filterGraduates(field, match);
  }

  clearFilters() {
    this.resetGrads();
    this.clearFilterBtns();
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), this.handleSearchKeyup.bind(this), this.backSpaceHandler.bind(this), this.clearFilters.bind(this), this.handleFilterBtn.bind(this), this.handleFilterBtn.bind(this), this.handleFilterBtn.bind(this), _graduateData.Graduates == null ? (0, _litHtml.html)(_templateObject2()) : (0, _litHtml.html)(_templateObject3(), graphicGradsArray.map(graduate => (0, _litHtml.html)(_templateObject4(), graduate.avatarTwo, graduate.avatarOne, graduate.avatarOneHQ, graduate.avatarTwoHQ, graduate.firstName, graduate.lastName, graduate.portfolio, graduate.tagLine, graduate.studentNumber))), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new GraphicGraduatesView();

exports.default = _default;
},{"../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","../../Router":"Router.js","../../Utils":"Utils.js","../../../static/data/graduateData":"../static/data/graduateData.js","../../Toast":"Toast.js"}],"views/pages/specificProfile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./../../App"));

var _litHtml = require("lit-html");

var _Router = require("./../../Router");

var _Auth = _interopRequireDefault(require("./../../Auth"));

var _Utils = _interopRequireDefault(require("./../../Utils"));

var _GraduateAPI = _interopRequireDefault(require("./../../GraduateAPI"));

var _graduateData = require("./../../../static/data/graduateData");

var _graduates = _interopRequireDefault(require("./graduates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <va-app-header title=\"View Graduate\"></va-app-header>\n      <div class=\"page-content\">\n        <section class=\"block-50-50\">\n          <div class=\"column\">\n            <div class=\"avatarContainer\">\n              <!-- first graduate avatar image -->\n              <img\n                class=\"avatarStyling avatarImage avatarOne\"\n                src=\"../", "\"\n              />\n              <!-- second graduate avatar image -->\n              <img\n                class=\"avatarStyling avatarImage avatarTwo\"\n                src=\"../", "\"\n              />\n            </div>\n          </div>\n          <div class=\"column paddingLeft\">\n            <h3>", "</h3>\n            <h1>\n              ", "\n              ", "\n            </h1>\n            <p><i>", "</i></p>\n\n            <p class=\"bioStyle\">", "</p>\n\n            <div class=\"socials-wrapper\">\n              <a\n                class=\"secondary\"\n                href=\"", "\"\n                target=\"_blank\"\n              >\n                Portfolio\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-linkedin-in\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-instagram\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-dribbble\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-artstation\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-behance\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-twitter\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-vimeo-v\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-github\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fas fa-tshirt\"></i>\n              </a>\n            </div>\n          </div>\n        </section>\n\n        <!-- WORK ---------------------------------->\n        <section>\n          <h2 class=\"profile\">\n            Some of ", "'s Work\n          </h2>\n          <!-- This is where we will display a couple of the students best works. -->\n          <!-- Maximum number is 6 works -->\n\n          <div id=\"photos\">\n            <img\n              class=\"portfolioItems\"\n              src=\"", "\"\n              alt=\"\"\n            />\n            <img\n              class=\"portfolioItems\"\n              src=\"", "\"\n              alt=\"\"\n            />\n            <img\n              class=\"portfolioItems\"\n              src=\"", "\"\n              alt=\"\"\n            />\n            <img\n              class=\"portfolioItems\"\n              src=\"", "\"\n              alt=\"\"\n            />\n            <img\n              class=\"portfolioItems\"\n              src=\"", "\"\n              alt=\"\"\n            />\n            <img\n              class=\"portfolioItems\"\n              src=\"", "\"\n              alt=\"\"\n            />\n          </div>\n        </section>\n      </div>\n      <footer>\n        <div class=\"footer-content\">\n          <div class=\"destore-col\">\n            <h3>DeStore</h3>\n            <p>\n              Monday - Closed <br />\n              Tuesday \u2013 Saturday: 7:00 am \u2013 3:00 pm <br />\n              Sunday: 9:00 am \u2013 2:00 pm<br />\n              Kent St, Bentley, 6102, Western Australia<br /><br />\n              @destore\n            </p>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-animation-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Animation</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Game Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fruit</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Vegetables</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-digex-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Digital Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Baked Goods</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Fresh Bread</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Wraps</h3>\n              </div>\n            </div>\n          </div>\n          <div class=\"major-col\">\n            <div\n              class=\"footer-graphic-column\"\n              @click=\"", "\"\n            >\n              <div class=\"footer-item\">\n                <h3>Graphic Design</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cold Meats</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Cheese</h3>\n              </div>\n              <div class=\"footer-item\">\n                <h3>Olives</h3>\n              </div>\n            </div>\n          </div>\n        </div>\n      </footer>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

class specificProfile {
  async init() {
    document.title = "View Graduate";
    this.graduate = null;
    this.studentId = null;
    this.studentIdString = null;
    let graduates = _graduateData.Graduates;
    console.log(_graduateData.Graduates);

    _Utils.default.pageIntroAnim();

    await this.getGraduate();
    this.handleScrollTop();
  }

  async handleScrollTop() {
    let ele = await document.querySelectorAll(".block-50-50");
    let toTop = ele[0].clientTop;
    console.log(toTop);
    window.scroll({
      top: toTop,
      behavior: "smooth"
    });
  }

  async getGraduate() {
    // get id param from URL
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("id");
    console.log(id); // get the graduate

    let studentId = _graduateData.Graduates.filter(grad => {
      return grad.studentNumber === id;
    });

    console.log(studentId);
    const studentIdString = JSON.stringify(studentId);
    console.log(studentIdString);
    window.firstName = studentId[0].firstName;
    window.studentIdGlobal = studentId[0];
    console.log(firstName);
    this.render();
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), globalThis.studentIdGlobal.avatarOne, globalThis.studentIdGlobal.avatarTwo, globalThis.studentIdGlobal.major, globalThis.studentIdGlobal.firstName, globalThis.studentIdGlobal.lastName, globalThis.studentIdGlobal.tagLine, globalThis.studentIdGlobal.bio, globalThis.studentIdGlobal.portfolio, globalThis.studentIdGlobal.linkedin, globalThis.studentIdGlobal.instagram, globalThis.studentIdGlobal.dribbble, globalThis.studentIdGlobal.artStation, globalThis.studentIdGlobal.behance, globalThis.studentIdGlobal.twitter, globalThis.studentIdGlobal.vimeo, globalThis.studentIdGlobal.github, globalThis.studentIdGlobal.shirt, globalThis.studentIdGlobal.firstName, globalThis.studentIdGlobal.imageOne, globalThis.studentIdGlobal.imageTwo, globalThis.studentIdGlobal.imageThree, globalThis.studentIdGlobal.imageFour, globalThis.studentIdGlobal.imageFive, globalThis.studentIdGlobal.imageSix, () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/graduates"));
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new specificProfile();

exports.default = _default;
},{"./../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","./../../Router":"Router.js","./../../Auth":"Auth.js","./../../Utils":"Utils.js","./../../GraduateAPI":"GraduateAPI.js","./../../../static/data/graduateData":"../static/data/graduateData.js","./graduates":"views/pages/graduates.js"}],"../node_modules/@lit/reactive-element/css-tag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeCSS = exports.supportsAdoptingStyleSheets = exports.getCompatibleStyle = exports.css = exports.adoptStyles = exports.CSSResult = void 0;

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
      e = Symbol(),
      n = new Map();
exports.supportsAdoptingStyleSheets = t;

class s {
  constructor(t, n) {
    if (this._$cssResult$ = !0, n !== e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t;
  }

  get styleSheet() {
    let e = n.get(this.cssText);
    return t && void 0 === e && (n.set(this.cssText, e = new CSSStyleSheet()), e.replaceSync(this.cssText)), e;
  }

  toString() {
    return this.cssText;
  }

}

exports.CSSResult = s;

const o = t => new s("string" == typeof t ? t : t + "", e),
      r = (t, ...n) => {
  const o = 1 === t.length ? t[0] : n.reduce((e, n, s) => e + (t => {
    if (!0 === t._$cssResult$) return t.cssText;
    if ("number" == typeof t) return t;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new s(o, e);
},
      i = (e, n) => {
  t ? e.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(t => {
    const n = document.createElement("style"),
          s = window.litNonce;
    void 0 !== s && n.setAttribute("nonce", s), n.textContent = t.cssText, e.appendChild(n);
  });
},
      S = t ? t => t : t => t instanceof CSSStyleSheet ? (t => {
  let e = "";

  for (const n of t.cssRules) e += n.cssText;

  return o(e);
})(t) : t;

exports.getCompatibleStyle = S;
exports.adoptStyles = i;
exports.css = r;
exports.unsafeCSS = o;
},{}],"../node_modules/@lit/reactive-element/reactive-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CSSResult", {
  enumerable: true,
  get: function () {
    return _cssTag.CSSResult;
  }
});
Object.defineProperty(exports, "adoptStyles", {
  enumerable: true,
  get: function () {
    return _cssTag.adoptStyles;
  }
});
Object.defineProperty(exports, "css", {
  enumerable: true,
  get: function () {
    return _cssTag.css;
  }
});
Object.defineProperty(exports, "getCompatibleStyle", {
  enumerable: true,
  get: function () {
    return _cssTag.getCompatibleStyle;
  }
});
Object.defineProperty(exports, "supportsAdoptingStyleSheets", {
  enumerable: true,
  get: function () {
    return _cssTag.supportsAdoptingStyleSheets;
  }
});
Object.defineProperty(exports, "unsafeCSS", {
  enumerable: true,
  get: function () {
    return _cssTag.unsafeCSS;
  }
});
exports.notEqual = exports.defaultConverter = exports.ReactiveElement = void 0;

var _cssTag = require("./css-tag.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s;

const e = window.trustedTypes,
      r = e ? e.emptyScript : "",
      h = window.reactiveElementPolyfillSupport,
      o = {
  toAttribute(t, i) {
    switch (i) {
      case Boolean:
        t = t ? r : null;
        break;

      case Object:
      case Array:
        t = null == t ? t : JSON.stringify(t);
    }

    return t;
  },

  fromAttribute(t, i) {
    let s = t;

    switch (i) {
      case Boolean:
        s = null !== t;
        break;

      case Number:
        s = null === t ? null : Number(t);
        break;

      case Object:
      case Array:
        try {
          s = JSON.parse(t);
        } catch (t) {
          s = null;
        }

    }

    return s;
  }

},
      n = (t, i) => i !== t && (i == i || t == t),
      l = {
  attribute: !0,
  type: String,
  converter: o,
  reflect: !1,
  hasChanged: n
};

exports.notEqual = n;
exports.defaultConverter = o;

class a extends HTMLElement {
  constructor() {
    super(), this._$Et = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$Ei = null, this.o();
  }

  static addInitializer(t) {
    var i;
    null !== (i = this.l) && void 0 !== i || (this.l = []), this.l.push(t);
  }

  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, s) => {
      const e = this._$Eh(s, i);

      void 0 !== e && (this._$Eu.set(e, s), t.push(e));
    }), t;
  }

  static createProperty(t, i = l) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
            e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }

  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },

      set(e) {
        const r = this[t];
        this[i] = e, this.requestUpdate(t, r, s);
      },

      configurable: !0,
      enumerable: !0
    };
  }

  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l;
  }

  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);

    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Eu = new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties,
            i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];

      for (const s of i) this.createProperty(s, t[s]);
    }

    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }

  static finalizeStyles(i) {
    const s = [];

    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());

      for (const i of e) s.unshift((0, _cssTag.getCompatibleStyle)(i));
    } else void 0 !== i && s.push((0, _cssTag.getCompatibleStyle)(i));

    return s;
  }

  static _$Eh(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }

  o() {
    var t;
    this._$Ep = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Em(), this.requestUpdate(), null === (t = this.constructor.l) || void 0 === t || t.forEach(t => t(this));
  }

  addController(t) {
    var i, s;
    (null !== (i = this._$Eg) && void 0 !== i ? i : this._$Eg = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }

  removeController(t) {
    var i;
    null === (i = this._$Eg) || void 0 === i || i.splice(this._$Eg.indexOf(t) >>> 0, 1);
  }

  _$Em() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Et.set(i, this[i]), delete this[i]);
    });
  }

  createRenderRoot() {
    var t;
    const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return (0, _cssTag.adoptStyles)(s, this.constructor.elementStyles), s;
  }

  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$Eg) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    });
  }

  enableUpdating(t) {}

  disconnectedCallback() {
    var t;
    null === (t = this._$Eg) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    });
  }

  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }

  _$ES(t, i, s = l) {
    var e, r;

    const h = this.constructor._$Eh(t, s);

    if (void 0 !== h && !0 === s.reflect) {
      const n = (null !== (r = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== r ? r : o.toAttribute)(i, s.type);
      this._$Ei = t, null == n ? this.removeAttribute(h) : this.setAttribute(h, n), this._$Ei = null;
    }
  }

  _$AK(t, i) {
    var s, e, r;

    const h = this.constructor,
          n = h._$Eu.get(t);

    if (void 0 !== n && this._$Ei !== n) {
      const t = h.getPropertyOptions(n),
            l = t.converter,
            a = null !== (r = null !== (e = null === (s = l) || void 0 === s ? void 0 : s.fromAttribute) && void 0 !== e ? e : "function" == typeof l ? l : null) && void 0 !== r ? r : o.fromAttribute;
      this._$Ei = n, this[n] = a(i, t.type), this._$Ei = null;
    }
  }

  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || n)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$Ei !== t && (void 0 === this._$E_ && (this._$E_ = new Map()), this._$E_.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$Ep = this._$EC());
  }

  async _$EC() {
    this.isUpdatePending = !0;

    try {
      await this._$Ep;
    } catch (t) {
      Promise.reject(t);
    }

    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }

  scheduleUpdate() {
    return this.performUpdate();
  }

  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t, i) => this[i] = t), this._$Et = void 0);
    let i = !1;
    const s = this._$AL;

    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$Eg) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this._$EU();
    } catch (t) {
      throw i = !1, this._$EU(), t;
    }

    i && this._$AE(s);
  }

  willUpdate(t) {}

  _$AE(t) {
    var i;
    null === (i = this._$Eg) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }

  _$EU() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }

  get updateComplete() {
    return this.getUpdateComplete();
  }

  getUpdateComplete() {
    return this._$Ep;
  }

  shouldUpdate(t) {
    return !0;
  }

  update(t) {
    void 0 !== this._$E_ && (this._$E_.forEach((t, i) => this._$ES(i, this[i], t)), this._$E_ = void 0), this._$EU();
  }

  updated(t) {}

  firstUpdated(t) {}

}

exports.ReactiveElement = a;
a.finalized = !0, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = {
  mode: "open"
}, null == h || h({
  ReactiveElement: a
}), (null !== (s = globalThis.reactiveElementVersions) && void 0 !== s ? s : globalThis.reactiveElementVersions = []).push("1.0.2");
},{"./css-tag.js":"../node_modules/@lit/reactive-element/css-tag.js"}],"../node_modules/lit-element/node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg = exports.render = exports.nothing = exports.noChange = exports.html = exports._$LH = void 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;

const i = globalThis.trustedTypes,
      s = i ? i.createPolicy("lit-html", {
  createHTML: t => t
}) : void 0,
      e = `lit$${(Math.random() + "").slice(9)}$`,
      o = "?" + e,
      n = `<${o}>`,
      l = document,
      h = (t = "") => l.createComment(t),
      r = t => null === t || "object" != typeof t && "function" != typeof t,
      d = Array.isArray,
      u = t => {
  var i;
  return d(t) || "function" == typeof (null === (i = t) || void 0 === i ? void 0 : i[Symbol.iterator]);
},
      c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
      v = /-->/g,
      a = />/g,
      f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
      _ = /'/g,
      m = /"/g,
      g = /^(?:script|style|textarea)$/i,
      $ = t => (i, ...s) => ({
  _$litType$: t,
  strings: i,
  values: s
}),
      p = $(1),
      y = $(2),
      b = Symbol.for("lit-noChange"),
      T = Symbol.for("lit-nothing"),
      x = new WeakMap(),
      w = (t, i, s) => {
  var e, o;
  const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let l = n._$litPart$;

  if (void 0 === l) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    n._$litPart$ = l = new N(i.insertBefore(h(), t), t, void 0, null != s ? s : {});
  }

  return l._$AI(t), l;
},
      A = l.createTreeWalker(l, 129, null, !1),
      C = (t, i) => {
  const o = t.length - 1,
        l = [];
  let h,
      r = 2 === i ? "<svg>" : "",
      d = c;

  for (let i = 0; i < o; i++) {
    const s = t[i];
    let o,
        u,
        $ = -1,
        p = 0;

    for (; p < s.length && (d.lastIndex = p, u = d.exec(s), null !== u);) p = d.lastIndex, d === c ? "!--" === u[1] ? d = v : void 0 !== u[1] ? d = a : void 0 !== u[2] ? (g.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = f) : void 0 !== u[3] && (d = f) : d === f ? ">" === u[0] ? (d = null != h ? h : c, $ = -1) : void 0 === u[1] ? $ = -2 : ($ = d.lastIndex - u[2].length, o = u[1], d = void 0 === u[3] ? f : '"' === u[3] ? m : _) : d === m || d === _ ? d = f : d === v || d === a ? d = c : (d = f, h = void 0);

    const y = d === f && t[i + 1].startsWith("/>") ? " " : "";
    r += d === c ? s + n : $ >= 0 ? (l.push(o), s.slice(0, $) + "$lit$" + s.slice($) + e + y) : s + e + (-2 === $ ? (l.push(void 0), i) : y);
  }

  const u = r + (t[o] || "<?>") + (2 === i ? "</svg>" : "");
  return [void 0 !== s ? s.createHTML(u) : u, l];
};

exports.render = w;
exports.nothing = T;
exports.noChange = b;
exports.svg = y;
exports.html = p;

class P {
  constructor({
    strings: t,
    _$litType$: s
  }, n) {
    let l;
    this.parts = [];
    let r = 0,
        d = 0;
    const u = t.length - 1,
          c = this.parts,
          [v, a] = C(t, s);

    if (this.el = P.createElement(v, n), A.currentNode = this.el.content, 2 === s) {
      const t = this.el.content,
            i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }

    for (; null !== (l = A.nextNode()) && c.length < u;) {
      if (1 === l.nodeType) {
        if (l.hasAttributes()) {
          const t = [];

          for (const i of l.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(e)) {
            const s = a[d++];

            if (t.push(i), void 0 !== s) {
              const t = l.getAttribute(s.toLowerCase() + "$lit$").split(e),
                    i = /([.?@])?(.*)/.exec(s);
              c.push({
                type: 1,
                index: r,
                name: i[2],
                strings: t,
                ctor: "." === i[1] ? M : "?" === i[1] ? H : "@" === i[1] ? I : S
              });
            } else c.push({
              type: 6,
              index: r
            });
          }

          for (const i of t) l.removeAttribute(i);
        }

        if (g.test(l.tagName)) {
          const t = l.textContent.split(e),
                s = t.length - 1;

          if (s > 0) {
            l.textContent = i ? i.emptyScript : "";

            for (let i = 0; i < s; i++) l.append(t[i], h()), A.nextNode(), c.push({
              type: 2,
              index: ++r
            });

            l.append(t[s], h());
          }
        }
      } else if (8 === l.nodeType) if (l.data === o) c.push({
        type: 2,
        index: r
      });else {
        let t = -1;

        for (; -1 !== (t = l.data.indexOf(e, t + 1));) c.push({
          type: 7,
          index: r
        }), t += e.length - 1;
      }

      r++;
    }
  }

  static createElement(t, i) {
    const s = l.createElement("template");
    return s.innerHTML = t, s;
  }

}

function V(t, i, s = t, e) {
  var o, n, l, h;
  if (i === b) return i;
  let d = void 0 !== e ? null === (o = s._$Cl) || void 0 === o ? void 0 : o[e] : s._$Cu;
  const u = r(i) ? void 0 : i._$litDirective$;
  return (null == d ? void 0 : d.constructor) !== u && (null === (n = null == d ? void 0 : d._$AO) || void 0 === n || n.call(d, !1), void 0 === u ? d = void 0 : (d = new u(t), d._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Cl) && void 0 !== l ? l : h._$Cl = [])[e] = d : s._$Cu = d), void 0 !== d && (i = V(t, d._$AS(t, i.values), d, e)), i;
}

class E {
  constructor(t, i) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }

  get parentNode() {
    return this._$AM.parentNode;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  p(t) {
    var i;
    const {
      el: {
        content: s
      },
      parts: e
    } = this._$AD,
          o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : l).importNode(s, !0);
    A.currentNode = o;
    let n = A.nextNode(),
        h = 0,
        r = 0,
        d = e[0];

    for (; void 0 !== d;) {
      if (h === d.index) {
        let i;
        2 === d.type ? i = new N(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new L(n, this, t)), this.v.push(i), d = e[++r];
      }

      h !== (null == d ? void 0 : d.index) && (n = A.nextNode(), h++);
    }

    return o;
  }

  m(t) {
    let i = 0;

    for (const s of this.v) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }

}

class N {
  constructor(t, i, s, e) {
    var o;
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cg = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
  }

  get _$AU() {
    var t, i;
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cg;
  }

  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
  }

  get startNode() {
    return this._$AA;
  }

  get endNode() {
    return this._$AB;
  }

  _$AI(t, i = this) {
    t = V(this, t, i), r(t) ? t === T || null == t || "" === t ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== b && this.$(t) : void 0 !== t._$litType$ ? this.T(t) : void 0 !== t.nodeType ? this.S(t) : u(t) ? this.M(t) : this.$(t);
  }

  A(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i);
  }

  S(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.A(t));
  }

  $(t) {
    this._$AH !== T && r(this._$AH) ? this._$AA.nextSibling.data = t : this.S(l.createTextNode(t)), this._$AH = t;
  }

  T(t) {
    var i;
    const {
      values: s,
      _$litType$: e
    } = t,
          o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = P.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.m(s);else {
      const t = new E(o, this),
            i = t.p(this.options);
      t.m(s), this.S(i), this._$AH = t;
    }
  }

  _$AC(t) {
    let i = x.get(t.strings);
    return void 0 === i && x.set(t.strings, i = new P(t)), i;
  }

  M(t) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s,
        e = 0;

    for (const o of t) e === i.length ? i.push(s = new N(this.A(h()), this.A(h()), this, this.options)) : s = i[e], s._$AI(o), e++;

    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }

  _$AR(t = this._$AA.nextSibling, i) {
    var s;

    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }

  setConnected(t) {
    var i;
    void 0 === this._$AM && (this._$Cg = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }

}

class S {
  constructor(t, i, s, e, o) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = T;
  }

  get tagName() {
    return this.element.tagName;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o) t = V(this, t, i, 0), n = !r(t) || t !== this._$AH && t !== b, n && (this._$AH = t);else {
      const e = t;
      let l, h;

      for (t = o[0], l = 0; l < o.length - 1; l++) h = V(this, e[s + l], i, l), h === b && (h = this._$AH[l]), n || (n = !r(h) || h !== this._$AH[l]), h === T ? t = T : t !== T && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
    }
    n && !e && this.k(t);
  }

  k(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }

}

class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }

  k(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }

}

const k = i ? i.emptyScript : "";

class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }

  k(t) {
    t && t !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }

}

class I extends S {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), this.type = 5;
  }

  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = V(this, t, i, 0)) && void 0 !== s ? s : T) === b) return;
    const e = this._$AH,
          o = t === T && e !== T || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
          n = t !== T && (e === T || o);
    o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }

  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
  }

}

class L {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AI(t) {
    V(this, t);
  }

}

const R = {
  P: "$lit$",
  V: e,
  L: o,
  I: 1,
  N: C,
  R: E,
  D: u,
  j: V,
  H: N,
  O: S,
  F: H,
  B: I,
  W: M,
  Z: L
},
      z = window.litHtmlPolyfillSupport;
exports._$LH = R;
null == z || z(P, N), (null !== (t = globalThis.litHtmlVersions) && void 0 !== t ? t : globalThis.litHtmlVersions = []).push("2.0.2");
},{}],"../node_modules/lit-element/lit-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  UpdatingElement: true,
  _$LE: true
};
exports._$LE = exports.UpdatingElement = exports.LitElement = void 0;

var _reactiveElement = require("@lit/reactive-element");

Object.keys(_reactiveElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reactiveElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reactiveElement[key];
    }
  });
});

var _litHtml = require("lit-html");

Object.keys(_litHtml).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _litHtml[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _litHtml[key];
    }
  });
});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
const r = _reactiveElement.ReactiveElement;
exports.UpdatingElement = r;

class s extends _reactiveElement.ReactiveElement {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Dt = void 0;
  }

  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
  }

  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Dt = (0, _litHtml.render)(i, this.renderRoot, this.renderOptions);
  }

  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
  }

  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
  }

  render() {
    return _litHtml.noChange;
  }

}

exports.LitElement = s;
s.finalized = !0, s._$litElement$ = !0, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, {
  LitElement: s
});
const n = globalThis.litElementPolyfillSupport;
null == n || n({
  LitElement: s
});
const h = {
  _$AK: (t, e, i) => {
    t._$AK(e, i);
  },
  _$AL: t => t._$AL
};
exports._$LE = h;
(null !== (o = globalThis.litElementVersions) && void 0 !== o ? o : globalThis.litElementVersions = []).push("3.0.2");
},{"@lit/reactive-element":"../node_modules/@lit/reactive-element/reactive-element.js","lit-html":"../node_modules/lit-element/node_modules/lit-html/lit-html.js"}],"../node_modules/@lit/reactive-element/decorators/base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.standardPrototypeMethod = exports.legacyPrototypeMethod = exports.decorateProperty = void 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = (e, t, o) => {
  Object.defineProperty(t, o, e);
},
      t = (e, t) => ({
  kind: "method",
  placement: "prototype",
  key: t.key,
  descriptor: e
}),
      o = ({
  finisher: e,
  descriptor: t
}) => (o, n) => {
  var r;

  if (void 0 === n) {
    const n = null !== (r = o.originalKey) && void 0 !== r ? r : o.key,
          i = null != t ? {
      kind: "method",
      placement: "prototype",
      key: n,
      descriptor: t(o.key)
    } : { ...o,
      key: n
    };
    return null != e && (i.finisher = function (t) {
      e(t, n);
    }), i;
  }

  {
    const r = o.constructor;
    void 0 !== t && Object.defineProperty(o, n, t(n)), null == e || e(r, n);
  }
};

exports.decorateProperty = o;
exports.standardPrototypeMethod = t;
exports.legacyPrototypeMethod = e;
},{}],"../node_modules/@lit/reactive-element/decorators/custom-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customElement = void 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n = n => e => "function" == typeof e ? ((n, e) => (window.customElements.define(n, e), e))(n, e) : ((n, e) => {
  const {
    kind: t,
    elements: i
  } = e;
  return {
    kind: t,
    elements: i,

    finisher(e) {
      window.customElements.define(n, e);
    }

  };
})(n, e);

exports.customElement = n;
},{}],"../node_modules/@lit/reactive-element/decorators/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.property = e;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (i, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? { ...e,

  finisher(n) {
    n.createProperty(e.key, i);
  }

} : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  originalKey: e.key,

  initializer() {
    "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
  },

  finisher(n) {
    n.createProperty(e.key, i);
  }

};

function e(e) {
  return (n, t) => void 0 !== t ? ((i, e, n) => {
    e.constructor.createProperty(n, i);
  })(e, n, t) : i(e, n);
}
},{}],"../node_modules/@lit/reactive-element/decorators/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = t;

var _property = require("./property.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t(t) {
  return (0, _property.property)({ ...t,
    state: !0
  });
}
},{"./property.js":"../node_modules/@lit/reactive-element/decorators/property.js"}],"../node_modules/@lit/reactive-element/decorators/event-options.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventOptions = e;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e) {
  return (0, _base.decorateProperty)({
    finisher: (r, t) => {
      Object.assign(r.prototype[t], e);
    }
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/@lit/reactive-element/decorators/query.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = i;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i(i, n) {
  return (0, _base.decorateProperty)({
    descriptor: o => {
      const t = {
        get() {
          var o, n;
          return null !== (n = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== n ? n : null;
        },

        enumerable: !0,
        configurable: !0
      };

      if (n) {
        const n = "symbol" == typeof o ? Symbol() : "__" + o;

        t.get = function () {
          var o, t;
          return void 0 === this[n] && (this[n] = null !== (t = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== t ? t : null), this[n];
        };
      }

      return t;
    }
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/@lit/reactive-element/decorators/query-all.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAll = e;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e) {
  return (0, _base.decorateProperty)({
    descriptor: r => ({
      get() {
        var r, o;
        return null !== (o = null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelectorAll(e)) && void 0 !== o ? o : [];
      },

      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/@lit/reactive-element/decorators/query-async.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAsync = e;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e) {
  return (0, _base.decorateProperty)({
    descriptor: r => ({
      async get() {
        var r;
        return await this.updateComplete, null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelector(e);
      },

      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAssignedNodes = o;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function o(o = "", n = !1, t = "") {
  return (0, _base.decorateProperty)({
    descriptor: e => ({
      get() {
        var e, r, l;
        const i = "slot" + (o ? `[name=${o}]` : ":not([name])");
        let u = null !== (l = null === (r = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(i)) || void 0 === r ? void 0 : r.assignedNodes({
          flatten: n
        })) && void 0 !== l ? l : [];
        return t && (u = u.filter(e => e.nodeType === Node.ELEMENT_NODE && e.matches(t))), u;
      },

      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/lit-element/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  UpdatingElement: true,
  _$LE: true
};
Object.defineProperty(exports, "LitElement", {
  enumerable: true,
  get: function () {
    return _litElement.LitElement;
  }
});
Object.defineProperty(exports, "UpdatingElement", {
  enumerable: true,
  get: function () {
    return _litElement.UpdatingElement;
  }
});
Object.defineProperty(exports, "_$LE", {
  enumerable: true,
  get: function () {
    return _litElement._$LE;
  }
});

var _reactiveElement = require("@lit/reactive-element");

Object.keys(_reactiveElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reactiveElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reactiveElement[key];
    }
  });
});

var _litHtml = require("lit-html");

Object.keys(_litHtml).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _litHtml[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _litHtml[key];
    }
  });
});

var _litElement = require("./lit-element.js");

var _base = require("@lit/reactive-element/decorators/base.js");

Object.keys(_base).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _base[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _base[key];
    }
  });
});

var _customElement = require("@lit/reactive-element/decorators/custom-element.js");

Object.keys(_customElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _customElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _customElement[key];
    }
  });
});

var _property = require("@lit/reactive-element/decorators/property.js");

Object.keys(_property).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _property[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _property[key];
    }
  });
});

var _state = require("@lit/reactive-element/decorators/state.js");

Object.keys(_state).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _state[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _state[key];
    }
  });
});

var _eventOptions = require("@lit/reactive-element/decorators/event-options.js");

Object.keys(_eventOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _eventOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventOptions[key];
    }
  });
});

var _query = require("@lit/reactive-element/decorators/query.js");

Object.keys(_query).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _query[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _query[key];
    }
  });
});

var _queryAll = require("@lit/reactive-element/decorators/query-all.js");

Object.keys(_queryAll).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _queryAll[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAll[key];
    }
  });
});

var _queryAsync = require("@lit/reactive-element/decorators/query-async.js");

Object.keys(_queryAsync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _queryAsync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAsync[key];
    }
  });
});

var _queryAssignedNodes = require("@lit/reactive-element/decorators/query-assigned-nodes.js");

Object.keys(_queryAssignedNodes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _queryAssignedNodes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAssignedNodes[key];
    }
  });
});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
},{"@lit/reactive-element":"../node_modules/@lit/reactive-element/reactive-element.js","lit-html":"../node_modules/lit-element/node_modules/lit-html/lit-html.js","./lit-element.js":"../node_modules/lit-element/lit-element.js","@lit/reactive-element/decorators/base.js":"../node_modules/@lit/reactive-element/decorators/base.js","@lit/reactive-element/decorators/custom-element.js":"../node_modules/@lit/reactive-element/decorators/custom-element.js","@lit/reactive-element/decorators/property.js":"../node_modules/@lit/reactive-element/decorators/property.js","@lit/reactive-element/decorators/state.js":"../node_modules/@lit/reactive-element/decorators/state.js","@lit/reactive-element/decorators/event-options.js":"../node_modules/@lit/reactive-element/decorators/event-options.js","@lit/reactive-element/decorators/query.js":"../node_modules/@lit/reactive-element/decorators/query.js","@lit/reactive-element/decorators/query-all.js":"../node_modules/@lit/reactive-element/decorators/query-all.js","@lit/reactive-element/decorators/query-async.js":"../node_modules/@lit/reactive-element/decorators/query-async.js","@lit/reactive-element/decorators/query-assigned-nodes.js":"../node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"}],"components/va-app-footer.js":[function(require,module,exports) {
"use strict";

var _litElement = require("lit-element");

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n<style>\n  footer {\n\t max-width: 100%;\n\t background-color: var(--agd-green);\n\t padding: 1rem;\n\t max-width: 1920px;\n\t margin: 0 auto;\n   \n}\n footer .footer-content {\n\t display: flex;\n\t align-items: center;\n\t justify-content: space-between;\n\t gap: 1rem;\n\t width: 90%;\n\t margin: 0 auto;\n}\n\n footer .footer-content .destore-col {\n\t width: calc(100% / 3);\n\t display: flex;\n\t flex-direction: column;\n\t justify-content: center;\n}\n footer .footer-content .destore-col h3 {\n\t font-size: 2rem;\n\t color: var(--brand-color);\n\t font-family: var(--heading-font-family-B);\n}\n footer .footer-content .major-col {\n\t background: var(--body-bg);\n\t width: calc(100% / 3 * 2 / 3);\n\t border-radius: 3px;\n}\n footer .footer-content .footer-digex-column, footer .footer-content .footer-graphic-column, footer .footer-content .footer-animation-column {\n\t height: auto;\n\t margin-top: 1rem;\n\t margin-bottom: 1rem;\n\t font-family: var(--heading-font-family-B);\n\t font-size: calc(0.5vw + 0.5vh + 0.5vmin);\n\t text-align: center;\n\t display: flex;\n\t flex-direction: column;\n\t justify-content: center;\n\t align-items: center;\n\t gap: 0.5rem;\n}\n footer .footer-content .footer-digex-column .footer-item, footer .footer-content .footer-graphic-column .footer-item, footer .footer-content .footer-animation-column .footer-item {\n\t min-height: 2rem;\n\t display: flex;\n\t flex-direction: column;\n\t align-items: center;\n\t justify-content: center;\n\t border-radius: 3px;\n\t transition: 0.2s;\n\t cursor: pointer;\n\t width: 90%;\n\t margin: 0 auto;\n}\n footer .footer-content .footer-digex-column .footer-item {\n\t background: var(--dig-yellow);\n}\n footer .footer-content .footer-digex-column .footer-item:hover {\n\t background: #ceb169;\n}\n footer .footer-content .footer-graphic-column .footer-item {\n\t background: var(--gd-red);\n}\n footer .footer-content .footer-graphic-column .footer-item:hover {\n\t background: #c29982;\n}\n footer .footer-content .footer-animation-column .footer-item {\n\t background: var(--agd-green);\n}\n footer .footer-content .footer-animation-column .footer-item:hover {\n\t background: #8eb4a9;\n}\n\n@media (max-width: 1200px) {\n #photos {\n -moz-column-count:    4;\n -webkit-column-count: 4;\n column-count:         2;\n }\n}\n@media (max-width: 1000px) {\n #photos {\n -moz-column-count:    3;\n -webkit-column-count: 3;\n column-count:         2;\n }\n}\n@media (max-width: 800px) {\n #photos {\n -moz-column-count:    2;\n -webkit-column-count: 2;\n column-count:         1;\n }\n}\n@media (max-width: 400px) {\n #photos {\n -moz-column-count:    1;\n -webkit-column-count: 1;\n column-count:         1;\n }\n}\n \n</style>\n\n  <footer>\n          <div class=\"footer-content\">\n            <div class=\"footer-col\">\n              <h3>DeStore</h3>\n              <p>\n                Monday \u2013 Saturday: 8:00 am \u2013 4:00pm <br />\n                Sunday: 9:00 am \u2013 5:00pm<br />\n                Kent St, Bentley, 6102, Western Australia<br /><br />\n                @destore\n              </p>\n            </div>\n            <div class=\"footer-col\">\n              <h3>Quick Links</h3>\n              <ul>\n                <li>Home</li>\n                <li>Shop</li>\n                <li>About</li>\n                <li>Contact</li>\n              </ul>\n            </div>\n            <div class=\"footer-col\">\n              <h3>Shop</h3>\n              <ul>\n                <li>Fresh Produce</li>\n                <li>Butcher</li>\n                <li>Bakery</li>\n              </ul>\n            </div>\n          </div>\n        </footer>\n      </div>\n\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

class AppFooter extends _litElement.LitElement {
  render() {
    return (0, _litElement.html)(_templateObject());
  }

}

customElements.define('va-app-footer', AppFooter);
},{"lit-element":"../node_modules/lit-element/index.js"}],"views/pages/individuals/19760513.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("../../../App"));

var _litHtml = require("lit-html");

var _Router = require("../../../Router");

var _Utils = _interopRequireDefault(require("../../../Utils"));

var _graduateData = require("../../../../static/data/graduateData");

var _litElement = require("lit-element");

var _vaAppFooter = require("../../../components/va-app-footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <va-app-header title=\"View Graduate\"></va-app-header>\n      <div class=\"page-content\">\n        <section class=\"block-50-50\">\n          <div class=\"column\"> \n            <div class=\"avatarContainer\">\n            <!-- first graduate avatar image -->\n              <img class=\"avatarStyling avatarImage avatarOne\" src=\"../", "\"/> \n             <!-- second graduate avatar image -->\n              <img class=\"avatarStyling avatarImage avatarTwo\" src=\"../", "\"/> \n              </div> \n          </div>\n          <div class=\"column paddingLeft\">\n            <h3>", "</h3>\n            <h1>\n              ", " ", "\n            </h1>\n            <p><i>", "</i></p>\n\n            <p><strong>About ", ": </strong></p>\n            <p class=\"bioStyle\">", "</p>\n            <a\n              class=\"secondary\" \n              href=\"", "\"\n              target=\"_blank\"\n            >\n              Portfolio\n            </a>\n            <div class=\"socials-wrapper\">\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-linkedin-in\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-instagram\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-dribbble\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-artstation\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-behance\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-twitter\"></i>\n              </a>\n              <a\n                class=\"icon\"\n                href=\"", "\"\n                target=\"_blank\"\n                class=\"secondary\"\n              >\n                <i class=\"fab fa-vimeo-v\"></i>\n              </a>\n            </div>\n          </div>\n        </section>\n\n             <!-- WORK ---------------------------------->\n             <section>\n          <h2>Some of ", "'s Work</h2>\n            <!-- This is where we will display a couple of the students best works. -->\n            <!-- Maximum number is 6 works -->\n\n            <div id=\"photos\">\n            <img class=\"portfolioItems\" src=\"", "\" alt=\"Design one\">\n            <img class=\"portfolioItems\" src=\"../images/work/Brooke_Fanto_19760513_2 - brooke fanto.jpg\" alt=\"Design two\">\n            <img class=\"portfolioItems\" src=\"../images/work/Brooke_Fanto_19760513_3 - brooke fanto.jpg\" alt=\"Design three\">\n            <img class=\"portfolioItems\" src=\"../images/work/Brooke_Fanto_19760513_4 - brooke fanto.jpg\" alt=\"Design four\">\n            <img class=\"portfolioItems\" src=\"../images/work/Brooke_Fanto_19760513_5 - brooke fanto.jpg\" alt=\"Design five\">\n            <img class=\"portfolioItems\" src=\"../images/work/Brooke_Fanto_19760513_6 - brooke fanto.jpg\" alt=\"Design six\">\n          </div>\n        </section>\n      </div>\n      <va-app-footer></va-app-footer>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let student19760513 = _graduateData.Graduates.filter(grad => {
  return grad.studentNumber === "19760513";
});

console.log(student19760513);

class student19760513View {
  init() {
    document.title = "Brooke Fanto";
    this.render();
    console.log(_graduateData.Graduates);
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject(), student19760513[0].avatarOne, student19760513[0].avatarTwo, student19760513[0].major, student19760513[0].firstName, student19760513[0].lastName, student19760513[0].tagLine, student19760513[0].firstName, student19760513[0].bio, student19760513[0].portfolio, student19760513[0].linkedin, student19760513[0].instagram, student19760513[0].dribbble, student19760513[0].artStation, student19760513[0].behance, student19760513[0].twitter, student19760513[0].vimeo, student19760513[0].firstName, student19760513[0].imageOne);
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new student19760513View();

exports.default = _default;
},{"../../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","../../../Router":"Router.js","../../../Utils":"Utils.js","../../../../static/data/graduateData":"../static/data/graduateData.js","lit-element":"../node_modules/lit-element/index.js","../../../components/va-app-footer":"components/va-app-footer.js"}],"views/pages/comingSoon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("../../App"));

var _litHtml = require("lit-html");

var _Router = require("../../Router");

var _Utils = _interopRequireDefault(require("../../Utils"));

var _graduateData = require("../../../static/data/graduateData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n      <div class=\"page-content\">\n      <div class=\"bgimg\">\n  <div class=\"topleft\">\n  </div>\n  <div class=\"middle\">\n  <img class=\"comingSoonLogo\"\n    src=\"./images/DeStoreLogo-02.png\"\n    />\n    <h1>COMING SOON</h1>\n    <hr>\n    <div class=\"timingDiv\">\n    <p id=\"timing\" ></p>\n    </div>\n  </div>\n\n</div>\n        </div>\n\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Graduates.map((graduate) => {
//   console.log(graduate.firstName);
// });
// so now an issue found was when we open the home page, click the about page,
// and then come back to home page, the slider lost its style,
// the temporary ( or maybe this is the only ) solution is use "gotoRoute"
// to force a re-fresh, silly but it works.
class comingSoonView {
  init() {
    console.log("HomeView.init");
    document.title = "Home";
    this.render();

    _Utils.default.pageIntroAnim(); // Set the date we're counting down to


    var countDownDate = new Date("Nov 26, 2021 11:59:59").getTime(); // Update the count down every 1 second

    var x = setInterval(function () {
      // Get todays date and time
      var now = new Date().getTime(); // Find the distance between now an the count down date

      var distance = countDownDate - now; // Time calculations for days, hours, minutes and seconds

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      var seconds = Math.floor(distance % (1000 * 60) / 1000); // Display the result in an element with id="demo"

      document.getElementById("timing").innerHTML = days + " days, " + hours + " hours, " + minutes + " minutes, & " + seconds + " seconds left!"; // If the count down is finished, write some text

      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timing").innerHTML = "🎉 Site launch immminent 🎉";
      }
    }, 1000);
  }

  render() {
    const template = (0, _litHtml.html)(_templateObject());
    (0, _litHtml.render)(template, _App.default.rootEl);
  }

}

var _default = new comingSoonView();

exports.default = _default;
},{"../../App":"App.js","lit-html":"../node_modules/lit-html/lit-html.js","../../Router":"Router.js","../../Utils":"Utils.js","../../../static/data/graduateData":"../static/data/graduateData.js"}],"Router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gotoRoute = gotoRoute;
exports.anchorRoute = anchorRoute;
exports.default = void 0;

var _home = _interopRequireDefault(require("./views/pages/home"));

var _ = _interopRequireDefault(require("./views/pages/404"));

var _about = _interopRequireDefault(require("./views/pages/about"));

var _contact = _interopRequireDefault(require("./views/pages/contact"));

var _viewGraduate = _interopRequireDefault(require("./views/pages/viewGraduate"));

var _graduates = _interopRequireDefault(require("./views/pages/graduates"));

var _digitalGraduates = _interopRequireDefault(require("./views/pages/digitalGraduates"));

var _animationGraduates = _interopRequireDefault(require("./views/pages/animationGraduates"));

var _graphicGraduates = _interopRequireDefault(require("./views/pages/graphicGraduates"));

var _specificProfile = _interopRequireDefault(require("./views/pages/specificProfile"));

var _2 = _interopRequireDefault(require("./views/pages/individuals/19760513"));

var _comingSoon = _interopRequireDefault(require("./views/pages/comingSoon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import views
// to view individual graduates
// define routes
const routes = {
  "/": _home.default,
  "404": _.default,
  "/about": _about.default,
  "/contact": _contact.default,
  "/viewGraduate": _viewGraduate.default,
  // to view individual graduates
  "/graduates": _graduates.default,
  // to view all graduates
  "/digitaldesign": _digitalGraduates.default,
  "/graphicdesign": _graphicGraduates.default,
  "/animationgamedesign": _animationGraduates.default,
  '/graduate': _specificProfile.default,
  "/graduates/19760513": _2.default,
  "/comingsoon": _comingSoon.default
};

class Router {
  constructor() {
    this.routes = routes;
  }

  init() {
    // initial call
    this.route(window.location.pathname); // on back/forward

    window.addEventListener("popstate", () => {
      this.route(window.location.pathname);
    });
  }

  route(fullPathname) {
    // extract path without params
    const pathname = fullPathname.split("?")[0];
    const route = this.routes[pathname];

    if (route) {
      // if route exists, run init() of the view
      this.routes[window.location.pathname].init();
    } else {
      // show 404 view instead
      this.routes["404"].init();
    }
  }

  gotoRoute(pathname) {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    this.route(pathname);
  }

} // create appRouter instance and export


const AppRouter = new Router();
var _default = AppRouter; // programmatically load any route

exports.default = _default;

function gotoRoute(pathname) {
  AppRouter.gotoRoute(pathname);
} // allows anchor <a> links to load routes


function anchorRoute(e) {
  e.preventDefault();
  const pathname = e.target.closest("a").pathname;
  AppRouter.gotoRoute(pathname);
}
},{"./views/pages/home":"views/pages/home.js","./views/pages/404":"views/pages/404.js","./views/pages/about":"views/pages/about.js","./views/pages/contact":"views/pages/contact.js","./views/pages/viewGraduate":"views/pages/viewGraduate.js","./views/pages/graduates":"views/pages/graduates.js","./views/pages/digitalGraduates":"views/pages/digitalGraduates.js","./views/pages/animationGraduates":"views/pages/animationGraduates.js","./views/pages/graphicGraduates":"views/pages/graphicGraduates.js","./views/pages/specificProfile":"views/pages/specificProfile.js","./views/pages/individuals/19760513":"views/pages/individuals/19760513.js","./views/pages/comingSoon":"views/pages/comingSoon.js"}],"App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Router = _interopRequireWildcard(require("./Router"));

var _Toast = _interopRequireDefault(require("./Toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class App {
  constructor() {
    this.name = "Gradshow 2021";
    this.version = "1.0.0";
    this.apiBase = 'http://localhost:3000';
    this.rootEl = document.getElementById("root");
    this.version = "1.0.0";
  }

  init() {
    console.log("App.init"); // Toast init

    _Toast.default.init(); // Router init


    _Router.default.init();
  }

}

var _default = new App();

exports.default = _default;
},{"./Router":"Router.js","./Toast":"Toast.js"}],"../node_modules/lit-html/lib/modify-template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodesFromTemplate = removeNodesFromTemplate;
exports.insertNodeIntoTemplate = insertNodeIntoTemplate;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */

function removeNodesFromTemplate(template, nodesToRemove) {
  const {
    element: {
      content
    },
    parts
  } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let part = parts[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;

  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode; // End removal if stepped past the removing node

    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    } // A node to remove was found in the template


    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node); // Track node we're removing

      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    } // When removing, increment count by which to adjust subsequent part indices


    if (currentRemovingNode !== null) {
      removeCount++;
    }

    while (part !== undefined && part.index === nodeIndex) {
      // If part is in a removed node deactivate it by setting index to -1 or
      // adjust the index as needed.
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      part = parts[partIndex];
    }
  }

  nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
}

const countNodes = node => {
  let count = node.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

  while (walker.nextNode()) {
    count++;
  }

  return count;
};

const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
  for (let i = startIndex + 1; i < parts.length; i++) {
    const part = parts[i];

    if ((0, _template.isTemplatePartActive)(part)) {
      return i;
    }
  }

  return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */


function insertNodeIntoTemplate(template, node, refNode = null) {
  const {
    element: {
      content
    },
    parts
  } = template; // If there's no refNode, then put node at end of template.
  // No part indices need to be shifted in this case.

  if (refNode === null || refNode === undefined) {
    content.appendChild(node);
    return;
  }

  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let insertCount = 0;
  let walkerIndex = -1;

  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;

    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }

    while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
      // If we've inserted the node, simply adjust all subsequent parts
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }

        return;
      }

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
    }
  }
}
},{"./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/shady-render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml.svg;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml.TemplateResult;
  }
});
exports.render = exports.shadyTemplateFactory = void 0;

var _dom = require("./dom.js");

var _modifyTemplate = require("./modify-template.js");

var _render = require("./render.js");

var _templateFactory = require("./template-factory.js");

var _templateInstance = require("./template-instance.js");

var _template = require("./template.js");

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Module to add shady DOM/shady CSS polyfill support to lit-html template
 * rendering. See the [[render]] method for details.
 *
 * @packageDocumentation
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

let compatibleShadyCSSVersion = true;

if (typeof window.ShadyCSS === 'undefined') {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn(`Incompatible ShadyCSS version detected. ` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` + `@webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */


const shadyTemplateFactory = scopeName => result => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);

  let templateCache = _templateFactory.templateCaches.get(cacheKey);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };

    _templateFactory.templateCaches.set(cacheKey, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  }

  const key = result.strings.join(_template.marker);
  template = templateCache.keyString.get(key);

  if (template === undefined) {
    const element = result.getTemplateElement();

    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }

    template = new _template.Template(result, element);
    templateCache.keyString.set(key, template);
  }

  templateCache.stringsArray.set(result.strings, template);
  return template;
};

exports.shadyTemplateFactory = shadyTemplateFactory;
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */

const removeStylesFromLitTemplates = scopeName => {
  TEMPLATE_TYPES.forEach(type => {
    const templates = _templateFactory.templateCaches.get(getTemplateCacheKey(type, scopeName));

    if (templates !== undefined) {
      templates.keyString.forEach(template => {
        const {
          element: {
            content
          }
        } = template; // IE 11 doesn't support the iterable param Set constructor

        const styles = new Set();
        Array.from(content.querySelectorAll('style')).forEach(s => {
          styles.add(s);
        });
        (0, _modifyTemplate.removeNodesFromTemplate)(template, styles);
      });
    }
  });
};

const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */

const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
  shadyRenderSet.add(scopeName); // If `renderedDOM` is stamped from a Template, then we need to edit that
  // Template's underlying template element. Otherwise, we create one here
  // to give to ShadyCSS, which still requires one while scoping.

  const templateElement = !!template ? template.element : document.createElement('template'); // Move styles out of rendered DOM and store.

  const styles = renderedDOM.querySelectorAll('style');
  const {
    length
  } = styles; // If there are no styles, skip unnecessary work

  if (length === 0) {
    // Ensure prepareTemplateStyles is called to support adding
    // styles via `prepareAdoptedCssText` since that requires that
    // `prepareTemplateStyles` is called.
    //
    // ShadyCSS will only update styles containing @apply in the template
    // given to `prepareTemplateStyles`. If no lit Template was given,
    // ShadyCSS will not be able to update uses of @apply in any relevant
    // template. However, this is not a problem because we only create the
    // template for the purpose of supporting `prepareAdoptedCssText`,
    // which doesn't support @apply at all.
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    return;
  }

  const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
  // manipulations will not prevent us from being able to fix up template
  // part indices.
  // NOTE: collecting styles is inefficient for browsers but ShadyCSS
  // currently does this anyway. When it does not, this should be changed.

  for (let i = 0; i < length; i++) {
    const style = styles[i];
    style.parentNode.removeChild(style);
    condensedStyle.textContent += style.textContent;
  } // Remove styles from nested templates in this scope.


  removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
  // `template`.

  const content = templateElement.content;

  if (!!template) {
    (0, _modifyTemplate.insertNodeIntoTemplate)(template, condensedStyle, content.firstChild);
  } else {
    content.insertBefore(condensedStyle, content.firstChild);
  } // Note, it's important that ShadyCSS gets the template that `lit-html`
  // will actually render so that it can update the style inside when
  // needed (e.g. @apply native Shadow DOM case).


  window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
  const style = content.querySelector('style');

  if (window.ShadyCSS.nativeShadow && style !== null) {
    // When in native Shadow DOM, ensure the style created by ShadyCSS is
    // included in initially rendered output (`renderedDOM`).
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else if (!!template) {
    // When no style is left in the template, parts will be broken as a
    // result. To fix this, we put back the style node ShadyCSS removed
    // and then tell lit to remove that node from the template.
    // There can be no style in the template in 2 cases (1) when Shady DOM
    // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
    // is in use ShadyCSS removes the style if it contains no content.
    // NOTE, ShadyCSS creates its own style so we can safely add/remove
    // `condensedStyle` here.
    content.insertBefore(condensedStyle, content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    (0, _modifyTemplate.removeNodesFromTemplate)(template, removes);
  }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */


const render = (result, container, options) => {
  if (!options || typeof options !== 'object' || !options.scopeName) {
    throw new Error('The `scopeName` option is required.');
  }

  const scopeName = options.scopeName;

  const hasRendered = _render.parts.has(container);

  const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  && !!container.host; // Handle first render to a scope specially...

  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
  // fragment that is reused since nested renders can occur synchronously.

  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  (0, _render.render)(result, renderContainer, Object.assign({
    templateFactory: shadyTemplateFactory(scopeName)
  }, options)); // When performing first scope render,
  // (1) We've rendered into a fragment so that there's a chance to
  // `prepareTemplateStyles` before sub-elements hit the DOM
  // (which might cause them to render based on a common pattern of
  // rendering in a custom element's `connectedCallback`);
  // (2) Scope the template with ShadyCSS one time only for this scope.
  // (3) Render the fragment into the container and make sure the
  // container knows its `part` is the one we just rendered. This ensures
  // DOM will be re-used on subsequent renders.

  if (firstScopeRender) {
    const part = _render.parts.get(renderContainer);

    _render.parts.delete(renderContainer); // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
    // that should apply to `renderContainer` even if the rendered value is
    // not a TemplateInstance. However, it will only insert scoped styles
    // into the document if `prepareTemplateStyles` has already been called
    // for the given scope name.


    const template = part.value instanceof _templateInstance.TemplateInstance ? part.value.template : undefined;
    prepareTemplateStyles(scopeName, renderContainer, template);
    (0, _dom.removeNodes)(container, container.firstChild);
    container.appendChild(renderContainer);

    _render.parts.set(container, part);
  } // After elements have hit the DOM, update styling if this is the
  // initial render to this container.
  // This is needed whenever dynamic changes are made so it would be
  // safest to do every render; however, this would regress performance
  // so we leave it up to the user to call `ShadyCSS.styleElement`
  // for dynamic changes.


  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};

exports.render = render;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./modify-template.js":"../node_modules/lit-html/lib/modify-template.js","./render.js":"../node_modules/lit-html/lib/render.js","./template-factory.js":"../node_modules/lit-html/lib/template-factory.js","./template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./template.js":"../node_modules/lit-html/lib/template.js","../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/@polymer/lit-element/lib/updating-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatingElement = exports.notEqual = exports.defaultConverter = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
const JSCompiler_renameProperty = (prop, _obj) => prop;
/**
 * Returns the property descriptor for a property on this prototype by walking
 * up the prototype chain. Note that we stop just before Object.prototype, which
 * also avoids issues with Symbol polyfills (core-js, get-own-property-symbols),
 * which create accessors for the symbols on Object.prototype.
 */


const descriptorFromPrototype = (name, proto) => {
  if (name in proto) {
    while (proto !== Object.prototype) {
      if (proto.hasOwnProperty(name)) {
        return Object.getOwnPropertyDescriptor(proto, name);
      }

      proto = Object.getPrototypeOf(proto);
    }
  }

  return undefined;
};

const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? '' : null;

      case Object:
      case Array:
        // if the value is `null` or `undefined` pass this through
        // to allow removing/no change behavior.
        return value == null ? value : JSON.stringify(value);
    }

    return value;
  },

  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;

      case Number:
        return value === null ? null : Number(value);

      case Object:
      case Array:
        return JSON.parse(value);
    }

    return value;
  }

};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */

exports.defaultConverter = defaultConverter;

const notEqual = (value, old) => {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};

exports.notEqual = notEqual;
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const microtaskPromise = Promise.resolve(true);
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
const STATE_HAS_CONNECTED = 1 << 5;
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */

class UpdatingElement extends HTMLElement {
  constructor() {
    super();
    this._updateState = 0;
    this._instanceProperties = undefined;
    this._updatePromise = microtaskPromise;
    this._hasConnectedResolver = undefined;
    /**
     * Map with keys for any properties that have changed since the last
     * update cycle with previous values.
     */

    this._changedProperties = new Map();
    /**
     * Map with keys of properties that should be reflected when updated.
     */

    this._reflectingProperties = undefined;
    this.initialize();
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */


  static get observedAttributes() {
    // note: piggy backing on this to ensure we're _finalized.
    this._finalize();

    const attributes = [];

    for (const [p, v] of this._classProperties) {
      const attr = this._attributeNameForProperty(p, v);

      if (attr !== undefined) {
        this._attributeToPropertyMap.set(attr, p);

        attributes.push(attr);
      }
    }

    return attributes;
  }
  /**
   * Ensures the private `_classProperties` property metadata is created.
   * In addition to `_finalize` this is also called in `createProperty` to
   * ensure the `@property` decorator can add property metadata.
   */

  /** @nocollapse */


  static _ensureClassProperties() {
    // ensure private storage for property declarations.
    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
      this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

      const superProperties = Object.getPrototypeOf(this)._classProperties;

      if (superProperties !== undefined) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   * @nocollapse
   */


  static createProperty(name, options = defaultPropertyDeclaration) {
    // Note, since this can be called by the `@property` decorator which
    // is called before `_finalize`, we ensure storage exists for property
    // metadata.
    this._ensureClassProperties();

    this._classProperties.set(name, options);

    if (!options.noAccessor) {
      const superDesc = descriptorFromPrototype(name, this.prototype);
      let desc; // If there is a super accessor, capture it and "super" to it

      if (superDesc !== undefined && superDesc.set && superDesc.get) {
        const {
          set,
          get
        } = superDesc;
        desc = {
          get() {
            return get.call(this);
          },

          set(value) {
            const oldValue = this[name];
            set.call(this, value);
            this.requestUpdate(name, oldValue);
          },

          configurable: true,
          enumerable: true
        };
      } else {
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        desc = {
          get() {
            return this[key];
          },

          set(value) {
            const oldValue = this[name];
            this[key] = value;
            this.requestUpdate(name, oldValue);
          },

          configurable: true,
          enumerable: true
        };
      }

      Object.defineProperty(this.prototype, name, desc);
    }
  }
  /**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   * @nocollapse
   */


  static _finalize() {
    if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) && this.finalized) {
      return;
    } // finalize any superclasses


    const superCtor = Object.getPrototypeOf(this);

    if (typeof superCtor._finalize === 'function') {
      superCtor._finalize();
    }

    this.finalized = true;

    this._ensureClassProperties(); // initialize Map populated in observedAttributes


    this._attributeToPropertyMap = new Map(); // make any properties
    // Note, only process "own" properties since this element will inherit
    // any properties defined on the superClass, and finalization ensures
    // the entire prototype chain is finalized.

    if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
      const props = this.properties; // support symbols in properties (IE11 does not support this)

      const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])];

      for (const p of propKeys) {
        // note, use of `any` is due to TypeSript lack of support for symbol in
        // index types
        this.createProperty(p, props[p]);
      }
    }
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */


  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
  }
  /**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   * @nocollapse
   */


  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  /**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's
   * `converter` or `converter.fromAttribute` property option.
   * @nocollapse
   */


  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  /**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   * @nocollapse
   */


  static _propertyValueToAttribute(value, options) {
    if (options.reflect === undefined) {
      return;
    }

    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  /**
   * Performs element initialization. By default captures any pre-set values for
   * registered properties.
   */


  initialize() {
    this._saveInstanceProperties();
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */


  _saveInstanceProperties() {
    for (const [p] of this.constructor._classProperties) {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];

        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }

        this._instanceProperties.set(p, value);
      }
    }
  }
  /**
   * Applies previously saved instance properties.
   */


  _applyInstanceProperties() {
    for (const [p, v] of this._instanceProperties) {
      this[p] = v;
    }

    this._instanceProperties = undefined;
  }

  connectedCallback() {
    this._updateState = this._updateState | STATE_HAS_CONNECTED; // Ensure connection triggers an update. Updates cannot complete before
    // connection and if one is pending connection the `_hasConnectionResolver`
    // will exist. If so, resolve it to complete the update, otherwise
    // requestUpdate.

    if (this._hasConnectedResolver) {
      this._hasConnectedResolver();

      this._hasConnectedResolver = undefined;
    } else {
      this.requestUpdate();
    }
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */


  disconnectedCallback() {}
  /**
   * Synchronizes property values when attributes change.
   */


  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }

  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;

    const attr = ctor._attributeNameForProperty(name, options);

    if (attr !== undefined) {
      const attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


      if (attrValue === undefined) {
        return;
      } // Track if the property is being reflected to avoid
      // setting the property again via `attributeChangedCallback`. Note:
      // 1. this takes advantage of the fact that the callback is synchronous.
      // 2. will behave incorrectly if multiple attributes are in the reaction
      // stack at time of calling. However, since we process attributes
      // in `update` this should not be possible (or an extreme corner case
      // that we'd like to discover).
      // mark state reflecting


      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      } // mark state not reflecting


      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }

  _attributeToProperty(name, value) {
    // Use tracking info to avoid deserializing attribute value if it was
    // just set from a property setter.
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }

    const ctor = this.constructor;

    const propName = ctor._attributeToPropertyMap.get(name);

    if (propName !== undefined) {
      const options = ctor._classProperties.get(propName) || defaultPropertyDeclaration; // mark state reflecting

      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */


  requestUpdate(name, oldValue) {
    let shouldRequestUpdate = true; // if we have a property key, perform property update steps.

    if (name !== undefined && !this._changedProperties.has(name)) {
      const ctor = this.constructor;
      const options = ctor._classProperties.get(name) || defaultPropertyDeclaration;

      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        // track old value when changing.
        this._changedProperties.set(name, oldValue); // add to reflecting properties set


        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === undefined) {
            this._reflectingProperties = new Map();
          }

          this._reflectingProperties.set(name, options);
        } // abort the request if the property should not be considered changed.

      } else {
        shouldRequestUpdate = false;
      }
    }

    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._enqueueUpdate();
    }

    return this.updateComplete;
  }
  /**
   * Sets up the element to asynchronously update.
   */


  async _enqueueUpdate() {
    // Mark state updating...
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
    let resolve;
    const previousUpdatePromise = this._updatePromise;
    this._updatePromise = new Promise(res => resolve = res); // Ensure any previous update has resolved before updating.
    // This `await` also ensures that property changes are batched.

    await previousUpdatePromise; // Make sure the element has connected before updating.

    if (!this._hasConnected) {
      await new Promise(res => this._hasConnectedResolver = res);
    } // Allow `performUpdate` to be asynchronous to enable scheduling of updates.


    const result = this.performUpdate(); // Note, this is to avoid delaying an additional microtask unless we need
    // to.

    if (result != null && typeof result.then === 'function') {
      await result;
    }

    resolve(!this._hasRequestedUpdate);
  }

  get _hasConnected() {
    return this._updateState & STATE_HAS_CONNECTED;
  }

  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }

  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  /**
   * Performs an element update.
   *
   * You can override this method to change the timing of updates. For instance,
   * to schedule updates to occur just before the next frame:
   *
   * ```
   * protected async performUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.performUpdate();
   * }
   * ```
   */


  performUpdate() {
    // Mixin instance properties once, if they exist.
    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }

    if (this.shouldUpdate(this._changedProperties)) {
      const changedProperties = this._changedProperties;
      this.update(changedProperties);

      this._markUpdated();

      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }

      this.updated(changedProperties);
    } else {
      this._markUpdated();
    }
  }

  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. This getter can be implemented to
   * await additional state. For example, it is sometimes useful to await a
   * rendered element before fulfilling this Promise. To do this, first await
   * `super.updateComplete` then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */


  get updateComplete() {
    return this._updatePromise;
  }
  /**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  update(_changedProperties) {
    if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
      for (const [k, v] of this._reflectingProperties) {
        this._propertyToAttribute(k, this[k], v);
      }

      this._reflectingProperties = undefined;
    }
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  updated(_changedProperties) {}
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  firstUpdated(_changedProperties) {}

}
/**
 * Marks class as having finished creating properties.
 */


exports.UpdatingElement = UpdatingElement;
UpdatingElement.finalized = true;
},{}],"../node_modules/@polymer/lit-element/lib/decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventOptions = exports.queryAll = exports.query = exports.property = exports.customElement = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
  window.customElements.define(tagName, clazz); // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.

  return clazz;
};

const standardCustomElement = (tagName, descriptor) => {
  const {
    kind,
    elements
  } = descriptor;
  return {
    kind,
    elements,

    // This callback is called once the class is otherwise fully defined
    finisher(clazz) {
      window.customElements.define(tagName, clazz);
    }

  };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * @param tagName the name of the custom element to define
 *
 * In TypeScript, the `tagName` passed to `customElement` should be a key of the
 * `HTMLElementTagNameMap` interface. To add your element to the interface,
 * declare the interface in this module:
 *
 *     @customElement('my-element')
 *     export class MyElement extends LitElement {}
 *
 *     declare global {
 *       interface HTMLElementTagNameMap {
 *         'my-element': MyElement;
 *       }
 *     }
 *
 */


const customElement = tagName => classOrDescriptor => typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);

exports.customElement = customElement;

const standardProperty = (options, element) => {
  // createProperty() takes care of defining the property, but we still must
  // return some kind of descriptor, so return a descriptor for an unused
  // prototype field. The finisher calls createProperty().
  return {
    kind: 'field',
    key: Symbol(),
    placement: 'own',
    descriptor: {},

    // When @babel/plugin-proposal-decorators implements initializers,
    // do this instead of the initializer below. See:
    // https://github.com/babel/babel/issues/9260 extras: [
    //   {
    //     kind: 'initializer',
    //     placement: 'own',
    //     initializer: descriptor.initializer,
    //   }
    // ],
    initializer() {
      if (typeof element.initializer === 'function') {
        this[element.key] = element.initializer.call(this);
      }
    },

    finisher(clazz) {
      clazz.createProperty(element.key, options);
    }

  };
};

const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A `PropertyDeclaration` may optionally be
 * supplied to configure property features.
 */


const property = options => (protoOrDescriptor, name) => name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 */


exports.property = property;

const query = _query((target, selector) => target.querySelector(selector));
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 */


exports.query = query;

const queryAll = _query((target, selector) => target.querySelectorAll(selector));

exports.queryAll = queryAll;

const legacyQuery = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};

const standardQuery = (descriptor, element) => ({
  kind: 'method',
  placement: 'prototype',
  key: element.key,
  descriptor
});
/**
 * Base-implementation of `@query` and `@queryAll` decorators.
 *
 * @param queryFn exectute a `selector` (ie, querySelector or querySelectorAll)
 * against `target`.
 */


function _query(queryFn) {
  return selector => (protoOrDescriptor, name) => {
    const descriptor = {
      get() {
        return queryFn(this.renderRoot, selector);
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}

const standardEventOptions = (options, element) => {
  return Object.assign({}, element, {
    finisher(clazz) {
      Object.assign(clazz.prototype[element.key], options);
    }

  });
};

const legacyEventOptions = (options, proto, name) => {
  Object.assign(proto[name], options);
};
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifis event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 *
 *     class MyElement {
 *
 *       clicked = false;
 *
 *       render() {
 *         return html`<div @click=${this._onClick}`><button></button></div>`;
 *       }
 *
 *       @eventOptions({capture: true})
 *       _onClick(e) {
 *         this.clicked = true;
 *       }
 *     }
 */


const eventOptions = options => // Return value typed as any to prevent TypeScript from complaining that
// standard decorator function signature does not match TypeScript decorator
// signature
// TODO(kschaaf): unclear why it was only failing on this decorator and not
// the others
(protoOrDescriptor, name) => name !== undefined ? legacyEventOptions(options, protoOrDescriptor, name) : standardEventOptions(options, protoOrDescriptor);

exports.eventOptions = eventOptions;
},{}],"../node_modules/@polymer/lit-element/lib/css-tag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = exports.CSSResult = exports.supportsAdoptingStyleSheets = void 0;

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const supportsAdoptingStyleSheets = ('adoptedStyleSheets' in Document.prototype);
exports.supportsAdoptingStyleSheets = supportsAdoptingStyleSheets;

class CSSResult {
  constructor(cssText) {
    this.cssText = cssText;
  } // Note, this is a getter so that it's lazy. In practice, this means
  // stylesheets are not created until the first element instance is made.


  get styleSheet() {
    if (this._styleSheet === undefined) {
      // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
      // is constructable.
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();

        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }

    return this._styleSheet;
  }

}

exports.CSSResult = CSSResult;

const textFromCSSResult = value => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}.`);
  }
};

const css = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText);
};

exports.css = css;
},{}],"../node_modules/@polymer/lit-element/lit-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  html: true,
  svg: true,
  TemplateResult: true,
  SVGTemplateResult: true
};
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml2.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml2.svg;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml2.TemplateResult;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml2.SVGTemplateResult;
  }
});
exports.LitElement = void 0;

var _litHtml = require("lit-html");

var _shadyRender = require("lit-html/lib/shady-render");

var _updatingElement = require("./lib/updating-element.js");

Object.keys(_updatingElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _updatingElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updatingElement[key];
    }
  });
});

var _decorators = require("./lib/decorators.js");

Object.keys(_decorators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _decorators[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _decorators[key];
    }
  });
});

var _litHtml2 = require("lit-html/lit-html");

var _cssTag = require("./lib/css-tag.js");

Object.keys(_cssTag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cssTag[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cssTag[key];
    }
  });
});

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class LitElement extends _updatingElement.UpdatingElement {
  /**
   * Array of styles to apply to the element. The styles should be defined
   * using the `css` tag function.
   */
  static get styles() {
    return [];
  }

  static get _uniqueStyles() {
    if (this._styles === undefined) {
      const styles = this.styles; // As a performance optimization to avoid duplicated styling that can
      // occur especially when composing via subclassing, de-duplicate styles
      // preserving the last item in the list. The last item is kept to
      // try to preserve cascade order with the assumption that it's most
      // important that last added styles override previous styles.

      const styleSet = styles.reduceRight((set, s) => {
        set.add(s); // on IE set.add does not return the set.

        return set;
      }, new Set()); // Array.form does not work on Set in IE

      this._styles = [];
      styleSet.forEach(v => this._styles.unshift(v));
    }

    return this._styles;
  }
  /**
   * Performs element initialization. By default this calls `createRenderRoot`
   * to create the element `renderRoot` node and captures any pre-set values for
   * registered properties.
   */


  initialize() {
    super.initialize();
    this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
    // element's getRootNode(). While this could be done, we're choosing not to
    // support this now since it would require different logic around de-duping.

    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */


  createRenderRoot() {
    return this.attachShadow({
      mode: 'open'
    });
  }
  /**
   * Applies styling to the element shadowRoot using the `static get styles`
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */


  adoptStyles() {
    const styles = this.constructor._uniqueStyles;

    if (styles.length === 0) {
      return;
    } // There are three separate cases here based on Shadow DOM support.
    // (1) shadowRoot polyfilled: use ShadyCSS
    // (2) shadowRoot.adoptedStyleSheets available: use it.
    // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
    // rendering


    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s => s.cssText), this.localName);
    } else if (_cssTag.supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map(s => s.styleSheet);
    } else {
      // This must be done after rendering so the actual style insertion is done
      // in `update`.
      this._needsShimAdoptedStyleSheets = true;
    }
  }

  connectedCallback() {
    super.connectedCallback(); // Note, first update/render handles styleElement so we only call this if
    // connected after first update.

    if (this.hasUpdated && window.ShadyCSS !== undefined) {
      window.ShadyCSS.styleElement(this);
    }
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * * @param _changedProperties Map of changed properties with old values
   */


  update(changedProperties) {
    super.update(changedProperties);
    const templateResult = this.render();

    if (templateResult instanceof _litHtml.TemplateResult) {
      this.constructor.render(templateResult, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      });
    } // When native Shadow DOM is used but adoptedStyles are not supported,
    // insert styling after rendering to ensure adoptedStyles have highest
    // priority.


    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;

      this.constructor._uniqueStyles.forEach(s => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */


  render() {}

}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 */


exports.LitElement = LitElement;
LitElement.finalized = true;
/**
 * Render method used to render the lit-html TemplateResult to the element's
 * DOM.
 * @param {TemplateResult} Template to render.
 * @param {Element|DocumentFragment} Node into which to render.
 * @param {String} Element name.
 * @nocollapse
 */

LitElement.render = _shadyRender.render;
},{"lit-html":"../node_modules/lit-html/lit-html.js","lit-html/lib/shady-render":"../node_modules/lit-html/lib/shady-render.js","./lib/updating-element.js":"../node_modules/@polymer/lit-element/lib/updating-element.js","./lib/decorators.js":"../node_modules/@polymer/lit-element/lib/decorators.js","lit-html/lit-html":"../node_modules/lit-html/lit-html.js","./lib/css-tag.js":"../node_modules/@polymer/lit-element/lib/css-tag.js"}],"components/va-app-header.js":[function(require,module,exports) {
"use strict";

var _litElement = require("@polymer/lit-element");

var _Router = require("../Router");

var _App = _interopRequireDefault(require("./../App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n        <style>\n          * {\n            box-sizing: border-box;\n          }\n          .app-header {\n            background: var(--sl-color-white);\n            position: fixed;\n            top: 0;\n            right: 0;\n            left: 0;\n            height: var(--app-header-height);\n            color: #fff;\n            display: flex;\n            z-index: 9;\n            box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.2);\n            align-items: center;\n          }\n\n          .app-logo a {\n            color: #fff;\n            text-decoration: none;\n            font-weight: bold;\n            font-size: 1.2em;\n            padding: 0.6em;\n            display: inline-block;\n          }\n\n          .app-logo img {\n            width: 90px;\n          }\n\n          .headerLogo{\n            margin-bottom: 30px;\n            width: 120px;\n            margin-bottom: 1em;\n            position: absolute;\n            top: 0.8em;\n            left: 1.5em;\n          }\n\n          .headerLogo:hover{\n            cursor: pointer;\n            filter: saturate(1);\n          }\n\n          .mobileLogoHolder {\n            display:none;\n          }\n\n          .hamburger-btn::part(base) {\n            color: #e24130;\n            display: none;\n          }\n\n          .app-top-nav {\n            display: flex;\n            height: 100%;\n            align-items: center;\n            justify-content: space-between;\n            width: 100%;\n          }\n\n          .home-btn:hover{\n            cursor: pointer;\n          }\n\n          .logo-container {\n            width: 200px;\n            height: var(--app-header-height);\n            align-self: flex-end;\n          }\n\n          .app-top-nav a {\n            display: inline-block;\n            padding: 0.8em;\n            text-decoration: none;\n            color: black;\n          }\n\n          .app-side-menu-items a {\n            display: block;\n            padding: 0.5em;\n            text-decoration: none;\n            font-size: 1.3em;\n            color: #333;\n          }\n\n          .app-side-menu-logo {\n            width: 120px;\n            margin-bottom: 1em;\n            position: absolute;\n            top: 2em;\n            left: 1.5em;\n          }\n\n          .page-title {\n            color: var(--app-header-txt-color);\n            margin-right: 0.5em;\n            font-size: var(--app-header-title-font-size);\n          }\n\n          header > nav > div.links > a {\n            margin-left: 1rem;\n            margin-right: 1rem;\n            min-width: 100px;\n            text-align: center;\n          }\n\n          header > nav > div.links > a:hover {\n            color: var(--brand-color);\n          }\n\n          header > nav > div.links > sl-dropdown > a:hover {\n            color: var(--brand-color);\n          }\n\n          header > nav > div.links > sl-dropdown > a:focus-within {\n            font-weight: bold;\n            color: var(--brand-color);\n            border: 1px var(--brand-color) solid;\n          }\n\n          /* active nav links */\n          .app-top-nav a.active,\n          .app-side-menu-items a.active {\n            font-weight: bold;\n            color: var(--brand-color);\n            border: 1px var(--brand-color) solid;\n          }\n\n          /* RESPONSIVE - MOBILE ------------------- */\n          @media all and (max-width: 768px) {\n            .app-top-nav {\n              display: none;\n            }\n\n            .mobileLogoHolder {\n              width: 50%;\n              margin-left: 50%;\n              position:absolute;\n              display: flex;\n              justify-content: flex-end;\n            }\n  \n            .mobileHeaderLogo{\n              width: 120px;\n              margin-right: 1.5em;\n            }\n  \n            .mobileHeaderLogo:hover{\n              cursor: pointer;\n              filter: saturate(1);\n            }\n\n            .hamburger-btn::part(base) {\n              display: flex;\n            }\n          }\n        </style>\n\n        <header class=\"app-header\">\n          <!-- This is the hamburger button on the top left -->\n          <sl-icon-button\n            class=\"hamburger-btn\"\n            name=\"list\"\n            @click=\"", "\"\n            style=\"font-size: 1.5em;\"\n          ></sl-icon-button>\n          <div class=\"mobileLogoHolder\">\n            <img @click=\"", "\" class=\"mobileHeaderLogo\" src=\"/images/logo.png\" />\n          </div> \n\n          <nav class=\"app-top-nav\">\n            <div class=\"links\">\n              <a>\n                <img @click=\"", "\" class=\"headerLogo\" src=\"/images/logo.png\" />\n              </a> \n              <a class=\"home-btn\" @click=\"", "\">Home</a>\n              <sl-dropdown>\n                <a\n                  slot=\"trigger\"\n                  href=\"#\"\n                  @click=\"", "\"\n                  caret\n                >\n                  Graduates\n                  <sl-icon\n                    style=\"font-size:0.6rem\"\n                    name=\"chevron-down\"\n                  ></sl-icon>\n                </a>\n                <sl-menu>\n                  <sl-menu-item @click=\"", "\"\n                    >All Graduates</sl-menu-item\n                  >\n                  <sl-menu-item\n                    @click=\"", "\"\n                    >Animation and Game Design</sl-menu-item\n                  >\n                  <sl-menu-item\n                    @click=\"", "\"\n                    >Digital Design</sl-menu-item\n                  >\n                  <sl-menu-item\n                    @click=\"", "\"\n                    >Graphic Design</sl-menu-item\n                  >\n                </sl-menu>\n              </sl-dropdown>\n              <a class=\"home-btn\" @click=\"", "\">About</a>\n            </div>\n          </nav>\n        </header>\n\n        <sl-drawer class=\"app-side-menu\" placement=\"left\">\n          <img class=\"app-side-menu-logo\" src=\"/images/logo.png\" />\n          <nav class=\"app-side-menu-items\">\n            <a href=\"/\" @click=\"", "\">Home</a>\n            <a href=\"/graduates\" @click=\"", "\">Graduates</a>\n            <a href=\"/about\" @click=\"", "\">About</a>\n          </nav>\n        </sl-drawer>\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

customElements.define("va-app-header", class AppHeader extends _litElement.LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    };
  }

  firstUpdated() {
    super.firstUpdated();
    this.navActiveLinks();
  }

  navActiveLinks() {
    const currentPath = window.location.pathname;
    console.log(currentPath);
    const navLinks = this.shadowRoot.querySelectorAll(".app-top-nav a, .app-side-menu-items a");
    navLinks.forEach(navLink => {
      if (navLink.href.slice(-1) == "#") return;

      if (navLink.pathname === currentPath) {
        navLink.classList.add("active");
      }
    });
  }

  hamburgerClick() {
    const appMenu = this.shadowRoot.querySelector(".app-side-menu");
    appMenu.show();
  }

  menuClick(e) {
    e.preventDefault();
    const pathname = e.target.closest("a").pathname;
    const appSideMenu = this.shadowRoot.querySelector(".app-side-menu"); // hide appMenu

    appSideMenu.hide();
    appSideMenu.addEventListener("sl-after-hide", () => {
      // goto route after menu is hidden
      (0, _Router.gotoRoute)(pathname);
    });
  }

  render() {
    return (0, _litElement.html)(_templateObject(), this.hamburgerClick, () => (0, _Router.gotoRoute)("/"), () => (0, _Router.gotoRoute)("/"), () => (0, _Router.gotoRoute)("/"), e => e.preventDefault(), () => (0, _Router.gotoRoute)("/graduates"), () => (0, _Router.gotoRoute)("/animationgamedesign"), () => (0, _Router.gotoRoute)("/digitaldesign"), () => (0, _Router.gotoRoute)("/graphicdesign"), () => (0, _Router.gotoRoute)("/about"), this.menuClick, this.menuClick, this.menuClick);
  }

});
},{"@polymer/lit-element":"../node_modules/@polymer/lit-element/lit-element.js","../Router":"Router.js","./../App":"App.js"}],"UserAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./App"));

var _Toast = _interopRequireDefault(require("./Toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAPI {
  async getUser(userId) {
    // validate
    if (!userId) return; // fetch the json data

    const response = await fetch("".concat(_App.default.apiBase, "/user/").concat(userId), {
      headers: {
        "Authorization": "Bearer ".concat(localStorage.accessToken)
      }
    }); // if response not ok

    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err); // throw error (exit this function)      

      throw new Error('Problem getting user');
    } // convert response payload into json - store as data


    const data = await response.json(); // return data

    return data;
  }

}

var _default = new UserAPI();

exports.default = _default;
},{"./App":"App.js","./Toast":"Toast.js"}],"components/va-graduates.js":[function(require,module,exports) {
"use strict";

var _litElement = require("@polymer/lit-element");

var _litHtml = require("lit-html");

var _Router = require("./../Router");

var _Auth = _interopRequireDefault(require("./../Auth"));

var _App = _interopRequireDefault(require("./../App"));

var _UserAPI = _interopRequireDefault(require("./../UserAPI"));

var _Toast = _interopRequireDefault(require("./../Toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject3() {
  const data = _taggedTemplateLiteral(["\n        <style>\n          button {\n            height: 50px;\n            width: calc(50% - 2em);\n            background-color: transparent;\n            color: black;\n            font-size: 15px;\n            border: 1px solid black;\n            border-radius: 10px;\n            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n          }\n\n          .gradListingAvatar{\n            position: absolute;\n            max-height: 360px;\n            cursor: grab;\n            overflow: hidden;\n            display: flex;\n          }\n\n          .gradListingAvatarTwo{\n            position: absolute;\n            max-height: 360px;\n            cursor: grab;\n            overflow: hidden;\n            display: flex;\n          }\n\n          .gradListingAvatarTwo:hover{\n            opacity: 0;\n            transition: ease-in-out 0.1s;\n          }\n\n          .gradListingAvatarTwo:not(:hover){\n            opacity: 1;\n            transition: ease-in-out 0.1s;\n          }\n\n          .view-employee-button {\n            background-color: var(--brand-color);\n            color: white;\n            border: none;\n          }\n\n          button:hover {\n            cursor: pointer;\n            box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;\n            transition: ease-in-out 0.3s;\n            border: none;\n            color: white;\n          }\n          button:not(:hover){\n            color: white;\n            transition: ease-in-out 0.3s;\n          }\n\n          h3,\n          p {\n            margin: 0 auto;\n            padding: 0;\n          }\n\n          h3 {\n            font-size: 27px;\n          }\n\n          p {\n            font-size: 18px;\n          }\n\n          .image-container {\n            position: relative;\n            width: 100%;\n            min-height: 350px;\n            overflow: hidden;\n            text-align: center;\n            margin: auto;\n\n            display: flex;\n            justify-content: center;\n\n            border-bottom: 0px solid black;\n            /* easing the hover transition */\n            transition: 0.3s;\n          }\n\n          /* hover effect */\n          /* .image-container:hover {\n            background-image: url(\"", "/images/", "\") !important;\n            cursor: pointer;\n          } */\n\n          .text-container {\n            height: 200px;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: space-evenly;\n          }\n\n          .buttons-container {\n            display: flex;\n            justify-content: space-evenly;\n            width: 100%;\n          }\n        </style>\n\n        <!-- delete placeholder text when the real data is used -->\n   \n          <div class=\"image-container\" >  \n          <img loading=\"eager\" class=\"gradListingAvatar\" src=\"", "\"  onerror=\"this.src='/images/graduateBags/_DSC1414.jpg';\">\n          <img @click=\"", "\"  loading=\"eager\" class=\"gradListingAvatarTwo\" src=\"", "\" onerror=\"this.src='/images/graduateBags/_DSC1417.jpg';\">\n          </div>\n \n          <div class=\"text-container\">\n            <h3>", " ", "</h3>\n            <i><p>", "</p></i>\n            <div class=\"buttons-container\">\n              ", "\n              ", "\n              <!-- format of the link 'https://www.google.com' -->\n            </div>\n          </div>\n        </div>\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n        <button\n          class=\"view-employee-button\"\n          @click=\"", "\"\n        >\n        Portfolio\n        </button>\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n        <button\n          class=\"view-employee-button\"\n          @click=", ">\n        \n        View Employee\n        </button>\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

customElements.define("va-graduates", class Graduate extends _litElement.LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      studentNumber: {},
      firstName: {},
      lastName: {},
      major: {},
      email: {},
      avatarOne: {},
      tagLine: {},
      bio: {},
      artStation: {},
      behance: {},
      dribbble: {},
      instagram: {},
      linkedin: {},
      twitter: {},
      vimeo: {},
      portfolio: {},
      avatarTwo: {},
      avatarOneHQ: {},
      avatarTwoHQ: {}
    };
  }

  firstUpdated() {
    super.firstUpdated();
  } // go to single page for each clicked graduate


  employeeHandler() {
    return (0, _litElement.html)(_templateObject(), () => (0, _Router.gotoRoute)("/graduate?id=".concat(this.studentNumber)));
  } // portfolio link handler


  portfolioHandler() {
    return (0, _litElement.html)(_templateObject2(), () => window.open(this.portfolio, '_blank').focus());
  }

  render() {
    return (0, _litElement.html)(_templateObject3(), _App.default.apiBase, this.quirkyPhoto, this.avatarOneHQ, () => (0, _Router.gotoRoute)("/graduate?id=" + this.studentNumber), this.avatarTwoHQ, this.firstName, this.lastName, this.tagLine, this.employeeHandler(), this.portfolioHandler());
  }

});
},{"@polymer/lit-element":"../node_modules/@polymer/lit-element/lit-element.js","lit-html":"../node_modules/lit-html/lit-html.js","./../Router":"Router.js","./../Auth":"Auth.js","./../App":"App.js","./../UserAPI":"UserAPI.js","./../Toast":"Toast.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/master.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../../static/fonts/DeStoreFonts/MarkSimonson-ProximaNovaRegular.otf":[["MarkSimonson-ProximaNovaRegular.aa2a2292.otf","../static/fonts/DeStoreFonts/MarkSimonson-ProximaNovaRegular.otf"],"../static/fonts/DeStoreFonts/MarkSimonson-ProximaNovaRegular.otf"],"./../../static/fonts/DeStoreFonts/MilkmanRegular.ttf":[["MilkmanRegular.abbb0ba7.ttf","../static/fonts/DeStoreFonts/MilkmanRegular.ttf"],"../static/fonts/DeStoreFonts/MilkmanRegular.ttf"],"./../../static/fonts/DeStoreFonts/MonoSpec-Bold.otf":[["MonoSpec-Bold.a512cabb.otf","../static/fonts/DeStoreFonts/MonoSpec-Bold.otf"],"../static/fonts/DeStoreFonts/MonoSpec-Bold.otf"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _App = _interopRequireDefault(require("./App.js"));

require("./components/va-app-header");

require("./components/va-graduates");

require("./scss/master.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// components (custom web components)
// These are in frontend/src/components
// styles
// app.init
document.addEventListener("DOMContentLoaded", () => {
  _App.default.init();
});
},{"./App.js":"App.js","./components/va-app-header":"components/va-app-header.js","./components/va-graduates":"components/va-graduates.js","./scss/master.scss":"scss/master.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51244" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map