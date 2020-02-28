export function load() {

let counter = -1;
let componentName = 'component-sidebar-nav-collapse-menu';
let id_prefix = componentName + '-';

class component_sidebar_nav_collapse_menu extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<!-- Nav Item - Pages Collapse Menu -->
<li id="${id}" class="nav-item">
  <a class="nav-link collapsed" href="#" data-toggle="collapse" aria-expanded="true">
    <i class="fas fa-fw fa-exclamation-circle"></i>
    <span>Undefined Heading</span>
  </a>
  <div class="collapse" data-parent="#accordionSidebar">
    <div class="bg-white py-2 collapse-inner rounded"></div>
  </div>
</li>
<!-- End of Nav Item - Pages Collapse Menu -->
    `;

    this.html = `${html}`;
    this.collapseId = 'nav-collapse-' + counter;

  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('li')[0];
    this.style = 'height: 56px';
    let a = this.rootElement.getElementsByTagName('a')[0];
    let collapseDiv = this.rootElement.getElementsByTagName('div')[0];
    collapseDiv.id = this.collapseId;
    this.collapseDiv = collapseDiv;
    a.setAttribute('data-target', '#' + this.collapseId);
    a.setAttribute('aria-controls', this.collapseId);
    this.childWrapper = collapseDiv.getElementsByTagName('div')[0];
    this.toggleActive = function() {
      var activeLink = document.getElementsByClassName('nav-item active')[0];
      if (activeLink) activeLink.classList.remove('active');
    }
    a.addEventListener('click', this.toggleActive);
  }

  setState(state, callback) {
    if (state.webComponents) {
      this.webComponents = state.webComponents;
    }
    if (state.options) {
      this.options = state.options;
    }
    if (state.heading) {
      this.rootElement.getElementsByTagName('span')[0].textContent = state.heading;
    }
    if (state.icon) {
      let i = this.rootElement.getElementsByTagName('i')[0];
      var oldIcon = i.classList.item(2);
      i.classList.remove(oldIcon);
      i.classList.add('fa-' + state.icon);
    }
    if (state.children) {
      var configArr = state.children;
      this.webComponents.loadGroup(configArr, this.childWrapper, this.options);
    }
    if (typeof state.show !== 'undefined') {
      if (state.show) {
        if (!this.collapseDiv.classList.contains('show')) {
          this.collapseDiv.classList.add('show');
        }
      }
      else {
        this.collapseDiv.classList.remove('show');
      }
    }
    if (callback) callback();
  }

  disconnectedCallback() {
    console.log('*** nav-collapse-menu was removed!');
    a.removeEventListener('click', this.toggleActive);

    // remove all the menu handlers
    this.menuEventHandlers.forEach(function(obj) {;
      obj.element.removeEventListener('click', obj.fn);
    });

  }
}

window.customElements.define(componentName, component_sidebar_nav_collapse_menu);

}
