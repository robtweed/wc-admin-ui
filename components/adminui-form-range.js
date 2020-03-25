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

 25 March 2020

*/

export function load() {

  let componentName = 'adminui-form-range';
  let counter = -1;
  let id_prefix = 'adminui_form_range_';

  customElements.define(componentName, class adminui_form_range extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<style>
output { 
  position: absolute;
  background-image: linear-gradient(top, #444444, #999999);
  background-image: -webkit-linear-gradient(top, #444444, #999999);
  width: 40px; 
  height: 30px; 
  text-align: center; 
  color: white; 
  border-radius: 10px; 
  display: inline-block; 
  font: bold 15px/30px Georgia;
  left: 60%;
  margin-left: -1%;
}
output:after { 
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 10px solid #999999;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  margin-top: -1px;
}
</style>
<div class="form-group">
  <label for="${id}">Undefined Label</label>
  <input type="range" class="form-control-range" id="${id}" name="${id}" min="0" max="100" step="1">
  <output for="${id}" onforminput="value = ${id}.valueAsNumber;"></output>

</div>
      `;
      this.html = `${html}`;
      //this.attachShadow({ mode: 'open' });
      //this.shadowRoot.innerHTML = `${html}`;
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
      if (state.marker === false) {
        this.rootElement.removeChild(this.outputTag);
        this.hasMarker = false;
      }
      if (state.focus) {
        this.inputTag.focus();
      }
      if (typeof state.value !== 'undefined') {
        this.inputTag.value = state.value;
        this.form.setFieldValue(this.name, state.value);
        this.setMarker();
      }
      if (state.readonly) {
        this.inputTag.setAttribute('disabled', 'disabled');
      }
      if (state.readonly === false) {
        this.inputTag.removeAttribute('disabled');
        this.setMarker();
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
      if (state.min) {
        this.inputTag.setAttribute('min', state.min);
        this.min = state.min;
      }
      if (state.max) {
        this.inputTag.setAttribute('max', state.max);
        this.max = state.max;
      }
      if (state.step) {
        this.inputTag.setAttribute('step', state.step);
        this.step = state.step;
      }
    }

    setMarker() {
      if (!this.hasMarker) return;

      let width = this.inputTag.offsetWidth;
      let newPoint = (this.inputTag.value - this.min) / (this.max - this.min);
      let offset =  0;
      let top = 0;
      if (this.inputTag.offsetParent) {
        offset =  this.inputTag.offsetParent.offsetLeft;
        top =  this.inputTag.offsetParent.offsetTop;
      }
      let mleft = (newPoint * 4) + 1;
      let newPlace = (width * newPoint) + offset; 

      this.outputTag.style.left = newPlace + "px";
      this.outputTag.style.marginLeft = -mleft + "%";
      this.outputTag.style.top = top - 44 + 'px';
      this.outputTag.innerHTML = this.inputTag.value;
    }

    onLoaded() {
      this.form = this.getParentComponent({match: 'adminui-form'});
      let _this = this;
      let fn = function(e) {
        _this.form.setFieldValue(_this.name, e.target.value);
        _this.setMarker();
      };
      this.addHandler(fn, this.inputTag, 'change');
      this.form.field[this.name] = this;
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      //this.rootElement = this.shadowRoot.querySelector('div');
      this.inputTag = this.rootElement.querySelector('input');
      this.labelTag = this.rootElement.querySelector('label');
      this.outputTag = this.rootElement.querySelector('output');
      this.name = this.inputTag.id;
      this.min = this.inputTag.getAttribute('min');
      this.max = this.inputTag.getAttribute('max');
      this.step = this.inputTag.getAttribute('step');
      this.type = 'range';
      this.hasMarker = true;
    }

    disconnectedCallback() {
      console.log('*** form component was removed!');
      if (this.onUnload) this.onUnload();
    }
  });

}
