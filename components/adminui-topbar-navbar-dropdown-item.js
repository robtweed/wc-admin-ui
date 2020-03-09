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

  let componentName = 'adminui-topbar-navbar-dropdown-item';

  class adminui_topbar_navbar_dropdown_item extends HTMLElement {
    constructor() {
      super();

      const html = `
<a class="dropdown-item d-flex align-items-center" href="#">
  <div class="mr-3">
    <div class="icon-circle bg-primary">
      <i class="fas fa-exclamation-circle text-white"></i>
    </div>
  </div>
  <div>
    <div class="small text-gray-500">Undefined Heading</div>
    <span class="font-weight-bold">Undefined Text</span>
  </div>
</a>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.heading) {
        let headingDiv = this.rootElement.getElementsByClassName('small text-gray-500')[0];
        headingDiv.textContent =  state.heading;
      }
      if (state.text) {
        let span = this.rootElement.querySelector('span');
        span.textContent =  state.text;
      }
      if (state.icon) {
        let i = this.rootElement.querySelector('i');
        let oldIcon = i.classList.item(1);
        i.classList.remove(oldIcon);
        i.classList.add('fa-' + state.icon);
      }
      if (state.colour) {
        let div = this.rootElement.getElementsByClassName('mr-3')[0];
        let colourDiv = div.querySelector('div');
        let oldColour = colourDiv.classList.item(1);
        colourDiv.classList.remove(oldColour);
        colourDiv.classList.add('bg-' + state.colour);
      }
      if (state.ref) this.ref = state.ref;
      if (state.itemId) this.itemId = state.itemId;
    }

    connectedCallback() {

      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('a')[0];
      this.aTag = this.rootElement;
      this.ref = false;

      let _this = this;
      this.getDropdownItemDetail = function() {
       /*
        EWD.send({
          type: 'getDropdownItemDetail',
          ref: _this.ref,
          itemId: _this.itemId
        }, function(responseObj) {
          console.log(responseObj);
        });
        */
      };
      this.aTag.addEventListener('click', this.getDropdownItemDetail);
    }

    disconnectedCallback() {
      console.log('*** dropdown item component was removed!');
      this.aTag.removeEventListener('click', this.getDropdownItemDetail);
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_topbar_navbar_dropdown_item);

}
