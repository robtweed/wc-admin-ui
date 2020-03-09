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

  let componentName = 'adminui-sidebar-toggler';

  class adminui_sidebar_toggler extends HTMLElement {
    constructor() {
      super();

      const html = `
<div class="text-center d-none d-md-inline">
  <button class="rounded-circle border-0" id="sidebarToggle"></button>
</div>
      `;

      this.html = `${html}`;
    }

    connectedCallback() {

      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.toggleBtn = this.rootElement.getElementsByTagName('button')[0];
      this.className = 'text-center';

      this.toggle = function(e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
          $('.sidebar .collapse').collapse('hide');
        }
      };

      this.toggleBtn.addEventListener('click', this.toggle);
    }

    disconnectedCallback() {
      console.log('*** toggler was removed!');
      this.toggleBtn.removeEventListener('click', this.toggle);
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_sidebar_toggler);

}
