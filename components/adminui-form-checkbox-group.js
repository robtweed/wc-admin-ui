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

 24 March 2020

*/

export function load() {

  let componentName = 'adminui-form-checkbox-group';
  let counter = -1;
  let id_prefix = componentName + '-';

  customElements.define(componentName, class adminui_form_checkbox_group extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<div class="form-check-label" id="${id}"></div>
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
        let oldName = this.name;
        if (this.form) {
          delete this.form.fieldValues[oldName];
          this.form.fieldValues[state.name] = {};
        }
        this.name = state.name;
        // need to spin through child checkboxes and update those too
        let checks = [...this.getElementsByTagName('adminui-form-checkbox')];
        checks.forEach(function(checkbox) {
          checkbox.setState({name: state.name});
        });
      }
      if (typeof state.label !== 'undefined') {
        this.rootElement.textContent = state.label;
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.rootElement.addClass(cls);
        });
      }
      if (state.checkboxes) {
        let _this = this;

        function addCheckbox(no) {
          if (no === state.checkboxes.length) return;
          let checkbox = state.checkboxes[no];

          let assembly = {
            componentName: 'adminui-form-checkbox',
            state: {
              id: _this.name + '-' + no,
              name: _this.name,
              value: checkbox.value,
              label: checkbox.text
            }
          };
          _this.loadGroup(assembly, _this.childrenTarget, _this.context, function() {
            addCheckbox(no + 1);
          });
        }

        addCheckbox(0);
      }
      if (state.readonly) {
        let checks = [...this.getElementsByTagName('adminui-form-checkbox')];
        checks.forEach(function(checkbox) {
          checkbox.setState({readonly: true});
        });
      }
      if (state.readonly === false) {
        let checks = [...this.getElementsByTagName('adminui-form-checkbox')];
        checks.forEach(function(checkbox) {
          checkbox.setState({readonly: false});
        });
      }
      if (state.selectedValues) {
        let _this = this;
        if (this.form) {
          let fieldValues = this.form.fieldValues[this.name];
          for (let value in fieldValues) {
            fieldValues[value] = false;
            let checkbox = _this.checks[value];
            checkbox.setState({checked: false});
          }
          state.selectedValues.forEach(function(value) {
            fieldValues[value] = true;
            let checkbox = _this.checks[value];
            checkbox.setState({checked: true});
          });
        }
      }
    }

    onLoaded() {
      this.form = this.getParentComponent({match: 'adminui-form'});
      this.form.fieldValues[this.name] = {};
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.childrenTarget = this.rootElement;
      this.name = id_prefix + counter;
      this.type = 'checkbox-group';
      this.checks = {};
    }

    disconnectedCallback() {
      console.log('*** checkbox group component was removed!');
      if (this.onUnload) this.onUnload();
    }

  });

};

