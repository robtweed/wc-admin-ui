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

 9 March 2020

*/

export function load() {

  let counter = -1;
  let componentName = 'adminui-chart';
  let id_prefix = componentName + '-';

  class adminui_chart extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<style>
  .chart-layout {
    width: 100%;
    height: 20rem;
    position: relative;
  }
</style>
<div class="chart-layout">
  <canvas id="${id}"></canvas>
</div>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.cls) {
        let _this = this;
        let clss = state.cls.split(' ');
        clss.forEach(function(cls) {
          _this.rootElement.classList.add(cls);
        });
      }
      if (state.name) {
        this.name = state.name;
      }
    }

    draw(config) {
      let ctx = this.canvas.getContext('2d');
      this.chart = new Chart(ctx, config);
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.canvas = this.rootElement.querySelector('canvas');
      this.childrenTarget = this.canvas;
      this.name = 'unnamed-chart-' + counter;
    }

    disconnectedCallback() {
      console.log('*** chart component was removed!');
      if (this.onUnload) this.onUnload();
      if (this.chart) this.chart.destroy();
    }
  }

  customElements.define(componentName, adminui_chart);

}
