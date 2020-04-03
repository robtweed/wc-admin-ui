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

 1 April 2020

*/

export function load() {

  let componentName = 'adminui-iframe';
  let counter = -1;
  let id_prefix = componentName + '-';

  customElements.define(componentName, class adminui_iframe extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<iframe id="${id}" height="50%" width="100%"></iframe>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.content) {
        this.rootElement.textContent = state.content;
      }
      if (state.name) {
        this.name = state.name;
      }
      if (state.src) {
        this.rootElement.setAttribute('src', state.src);
      }
      if (state.width) {
        this.rootElement.setAttribute('width', state.width);
      }
      if (state.height) {
        this.rootElement.setAttribute('height', state.height);
      }
    }

    src(src) {
      this.setState({src: src});
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('iframe')[0];
      this.childrenTarget = this.rootElement;
    }

    disconnectedCallback() {
      console.log('*** iframe component was removed!');
      if (this.onUnload) this.onUnload();
    }

  });
};

