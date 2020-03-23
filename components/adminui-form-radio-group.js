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

  let componentName = 'adminui-form-radio-group';
  let counter = -1;
  let id_prefix = componentName + '-';

  customElements.define(componentName, class adminui_form_radio_group extends HTMLElement {
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
        this.name = state.name;
        // need to spin through child radio buttons and update those too
        let radios = [...this.getElementsByTagName('adminui-form-radio')];
        radios.forEach(function(radio) {
          radio.setState({name: state.name});
        });
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.rootElement.addClass(cls);
        });
      }
      if (state.radios) {
        let _this = this;

        function addRadio(no) {
          if (no === state.radios.length) return;
          var radio = state.radios[no];

          var assembly = {
            componentName: 'adminui-form-radio',
            state: {
              id: _this.name + '-' + no,
              name: _this.name,
              value: radio.value,
              label: radio.text
            }
          };
          _this.loadGroup(assembly, _this.childrenTarget, _this.context, function() {
            addRadio(no + 1);
          });
        }

        addRadio(0);
      }
      if (state.readonly) {
        let radios = [...this.getElementsByTagName('adminui-form-radio')];
        radios.forEach(function(radio) {
          radio.setState({readonly: true});
        });
      }
      if (state.readonly === false) {
        let radios = [...this.getElementsByTagName('adminui-form-radio')];
        radios.forEach(function(radio) {
          radio.setState({readonly: false});
        });
      }
      if (state.selectedValue) {
        let radio = this.radios[state.selectedValue];
        radio.setState({checked: true});
      }
    }

    onLoaded() {
      this.form = this.getParentComponent({match: 'adminui-form'});
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.childrenTarget = this.rootElement;
      this.name = id_prefix + counter;
      this.type = 'radio-group';
      this.radios = {};
    }

    disconnectedCallback() {
      console.log('*** form component was removed!');
      if (this.onUnload) this.onUnload();
    }

  });

};

