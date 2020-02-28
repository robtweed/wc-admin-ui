export function load() {

let counter = -1;
let componentName = 'component-sidebar-nav-menu-popup-option';
let id_prefix = componentName + '-';

class component_sidebar_nav_menu_popup_option extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<a class="collapse-item" href="#">Undefined Option</a>
    `;

    this.html = `${html}`;

  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('a')[0];
  }

  getParentMenuComponent() {
    function findParent(node) {
      node = node.parentNode;
      if (node.tagName === 'COMPONENT-SIDEBAR-NAV-COLLAPSE-MENU') return node;
      return findParent(node);
    }
    return findParent(this);
  }

  setState(state, callback) {
    var rootElement = this.rootElement;
    if (state.text) rootElement.textContent = state.text;
    if (state.contentPage) {
      let _this = this;
      this.pageSelect = function() {
        console.log('switch to page ' + state.contentPage);
        var root = document.getElementsByTagName('component-root')[0];
        root.switchToPage(state.contentPage);
        var menu = _this.getParentMenuComponent();
        menu.setState({show: false});
      };
      this.rootElement.addEventListener('click', this.pageSelect);
    }
    if (callback) callback();
  }

  disconnectedCallback() {
    console.log('*** nav-collapse-menu-popup-option was removed!');
    if (this.pageSelect) this.rootElement.addEventListener('click', this.pageSelect);
  }
}

window.customElements.define(componentName, component_sidebar_nav_menu_popup_option);

}
