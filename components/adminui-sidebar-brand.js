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

  let counter = -1;
  let id_prefix = 'adminui-sidebar-brand-';

  class adminui_sidebar_brand extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<a id="${id}" class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
  <div class="sidebar-brand-icon">
    <i class="fas fa-exclamation-circle"></i>
  </div>
  <div class="sidebar-brand-text mx-3">Undefined Brand</div>
</a>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      let a = this.rootElement;
      let childDivs =  a.getElementsByTagName('div');
      let idiv = childDivs[0];
      let i = idiv.getElementsByTagName('i')[0];
      let titlediv = childDivs[1];

      if (state.title) titlediv.textContent = state.title;

      if (state.icon) {
        let oldClass = i.classList.item(1);
        i.classList.remove(oldClass);
        i.classList.add('fa-' + state.icon);
      }

      if (state.icon_style) {
        let oldStyle = idiv.classList.item(1);
        if (oldStyle) idiv.classList.remove(oldStyle);
        idiv.classList.add(state.icon_style);
      }

      if (state.remove_icon_style) {
        let style = idiv.classList.item(1);
        if (style) idiv.classList.remove(style);
      }

      if (state.contentPage) {
        this.pageSelect = function() {
          console.log('switch to page ' + state.contentPage);
          var root = document.getElementsByTagName('component-root')[0];
          root.switchToPage(state.contentPage);
        };
        this.rootElement.addEventListener('click', this.pageSelect);
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('a')[0];
      this.style = 'display: inline';
    }

    disconnectedCallback() {
      console.log('brand removed!');
      if (this.pageSelect) this.rootElement.addEventListener('click', this.pageSelect);
    }

  }

  customElements.define('adminui-sidebar-brand', adminui_sidebar_brand);
}


