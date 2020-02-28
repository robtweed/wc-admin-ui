export function load() {

let componentName = 'component-root';

class component_root extends HTMLElement {
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
      if (child.tagName === 'COMPONENT-CONTENT-PAGE' && child.name === pageName) {
        return child;
      }
    }
  }

  setPageActive(pageName) {
    // set selected page to active
    console.log('root setting page ' + pageName + ' active');
    let page = this.getContentPage(pageName);
    page.setState({show: true});
  }

  switchToPage(pageName) {
    let config = this.webComponents.getFromRegistry(pageName);
    if (config) {
      if (!this.contentPages[pageName]) {
        this.webComponents.loadGroup(config, this.contentTarget, {path: this.path});
        this.contentPages[pageName] = true;
        // setPageActive will get triggered when page config is loaded
      }
      else {
        // already attached
        this.setPageActive(pageName);
      }
    }
  }

  setState(state, callback) {
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

      this.webComponents.loadCSSFile('css/fontawesome-free/all.min.css');
      this.webComponents.loadCSSFile('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
      this.webComponents.loadCSSFile('css/sb-admin/sb-admin-2.min.css');
      let _this = this;
      this.webComponents.loadJSFile('js/jquery/jquery.min.js', function() {
        _this.webComponents.loadJSFile('js/bootstrap/bootstrap.bundle.min.js');
        _this.webComponents.loadJSFile('js/jquery-easing/jquery.easing.min.js');
        _this.webComponents.loadJSFile('js/sb-admin/sb-admin-2.min.js');

        if (callback) callback(this);
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

  }

  disconnectedCallback() {
  }
}

window.customElements.define(componentName, component_root);

}
