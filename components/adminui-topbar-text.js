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

 8 March 2020

 */

export function load() {

  let componentName = 'adminui-topbar-text';

  class adminui_topbar_text extends HTMLElement {
    constructor() {
      super();

      const html = `
<style>
.center-text {
  display: flex;
  align-items: center;
  height: 4.375rem;
  padding: 0.75rem;
}
</style>
<div class="center-text text-gray-900 font-weight-bold">Undefined Text</div>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.colour) {
        let oldColor = this.rootElement.classList.item(1);
        this.rootElement.classList.remove(oldColor);
        this.rootElement.classList.add('text-' + state.colour);
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
    }

    disconnectedCallback() {
      console.log('*** topbar text component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_topbar_text);

}
