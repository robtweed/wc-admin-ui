/*

 ----------------------------------------------------------------------------
 | admin-ui: SB2-Admin UI Theme WebComponents Library                        |
 |                                                                           |
 | Copyright (c) 2020 M/Gateway Developments Ltd,                            |
 | Redhill, Surrey UK.                                                       |
 | All rights reserved.                                                      |
 |                                                                           |
 | http://www.mgateway.com                                                   |
 | Email: rtweed@mgateway.com                                                |
 |                                                                           |
 |                                                                           |
 | Licensed under the Apache License, Version 2.0 (the "License");           |
 | you may not use this file except in compliance with the License.          |
 | You may obtain a copy of the License at                                   |
 |                                                                           |
 |     http://www.apache.org/licenses/LICENSE-2.0                            |
 |                                                                           |
 | Unless required by applicable law or agreed to in writing, software       |
 | distributed under the License is distributed on an "AS IS" BASIS,         |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  |
 | See the License for the specific language governing permissions and       |
 |  limitations under the License.                                           |
 ----------------------------------------------------------------------------

 13 March 2020

*/

export function load() {

  let componentName = 'adminui-jsdb-viewer';
  let counter = -1;
  let id_prefix = componentName + '-';
  let getJSdbData;

  class adminui_jsdb_viewer extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<style>
/* Remove default bullets */
ul, #myUL {
  list-style-type: none;
  margin-right: 25px;
}

/* Remove margins and padding from the parent ul */
#myUL {
  margin: 0;
  padding: 0;
}

/* Style the caret/arrow */
.caret {
  cursor: pointer;
  user-select: none; /* Prevent text selection */
}

/* Create the caret/arrow with a unicode, and style it */
.caret::before {
  content: "\\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

/* Rotate the caret/arrow icon when clicked on (using JavaScript) */
.caret-down::before {
  transform: rotate(90deg);
}

/* Hide the nested list */
.nested {
  display: none;
}

/* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
.active {
  display: block;
}
</style>
<ul id="${id}"></ul>
      `;
      this.html = `${html}`;
    }

    addClass(cls) {
      this.rootElement.classList.add(cls);
    }

    removeClass(cls) {
      this.rootElement.classList.remove(cls);
    }

    addChildValues(li, documentName, data) {
      let ul = document.createElement('ul');
      ul.className = 'nested';
      let _this = this;
      data.forEach(function(item) {
        if (item.name) {
          let childli = document.createElement('li');
          if (item.noOfChildren) {
            let span = document.createElement('span');
            span.className = 'caret';
            span.textContent = item.name + ' (' + item.noOfChildren + ' items)';

            let clicked = false;
            let fn = function() {
              if (clicked) {
                childli.querySelector(".nested").classList.toggle("active");
                span.classList.toggle("caret-down");
                return;
              }
              getJSdbData(documentName, item.path, function(responseObj) {
                _this.addChildValues(childli, documentName, responseObj.message.results);
              });
              clicked = true;
            };
            _this.addHandler(fn, span);
            childli.appendChild(span);
          }
          else {
            let value = item.name;
            if (item.value) value = value + ': ' + item.value;
            childli.textContent = value;
          }
          ul.appendChild(childli);
        }
      });
      li.appendChild(ul);
      ul.classList.toggle('active');
      li.querySelector('span').classList.toggle('caret-down');
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.initial) {
        let _this = this;
        getJSdbData = state.initial.getJSdbData;
        let topOfDocument = state.initial.topOfDocument !== false;
        state.initial.data.forEach(function(item) {
          if (!topOfDocument) item.documentName = state.initial.documentName;
          if (item.documentName) {
            let li = document.createElement('li');
            if (item.noOfChildren) {
              let span = document.createElement('span');
              span.className = 'caret text-gray-900';
              let text;
              if (topOfDocument) {
                text = '^' + item.documentName + ' (' + item.noOfChildren + ' items)';
              }
              else {
                text = item.name + ' (' + item.noOfChildren + ' items)';
              }
              span.textContent = text;
              let clicked = false;
              let fn = function() {
                if (clicked) {
                  li.querySelector(".nested").classList.toggle("active");
                  span.classList.toggle("caret-down");
                  return;
                }
                let path = item.path || [];
                getJSdbData(item.documentName, path, function(responseObj) {
                  _this.addChildValues(li, item.documentName, responseObj.message.results);
                });
                clicked = true;
              };
              _this.addHandler(fn, span);

              li.appendChild(span);
            }
            else {
              let value = item.documentName;
              if (!topOfDocument) value = item.name;
              if (item.value) value = value + ': ' + item.value;
              li.textContent = value;
            }
            _this.rootElement.appendChild(li);
          }
        });
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('ul')[0];
    }

    disconnectedCallback() {
      console.log('*** jsdb viewer component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_jsdb_viewer);

}
