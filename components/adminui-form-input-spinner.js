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

 7 March 2020

*/

export function load() {

  let componentName = 'adminui-form-input-spinner';
  let counter = -1;
  let id_prefix = componentName + '-';

  class adminui_form_input_spinner extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<div class="form-group">
  <label for="${id}">Undefined Label</label>
  <input type="number" class="form-control" id="${id}" min="0" max="20" step="1" />
</div>
      `;
      this.html = `${html}`;
    }

    addClass(cls) {
      this.rootElement.classList.add(cls);
    }

    removeClass(cls) {
      this.rootElement.classList.remove(cls);
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.addClass(cls);
        });
      }
      if (state.value) {
        this.inputTag.value = state.value;
      }
      if (state.min) {
        this.setAttribute('min', state.min);
      }
      if (state.max) {
        this.setAttribute('max', state.max);
      }
      if (state.step) {
        this.setAttribute('step', state.step);
      }
      if (state.id) {
        this.inputTag.id = state.id;
      }
      if (state.label === false) {
        this.labelTag.parentNode.removeChild(this.labelTag);
      }
      if (state.label) {
        this.labelTag.textContent = state.label;
      }
      if (state.focus) {
        this.inputTag.focus();
      }
      if (state.attributes) {
        for (let name in state.attributes) {
          this.setAttribute(name, state.attributes[name]);
        }
      }
    }

    onLoaded() {
      this.form = this.getParentComponent({match: 'adminui-form'});
      $('#' + this.inputTag.id).inputSpinner();
      let _this = this;
      this.fn = function(e) {
        _this.form.setFieldValue(_this.name, e.target.value);
      };
      this.inputTag.addEventListener('change', this.fn);
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.inputTag = this.rootElement.querySelector('input');
      this.labelTag = this.rootElement.querySelector('label');
    }

    disconnectedCallback() {
      console.log('*** form component was removed!');
      if (this.onUnload) this.onUnload();
      this.inputTag.removeEventListener('change', this.fn);
    }
  }

  customElements.define(componentName, adminui_form_input_spinner);

}
