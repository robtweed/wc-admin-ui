export function load() {

let counter = -1;
let componentName = 'component-topbar-toggler';
let id_prefix = componentName + '-';

class component_topbar_toggler extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<!-- Sidebar Toggle (Topbar) -->
<button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
  <i class="fa fa-bars"></i>
</button>
<!-- End of Sidebar Toggle (Topbar) -->
    `;

    this.html = `${html}`;

  }

  setState(params, callback) {
    if (callback) callback();
  }

  connectedCallback() {

    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('button')[0];
    this.toggleBtn = this.rootElement;

    this.toggle = function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      }
    };

    this.toggleBtn.addEventListener('click', this.toggle);
  }

  disconnectedCallback() {
    console.log('*** toggler was removed!');
    this.toggleBtn.removeEventListener('click', this.toggle);
  }
}

window.customElements.define(componentName, component_topbar_toggler);

}

