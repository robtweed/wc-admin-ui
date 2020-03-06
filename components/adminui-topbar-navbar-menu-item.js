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

 1 March 2020

 */

export function load() {

  let componentName = 'adminui-topbar-navbar-menu-item';

  class adminui_topbar_navbar_menu_item extends HTMLElement {
    constructor() {
      super();

      const html = `
<a class="dropdown-item" href="#">
  <i class="fas fa-exclamation-circle fa-sm fa-fw mr-2 text-gray-600"></i>
  <span>Undefined Option Text</span>
</a>
      `;

      this.html = `${html}`;
    }

    setState(state, callback) {
      if (state.title) {
        let span = this.rootElement.querySelector('span');
        span.textContent =  state.title;
      }
      if (state.use_modal) {
        this.rootElement.setAttribute('data-toggle', 'modal');
        let modalRoot = this.getComponentByName('adminui-modal-root', state.use_modal); 
        if (modalRoot) this.rootElement.setAttribute('data-target', '#' + modalRoot.rootElement.id);
        this.aTag.removeEventListener('click', this.getMenuItemDetail);
      }
      if (state.icon) {
        let i = this.aTag.querySelector('i');
        let oldIcon = i.classList.item(1);
        i.classList.remove(oldIcon);
        i.classList.add('fa-' + state.icon);
      }
    }

    connectedCallback() {

      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('a')[0];
      this.aTag = this.rootElement;
    }

    disconnectedCallback() {
      console.log('*** dropdown item component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_topbar_navbar_menu_item);

}
