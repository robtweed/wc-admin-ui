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

 6 March 2020

*/

export function load() {

  let componentName = 'adminui-root';
  let sidebar_colour = 'bg-gradient-primary';

  class adminui_root extends HTMLElement {
    constructor() {
      super();

      const html = `
<!-- NOTE: These stylesheets must also be loaded in the index.html parent page -->
<!--
<link href="css/fontawesome-free/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
<link href="css/sb-admin/sb-admin-2.min.css" rel="stylesheet">
-->

<div id="page-top">
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    </ul>
    <!-- End of Sidebar -->
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav id="bs-admin-topbar" class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        </nav>
        <!-- End of Topbar -->
        <!-- Begin Page Content -->
        <div id="pageContent" class="container-fluid">
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->
      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div id="footerContent" class="container my-auto"></div>
      </footer>
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
</div>
      `;

       this.html = `${html}`;

      //this.attachShadow({ mode: 'open' });
      //this.shadowRoot.innerHTML = `${html}`;
    }

    getContentPage(pageName) {
      let children = [...this.contentTarget.childNodes];
      let child;
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        if (child.tagName === 'ADMINUI-CONTENT-PAGE' && child.name === pageName) {
          return child;
        }
      }
    }

    setPageActive(pageName) {
      // set selected page to active
      let page = this.getContentPage(pageName);
      page.setState({show: true});
    }

    switchToPage(pageName) {
      if (!this.contentPages[pageName]) {
        let config = this.webComponents.getInstanceFromRegistry(pageName);
        if (config) {
          this.webComponents.loadGroup(config, this.contentTarget, {path: this.path});
          this.contentPages[pageName] = true;
          // setPageActive will get triggered when page config is loaded
        }
      }
      else {
        // already attached
        this.setPageActive(pageName);
      }
    }

    isReady() {
      document.dispatchEvent(this.options.readyEvent);
    }

    setState(state) {
      if (state.sidebar_colour) {
        let target = this.sidebarTarget.classList;
        target.remove(sidebar_colour);
        sidebar_colour = state.sidebar_colour;
        if (!sidebar_colour.includes('-')) sidebar_colour = 'bg-gradient-' + state.sidebar_colour;
        target.add(sidebar_colour);
      }
      if (state.webComponents) {
        this.webComponents = state.webComponents;

        this.webComponents.addMetaTag({
          charset: 'utf-8'
        });
        this.webComponents.addMetaTag({
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge'
        });
        this.webComponents.addMetaTag({
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        });

        let prefix = '';
        if (this.options.resourcePath) prefix = this.options.resourcePath;

        this.webComponents.loadCSSFile(prefix + 'css/fontawesome-free/all.min.css');
        this.webComponents.loadCSSFile('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
        this.webComponents.loadCSSFile(prefix + 'css/sb-admin/sb-admin-2.min.css');
        this.webComponents.loadCSSFile(prefix + 'css/toastr/toastr.min.css');
        let _this = this;
        let noOfFiles = 4;
        let count = 0;
        this.webComponents.loadJSFile(prefix + 'js/jquery/jquery.min.js', function() {
          _this.webComponents.loadJSFile(prefix + 'js/bootstrap/bootstrap.bundle.min.js', function() {
            count++;
            if (count === noOfFiles) _this.isReady();
          });
          _this.webComponents.loadJSFile(prefix + 'js/jquery-easing/jquery.easing.min.js', function() {
            count++;
            if (count === noOfFiles) _this.isReady();
          });
          _this.webComponents.loadJSFile(prefix + 'js/sb-admin/sb-admin-2.min.js', function() {
            count++;
            if (count === noOfFiles) _this.isReady();
          });
          _this.webComponents.loadJSFile(prefix + 'js/toastr/toastr.min.js', function() {
            count++;
            if (count === noOfFiles) _this.isReady();
          });
        });
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.sidebarTarget = this.rootElement.querySelector('#accordionSidebar');
      this.topbarTarget = this.rootElement.querySelector('#bs-admin-topbar');
      this.contentTarget = this.rootElement.querySelector('#pageContent');
      this.footerTarget = this.rootElement.querySelector('#footerContent');
      this.contentPages = {};
      this.name = 'root'

    }

    disconnectedCallback() {
    }
  }

  customElements.define(componentName, adminui_root);

}
