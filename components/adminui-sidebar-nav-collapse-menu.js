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
  let componentName = 'adminui-sidebar-nav-collapse-menu';
  let id_prefix = componentName + '-';

  class adminui_sidebar_nav_collapse_menu extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<li id="${id}" class="nav-item">
  <a class="nav-link collapsed" href="#" data-toggle="collapse" aria-expanded="true">
    <i class="fas fa-fw fa-exclamation-circle"></i>
    <span>Undefined Heading</span>
  </a>
  <div class="collapse" data-parent="#accordionSidebar">
    <div class="bg-white py-2 collapse-inner rounded"></div>
  </div>
</li>
      `;

      this.html = `${html}`;
      this.collapseId = 'nav-collapse-' + counter;

    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('li')[0];
      this.style = 'height: 56px';
      let a = this.rootElement.getElementsByTagName('a')[0];
      let collapseDiv = this.rootElement.getElementsByTagName('div')[0];
      collapseDiv.id = this.collapseId;
      this.collapseDiv = collapseDiv;
      a.setAttribute('data-target', '#' + this.collapseId);
      a.setAttribute('aria-controls', this.collapseId);
      this.childrenTarget = collapseDiv.getElementsByTagName('div')[0];
      this.toggleActive = function() {
        var activeLink = document.getElementsByClassName('nav-item active')[0];
        if (activeLink) activeLink.classList.remove('active');
      }
      a.addEventListener('click', this.toggleActive);
    }

    setState(state) {
      if (state.heading) {
        this.rootElement.getElementsByTagName('span')[0].textContent = state.heading;
      }
      if (state.icon) {
        let i = this.rootElement.getElementsByTagName('i')[0];
        var oldIcon = i.classList.item(2);
        i.classList.remove(oldIcon);
        i.classList.add('fa-' + state.icon);
      }
      if (typeof state.show !== 'undefined') {
        if (state.show) {
          if (!this.collapseDiv.classList.contains('show')) {
            this.collapseDiv.classList.add('show');
          }
        }
        else {
          this.collapseDiv.classList.remove('show');
        }
      }
    }

    disconnectedCallback() {
      console.log('*** nav-collapse-menu was removed!');
      a.removeEventListener('click', this.toggleActive);

      /*
      // remove all the menu handlers
      this.menuEventHandlers.forEach(function(obj) {;
        obj.element.removeEventListener('click', obj.fn);
      });
      */
    }

  }

  customElements.define(componentName, adminui_sidebar_nav_collapse_menu);

}
