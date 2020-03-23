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

 8 March 2020

*/

export function load() {

  let componentName = 'adminui-content-card';
  let counter = -1;
  let id_prefix = componentName + '-';

  class adminui_content_card extends HTMLElement {
    constructor() {
      super();

      counter++;

      const html = `
<div class="card shadow mb-4"></div>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name
      }
      if (state.title) {
        if (this.header) {
          this.header.setState({title: state.title});
        }
      }
      if (state.title_colour) {
        if (this.header) {
          this.header.setState({title_colour: state.title_colour});
        }
      }
      if (state.text) {
        if (this.body) {
          this.body.setState({text: state.text});
        }
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.rootElement.classList.add(cls);
        });
      }
      if (state.hide) {
        this.setAttribute('style', 'display: none');
      }
      if (state.show) {
        this.setAttribute('style', 'display: inline');
      }
    }

    show() {
      this.setAttribute('style', 'display: inline');
    }

    hide() {
      this.setAttribute('style', 'display: none');
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.childrenTarget = this.rootElement;
      this.name = id_prefix + counter;
    }

    disconnectedCallback() {
      console.log('*** card component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_content_card);

}
