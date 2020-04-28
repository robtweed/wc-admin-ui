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

 16 April 2020

*/

export function load() {

  let componentName = 'adminui-span';

  class adminui_span extends HTMLElement {
    constructor() {
      super();

      const html = `
<span></span>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.name) {
        this.name = state.name;
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.rootElement.classList.add(cls);
        });
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('span')[0];
      this.childrenTarget = this.rootElement;
    }

    disconnectedCallback() {
      console.log('*** span component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_span);

}
