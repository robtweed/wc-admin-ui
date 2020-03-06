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

  let counter = -1;
  let componentName = 'adminui-topbar-navbar-dropdown';

  class adminui_topbar_navbar_dropdown extends HTMLElement {
    constructor() {
      super();

      counter++;
      let deviceId = 'navbar-dropdown-' + counter;

      const html = `
<li class="nav-item dropdown no-arrow mx-1">
  <a class="nav-link dropdown-toggle" href="#" id="${deviceId}" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="fas fa-bell fa-fw"></i>
    <!-- Counter - No of Dropdown Items -->
    <span class="badge badge-danger badge-counter">0</span>
  </a>
  <!-- Dropdown - Items -->
  <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="${deviceId}">
    <h6 class="dropdown-header">Alerts</h6>
    <!-- items go here -->
  </div>
</li>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.webComponents) {
        this.webComponents = state.webComponents;
      }
      if (state.icon) {
        let i = this.rootElement.querySelector('i');
        let oldIcon = i.classList.item(1);
        i.classList.remove(oldIcon);
        i.classList.add('fa-' + state.icon);
      }
      if (state.title) {
        let h6 = this.rootElement.querySelector('h6');
        h6.textContent = state.title;
      }
      if (state.ref) {
        this.ref = state.ref;
      }
    }

    connectedCallback() {

      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('li')[0];
      this.itemsTarget = this.rootElement.querySelector('div');
      this.a_tag = this.rootElement.querySelector('a');
      this.counter = this.rootElement.querySelector('span');

      let _this = this;

      this.handleItemsUpdate = function(responseObj) {
        if (responseObj.ref !== _this.ref) {
          // ignore these messages from the back end - they are for another instance of this component
          return;
        }
        // now dynamically load dropdown item components using the array of returned items
        // first remove any that currently exist
        let items = [..._this.rootElement.getElementsByTagName('adminui-topbar-navbar-dropdown-item')];
        items.forEach(function(item) {
          item.parentNode.removeChild(item);
        });
        items = responseObj.items;
        _this.counter.textContent = items.length;
        items.forEach(function(item, ix) {
          items[ix].state.ref = _this.ref;
        });
        _this.webComponents.loadGroup(items, _this.itemsTarget, _this.options);
      };
    }

    disconnectedCallback() {
      console.log('*** alerts component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_topbar_navbar_dropdown);

}

