export function load() {

let counter = -1;
let componentName = 'component-sidebar-toggler';
let id_prefix = componentName + '-';

class component_sidebar_toggler extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<!-- Sidebar Toggler (Sidebar) -->
<div class="text-center d-none d-md-inline">
  <button class="rounded-circle border-0" id="sidebarToggle"></button>
</div>
<!-- End of Sidebar Toggler (Sidebar) -->
    `;

    this.html = `${html}`;

  }

  setState(params, callback) {
    if (callback) callback();
  }

  connectedCallback() {

    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('div')[0];
    this.toggleBtn = this.rootElement.getElementsByTagName('button')[0];
    this.className = 'text-center';

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

window.customElements.define(componentName, component_sidebar_toggler);

}

