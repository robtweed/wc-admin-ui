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

 29 February 2020

*/

export function load() {

  let componentName = 'adminui-content-card';

  class adminui_content_card extends HTMLElement {
    constructor() {
      super();

      const html = `
<div class="card shadow mb-4">
  <div class="card-header py-3">
    <h6 class="m-0 font-weight-bold text-primary">Undefined Title</h6>
  </div>
  <div class="card-body"></div>
</div>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.title) {
        this.titleElement.textContent = state.title;
      }
      if (state.name) {
        //this.id = 'component-content-card-' + state.name;
        this.name = state.name
      }
      if (state.title_colour) {
        let oldColour = this.titleElement.classList.item(2);
        this.titleElement.classList.remove(oldColour);
        this.titleElement.classList.add('text-' + state.title_colour);
      }
      if (state.text) {
        this.childrenTarget.textContent = state.text;
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.titleElement = this.rootElement.querySelector('h6');
      this.childrenTarget = this.rootElement.querySelector('.card-body');
    }

    disconnectedCallback() {
      console.log('*** card component was removed!');
    }
  }

  customElements.define(componentName, adminui_content_card);

}
