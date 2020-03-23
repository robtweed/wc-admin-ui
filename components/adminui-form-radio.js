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

 23 March 2020

*/

export function load() {

  let componentName = 'adminui-form-radio';
  let counter = -1;
  let id_prefix = componentName + '-';

  customElements.define(componentName, class adminui_form_radio extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<div class="form-check">
  <input class="form-check-input" type="radio" id="${id}">
  <label class="form-check-label" for="${id}">Undefined Label</label>
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
        // delete old form reference
        let oldName = this.name;
        this.setFormReference.call(this, state.name, this.value);
        delete this.form.radios[oldName];

        this.name = state.name;
        this.inputTag.setAttribute('name', state.name);
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.addClass(cls);
        });
      }
      if (state.id) {
        this.inputTag.id = state.id;
        this.labelTag.setAttribute('for', state.id);
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
      if (state.checked) {
        this.inputTag.setAttribute('checked', 'checked');
      }
      if (state.checked === false) {
        this.inputTag.removeAttribute('checked');
      }
      if (state.value) {
        this.inputTag.value = state.value;
        this.setFormReference.call(this, this.name, state.value);
        this.form.setFieldValue(this.name, state.value);
      }
      if (state.readonly) {
        this.inputTag.setAttribute('disabled', 'disabled');
      }
      if (state.readonly === false) {
        this.inputTag.removeAttribute('disabled');
      }
      if (state.inline) {
        this.rootElement.classList.add('form-check-inline');
      }
      if (state.inline === false) {
        this.rootElement.classList.remove('form-check-inline');
      }
    }

    setValue(value) {
      this.setState({value: value});
    }

    setFormReference(name, value) {
      if (!this.form) this.form = this.getParentComponent({match: 'adminui-form'});
      if (!this.form.radios) {
        this.form.radios = {};
      }
      if (name && !this.form.radios[name]) {
        this.form.radios[name] = {};
      }
      if (value) {
        this.form.radios[name][value] = this;
      }
    }

    onLoaded() {
      this.form = this.getParentComponent({match: 'adminui-form'});
      this.setFormReference.call(this, this.name, this.value);
      let radioGroup = this.getParentComponent('adminui-form-radio-group');
      let _this = this;
      this.fn = function(e) {
        _this.form.setFieldValue(_this.name, e.target.value);
      };
      this.inputTag.addEventListener('change', this.fn);
      if (radioGroup) {
        this.form.field[this.name] = radioGroup;
        if (this.inputTag.value) radioGroup.radios[this.inputTag.value] = this;
      }
      else {
        this.form.field[this.name] = this;
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.inputTag = this.rootElement.querySelector('input');
      this.labelTag = this.rootElement.querySelector('label');
      this.name = this.inputTag.id;
      this.type = 'radio';
    }

    disconnectedCallback() {
      console.log('*** form component was removed!');
      if (this.onUnload) this.onUnload();
      this.inputTag.removeEventListener('change', this.fn);
    }

  });

};

