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

 19 March 2020

*/

export function load() {

  let componentName = 'adminui-content-card-footer';
  let counter = -1;
  let id_prefix = componentName + '-';

  customElements.define(componentName, class adminui_content_card_footer extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<div class="card-footer" id="${id}"></div>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.rootElement.classList.add(cls);
        });
      }
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.hidden) {
        $("#" + this.rootElement.id).hide();
      }
      if (state.visible) {
        $("#" + this.rootElement.id).show();
      }
    }

    show() {
      $("#" + this.rootElement.id).show();
    }

    hide() {
      $("#" + this.rootElement.id).hide();
    }


    onLoaded() {
      let card = this.getParentComponent({match: 'adminui-content-card'});
      if (card) card.footer = this;
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.childrenTarget = this.rootElement;
    }

    disconnectedCallback() {
      console.log('*** card header component was removed!');
      if (this.onUnload) this.onUnload();
    }

  });
};

