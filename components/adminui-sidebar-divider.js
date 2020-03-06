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

  let componentName = 'adminui-sidebar-divider';

  class adminui_sidebar_divider extends HTMLElement {
    constructor() {
      super();

      const html = `
<hr class="sidebar-divider">
      `;

      this.html = `${html}`;
    }

    setState(state) {
      let topClass = 'my-0';
      if (state.isTop && !this.rootElement.classList.contains(topClass)) {
        this.rootElement.classList.add(topClass);
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('hr')[0];
    }

    disconnectedCallback() {
      console.log('*** divider was removed!');
      console.log(element);
    }
  }

  customElements.define(componentName, adminui_sidebar_divider);

}
