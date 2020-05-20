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

 20 May 2020

*/

export function load() {

  let componentName = 'adminui-form-field';
  let counter = -1;
  let id_prefix = componentName + '-';

  class adminui_form_field extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<div class="form-group">
  <label for="${id}">Undefined Label</label>
  <input type="text" class="form-control" id="${id}" placeholder="Enter Text...">
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
      if (state.type) {
        this.inputTag.setAttribute('type', state.type);
        if (state.type === 'email') {
          this.inputTag.setAttribute('aria-describedby', 'emailHelp');
        }
      }
      if (state.placeholder === false) {
        this.inputTag.removeAttribute('placeholder');
      }
      if (state.placeholder) {
        this.inputTag.setAttribute('placeholder', state.placeholder);
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.addClass(cls);
        });
      }
      if (state.id) {
        this.inputTag.id = state.id;
        this.labelTag.setAttribute('for', id);
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
      if (typeof state.value !== 'undefined') {
        this.inputTag.value = state.value;
        this.form.setFieldValue(this.name, state.value);
      }
      if (state.readonly) {
        this.inputTag.setAttribute('readonly', 'readonly');
      }
      if (state.readonly === false) {
        this.inputTag.removeAttribute('readonly');
      }
      if (state.row) {
        this.rootElement.classList.add('row');
        this.labelTag.className = 'col-sm-' + state.row + ' col-form-label';
        let div = document.createElement('div');
        div.className = 'col-sm-' + (12 - state.row);
        this.rootElement.appendChild(div);
        this.rootElement.removeChild(this.inputTag);
        div.appendChild(this.inputTag);
      }
    }

    onLoaded() {
      this.form = this.getParentComponent({match: 'adminui-form'});
      let _this = this;
      this.fn = function(e) {
        _this.form.setFieldValue(_this.name, e.target.value);
      };
      this.inputTag.addEventListener('change', this.fn);
      this.form.field[this.name] = this;
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.inputTag = this.rootElement.querySelector('input');
      this.labelTag = this.rootElement.querySelector('label');
      this.name = this.inputTag.id;
    }

    disconnectedCallback() {
      console.log('*** form field component was removed!');
      if (this.onUnload) this.onUnload();
      this.inputTag.removeEventListener('change', this.fn);
    }
  }

  customElements.define(componentName, adminui_form_field);

}
