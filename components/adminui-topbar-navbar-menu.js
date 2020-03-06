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
  let componentName = 'adminui-topbar-navbar-menu';

  class adminui_topbar_navbar_menu extends HTMLElement {
    constructor() {
      super();

      counter++;
      let deviceId = 'navbar-menu-' + counter;

      const html = `
<li class="nav-item dropdown no-arrow">
  <a class="nav-link dropdown-toggle" href="#" id="${deviceId}" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="mr-2 d-none d-lg-inline text-gray-900 font-weight-bold">Undefined Title</span>
    <!-- optional image here in future? -->
  </a>
  <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="${deviceId}">
    <!-- menu items go here -->
  </div>
</li>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.webComponents) {
        this.webComponents = state.webComponents;
      }
      if (state.title) {
        let span = this.rootElement.querySelector('span');
        span.textContent = state.title;
      }
      if (state.ref) {
        this.ref = state.ref;
      }
      if (state.getMenuItems) {
        this.getMenuItems = state.getMenuItems.bind(this);
      }
      if (this.getMenuItems) this.getMenuItems();
    }

    connectedCallback() {

      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('li')[0];
      this.itemsTarget = this.rootElement.querySelector('div');
      this.a_tag = this.rootElement.querySelector('a');

      let _this = this;

      this.handleItemsUpdate = function(responseObj) {
        if (responseObj.ref !== _this.ref) {
          // ignore these messages from the back end - they are for another instance of this component
          return;
        }
        // now dynamically load the menu item components using the array of returned items
        // first remove any that currently exist
        let items = [..._this.rootElement.getElementsByTagName('adminui-topbar-navbar-menu-item')];
        items.forEach(function(item) {
          item.parentNode.removeChild(item);
        });
        // now add the newly-arrived ones
        items = responseObj.items;
        items.forEach(function(item, ix) {
          if (items[ix].state) {
            items[ix].state.ref = _this.ref;
          }
        });
        _this.webComponents.loadGroup(items, _this.itemsTarget, _this.options);
      };
    }

    disconnectedCallback() {
      console.log('*** menu component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_topbar_navbar_menu);

}

