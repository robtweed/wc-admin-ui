export function load() {

let counter = -1;
let componentName = 'component-topbar-navbar-menu';
let id_prefix = componentName + '-';

class component_topbar_navbar_menu extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;
    let deviceId = 'navbar-menu-' + counter;

    const html = `
<li class="nav-item dropdown no-arrow">
  <a class="nav-link dropdown-toggle" href="#" id="${deviceId}" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="mr-2 d-none d-lg-inline text-gray-900 font-weight-bold">Undefined Title</span>
    <!-- optional image here in future? -->
  </a>
  <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="${deviceId}">
    <!-- menu items go here -->
  </div>
</li>
    `;

    this.html = `${html}`;

  }

  setState(state, callback) {
    if (state.webComponents) {
      this.webComponents = state.webComponents;
    }
    if (state.options) {
      this.options = state.options;
    }
    if (state.title) {
      let span = this.rootElement.querySelector('span');
      span.textContent = state.title;
    }
    if (state.ref) {
      this.ref = state.ref;
    }
    if (state.getMenuItems) {
      this.getMenuItems = state.getMenuItems.bind(this);
    }
    if (this.getMenuItems) this.getMenuItems();
    if (callback) callback();
  }

  connectedCallback() {

    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('li')[0];
    this.itemsTarget = this.rootElement.querySelector('div');
    this.a_tag = this.rootElement.querySelector('a');

    let _this = this;

    this.handleItemsUpdate = function(responseObj) {
      console.log(responseObj);
      console.log('received ref: ' + responseObj.ref);
      console.log('this.ref = ' + _this.ref);
      if (responseObj.ref !== _this.ref) {
        // ignore these messages from the back end - they are for another instance of this component
        return;
      }
      // now dynamically load dropdown item components using the array of returned items
      // first remove any that currently exist
      let items = [..._this.rootElement.getElementsByTagName('component-topbar-navbar-menu-item')];
      items.forEach(function(item) {
        item.parentNode.removeChild(item);
      });
      items = responseObj.items;
      items.forEach(function(item, ix) {
        if (items[ix].state) {
          items[ix].state.ref = _this.ref;
        }
      });
      _this.webComponents.loadGroup(items, _this.itemsTarget, _this.options);
    };

    //EWD.on('getMenuItems', this.handleItemsUpdate);

    /*
    this.getMenuItems = function() {
      EWD.send({
        type: 'getMenuItems',
        ref: _this.ref
      });
    }
    */
  }

  disconnectedCallback() {
    console.log('*** menu component was removed!');
    EWD.off('getMenuItems', this.handleItemsUpdate);
  }
}

window.customElements.define(componentName, component_topbar_navbar_menu);

}

