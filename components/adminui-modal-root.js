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

  let componentName = 'adminui-modal-root';
  let id_prefix = componentName + '-';
  let counter = -1;
  let labelId;

  class adminui_modal_root extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;
      labelId = id_prefix + 'Label' + counter;

      const html = `
<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${labelId}" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content"></div>
  </div>
</div>
      `;
      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.static) {
        this.rootElement.setAttribute('data-backdrop', 'static');
        this.rootElement.classList.remove('fade');
      }
      if (state.show) {
        this.show();
      }
      if (state.show === false) {
        this.hide();
      }
    }

    show() {
      let el = $('#' + this.rootElement.id);
      el.modal('show');
    }

    hide() {
      let el = $('#' + this.rootElement.id);
      el.modal('hide');
    }

    destroy() {
      let el = $('#' + this.rootElement.id);
      el.modal('dispose');
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.childrenTarget = this.rootElement.querySelector('.modal-content');
      this.name = 'undefined-name-' + counter;
      this.labelId = labelId;
    }

    disconnectedCallback() {
      console.log('*** modal component was removed!');
    }
  }

  customElements.define(componentName, adminui_modal_root);

}
