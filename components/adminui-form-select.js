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

  let componentName = 'adminui-form-select';
  let counter = -1;
  let id_prefix = componentName + '-';

  customElements.define(componentName, class adminui_form_select extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<div class="form-group">
  <label for="${id}">Undefined Label</label>
  <select class="form-control" id="${id}">
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
      if (state.options) {
        let _this = this;
        this.options = {};
        this.selected = false;
        // remove any existing options
        let children = [...this.selectTag.childNodes];
        children.forEach(function(child) {
          child.parentNode.removeChild(child);
        });
        // create new options
        state.options.forEach(function(option) {
          let optionTag = document.createElement('option');
          optionTag.value = option.value || option.text;
          optionTag.text = option.text;
          _this.options[option.value] = optionTag;
          _this.selectTag.appendChild(optionTag);
        });
      }
      if (state.focus) {
        this.selectTag.focus();
      }
      if (state.value) {
        if (this.selected) {
          this.selected.removeAttribute('selected');
        }
        let optionTag = this.options[state.value];
        if (optionTag) {
          optionTag.setAttribute('selected', 'selected');
          this.selected = optionTag;
          this.form.setFieldValue(this.name, state.value);
        }
        this.selectTag.value = state.value;
      }
      if (state.readonly) {
        this.selectTag.setAttribute('disabled', 'disabled');
      }
      if (state.readonly === false) {
        this.selectTag.removeAttribute('disabled');
      }
      if (state.row) {
        this.rootElement.classList.add('row');
        this.labelTag.className = 'col-sm-' + state.row + ' col-form-label';
        let div = document.createElement('div');
        div.className = 'col-sm-' + (12 - state.row);
        this.rootElement.appendChild(div);
        this.rootElement.removeChild(this.selectTag);
        div.appendChild(this.selectTag);
      }
    }

    setValue(value) {
      this.setState({value: value});
    }

    onLoaded() {
      this.form = this.getParentComponent({match: 'adminui-form'});
      let _this = this;
      this.fn = function(e) {
        _this.form.setFieldValue(_this.name, e.target.value);
      };
      this.selectTag.addEventListener('change', this.fn);
      this.form.field[this.name] = this;
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.selectTag = this.rootElement.querySelector('select');
      this.labelTag = this.rootElement.querySelector('label');
      this.name = this.selectTag.id;
      this.options = {};
      this.selected = false;
      this.type = 'select';
    }

    disconnectedCallback() {
      console.log('*** form component was removed!');
      if (this.onUnload) this.onUnload();
      this.selectTag.removeEventListener('change', this.fn);
    }

  });

};

