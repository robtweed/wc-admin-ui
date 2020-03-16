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

 10 March 2020

*/

export function load() {

  let componentName = 'adminui-table';
  let id_prefix = componentName + '-';
  let counter = -1;
  let labelId;

  class adminui_table extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<div class="table-responsive">
  <table class="table table-bordered" id="${id}" width="100%" style="width:100%" cellspacing="0">
    <thead>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>
      `;
      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.striped) {
        this.table.classList.add('table-striped');
      }
      if (state.dark) {
        this.table.classList.add('table-dark');
      }
      if (state.borderless) {
        this.table.classList.add('table-borderless');
      }
      if (state.hover) {
        this.table.classList.add('table-hover');
      }
      if (state.small) {
        this.table.classList.add('table-sm');
      }
      if (state.bordered === false) {
        this.table.classList.remove('table-bordered');
      }
      if (state.cls) {
        this.table.classList.add(state.cls);
      }
      if (state.width) {
        this.table.setAttribute('width', state.width);
      }
      if (state.cellspacing) {
        this.table.setAttribute('cellspacing', state.cellspacing);
      }
      if (state.headers) {
        let _this = this;
        let tr = this.add_tr(this.thead);
        state.headers.forEach(function(header) {
          let th = _this.add_th(tr);
          th.setAttribute('scope', 'col');
          th.textContent = header;
        });
      }
      if (state.data) {
        this.clear();
        let trCount = -1;
        let _this = this;
        state.data.forEach(function(row) {
          trCount++;
          let tr = _this.add_tr(_this.tbody);
          let tdCount = -1
          let cells = [];
          row.forEach(function(col) {
            tdCount++;
            let options;
            if (col.bold) options = {bold: true};
            let td = _this.add_td(tr, options);
            if (col.value) td.textContent = col.value;
            if (col.html) td.innerHTML = col.html;
            if (col.colspan) {
              td.setAttribute('colspan', col.colspan);
            }
            if (col.cls) {
              let clss = col.cls.split(' ');
              clss.forEach(function(cls) {
                td.classList.add(cls);
              });
            }
            cells.push(td);
          });
          _this.cell.push(cells);
        });
      }
    }

    clear() {
      let children = [...this.tbody.childNodes];
      children.forEach(function(child) {
        child.parentNode.removeChild(child);
      });
      this.cell = [];
    }

    add_tr(parent) {
      let tr = document.createElement('tr');
      return parent.appendChild(tr);
    }

    add_th(parent) {
      let th = document.createElement('th');
      parent.appendChild(th);
      return th;
    }

    add_td(parent, options) {
      let td = document.createElement('td');
      parent.appendChild(td);
      return td;
    }

    onLoaded() {
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.table = this.rootElement.querySelector('table');
      this.thead = this.rootElement.querySelector('thead');
      this.tbody = this.rootElement.querySelector('tbody');
      this.childrenTarget = this.tbody;
      this.name = 'undefined-table-' + counter;
      this.cell = [];
    }

    disconnectedCallback() {
      console.log('*** table component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_table);

}
