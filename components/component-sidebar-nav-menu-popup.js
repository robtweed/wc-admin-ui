export function load() {

let counter = -1;
let componentName = 'component-sidebar-nav-menu-popup';
let id_prefix = componentName + '-';

class component_sidebar_nav_menu_popup extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<h6 class="collapse-header">Undefined Menu:</h6>
    `;

    this.html = `${html}`;

  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('h6')[0];
    //this.style = 'height: 56px';

  }

  setState(state, callback) {
    if (state.webComponents) {
      this.webComponents = state.webComponents;
    }
    if (state.options) {
      this.options = state.options;
    }
    var rootElement = this.rootElement;
    if (state.title) rootElement.textContent = state.title;
    if (state.children) {
      var configArr = state.children;
      this.webComponents.loadGroup(configArr, rootElement.parentNode, this.options);
    }
    if (callback) callback();
  }

  disconnectedCallback() {
    console.log('*** nav-collapse-menu-popup was removed!');
    // remove all the menu handlers
    //this.menuEventHandlers.forEach(function(obj) {;
      //obj.element.removeEventListener('click', obj.fn);
    //});

  }
}

window.customElements.define(componentName, component_sidebar_nav_menu_popup);

}
