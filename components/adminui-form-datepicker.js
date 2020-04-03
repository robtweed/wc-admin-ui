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

 3 April 2020

 See: https://bootstrap-datepicker.readthedocs.io/en/stable/index.html

*/

export function load() {

  let componentName = 'adminui-form-datepicker';
  let counter = -1;
  let id_prefix = componentName + '-';
  let id;

  customElements.define(componentName, class adminui_form_datepicker extends HTMLElement {
    constructor() {
      super();

      counter++;
      id = id_prefix + counter;
      let inputId = id_prefix + 'input-' + counter;

      const html = `
<div class="form-group">
  <label for="${inputId}">Undefined Label</label>
  <div class="input-group date" data-provide="datepicker" id="${id}">
    <input type="text" class="form-control" id="${inputId}"/>
    <div class="input-group-append">
      <div class="input-group-text">
        <i class="fa fa-calendar-alt"></i>
      </div>
    </div>
  </div>
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
        $('#' + this.inputGroup.id).datepicker('setDate', state.value);
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
      if (state.displayFormat) {
        this.setFormat(state.displayFormat);
      }
      if (typeof state.saveFormat !== 'undefined') {
        this.setSaveFormat(state.saveFormat);
      }
      if (state.autoclose) {
        this.autoclose = state.autoclose;
        this.setFormat(this.displayFormat);
      }
      if (state.row) {
        this.rootElement.classList.add('row');
        this.labelTag.className = 'col-sm-' + state.row + ' col-form-label';
        let div = document.createElement('div');
        div.className = 'col-sm-' + (12 - state.row);
        this.rootElement.appendChild(div);
        this.rootElement.removeChild(this.inputGroup);
        div.appendChild(this.inputGroup);
      }
    }

    setFormat(format) {
      /*
      String. Default: “mm/dd/yyyy”

      The date format, combination of d, dd, D, DD, m, mm, M, MM, yy, yyyy.

      d, dd: Numeric date, no leading zero and leading zero, respectively. Eg, 5, 05.
      D, DD: Abbreviated and full weekday names, respectively. Eg, Mon, Monday.
      m, mm: Numeric month, no leading zero and leading zero, respectively. Eg, 7, 07.
      M, MM: Abbreviated and full month names, respectively. Eg, Jan, January
      yy, yyyy: 2- and 4-digit years, respectively. Eg, 12, 2012.

      */

      this.displayFormat = format;
      this.datepicker = $('#' + this.inputGroup.id).datepicker({
        format: format,
        autoclose: this.autoclose
      });
    }

    setSaveFormat(format) {
      this.saveFormat = format;
    }

    onLoaded() {
      this.datepicker = $('#' + this.inputGroup.id).datepicker({
        format: this.displayFormat,
        autoclose: this.autoclose
      });
      this.form = this.getParentComponent({match: 'adminui-form'});
      let _this = this;
      this.fn = function(e) {
        let value;
        if (typeof _this.saveFormat === 'function') {
          value = _this.saveFormat(e.date);
        }
        else {
          value = e.format(0, _this.saveFormat);
        }
        console.log('value saved for form: ' + value);
        _this.form.setFieldValue(_this.name, value);
      };
      this.datepicker.on('changeDate', this.fn);
      this.form.field[this.name] = this;
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.inputGroup = this.rootElement.querySelector('#' + id);
      this.inputTag = this.rootElement.querySelector('input');
      this.labelTag = this.rootElement.querySelector('label');
      this.displayFormat = 'dd/mm/yyyy';
      this.saveFormat = this.dateFormat;
      this.autoclose = true;
    }

    disconnectedCallback() {
      console.log('*** form component was removed!');
      if (this.onUnload) this.onUnload();
      this.inputTag.removeEventListener('change', this.fn);
    }
  });
}
