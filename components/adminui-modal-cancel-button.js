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

 1 May 2020

*/

export function load() {

  let componentName = 'adminui-modal-cancel-button';

  class adminui_modal_cancel_button extends HTMLElement {
    constructor() {
      super();

      const html = `
<button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
      `;
      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name
      }
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.colour) {
        let oldColour = this.rootElement.classList.item(1);
        this.rootElement.classList.remove(oldColour);
        this.rootElement.classList.add('btn-' + state.colour);
      }
    }

    onLoaded() {
      let cancelledEvent = new Event('modalCancelled');
      let fn = function() {
        document.dispatchEvent(cancelledEvent);
      };
      this.addHandler(fn);
    }

    onCancelled(fn) {
      document.addEventListener('modalCancelled', fn);
      this.removeOnCancelled = function() {
        document.removeEventListener('modalCancelled', fn);
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('button')[0];
    }

    disconnectedCallback() {
      console.log('*** modal cancel button component was removed!');
      if (this.onUnload) this.onUnload();
      this.removeOnCancelled();
    }
  }

  customElements.define(componentName, adminui_modal_cancel_button);

}
