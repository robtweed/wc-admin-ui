export function load() {

let counter = -1;
let componentName = 'component-topbar-navbar-dropdown';
let id_prefix = componentName + '-';

class component_topbar_navbar_dropdown extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;
    let deviceId = 'navbar-dropdown-' + counter;

    const html = `
<!-- Nav Item - Dropdown -->
<li class="nav-item dropdown no-arrow mx-1">
  <a class="nav-link dropdown-toggle" href="#" id="${deviceId}" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="fas fa-bell fa-fw"></i>
    <!-- Counter - No of Dropdown Items -->
    <span class="badge badge-danger badge-counter">0</span>
  </a>
  <!-- Dropdown - Items -->
  <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="${deviceId}">
    <h6 class="dropdown-header">Alerts</h6>

    <!-- items go here -->

  </div>
</li>
<!-- End Nav Item - Dropdown -->
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
    if (state.icon) {
      let i = this.rootElement.querySelector('i');
      let oldIcon = i.classList.item(1);
      i.classList.remove(oldIcon);
      i.classList.add('fa-' + state.icon);
    }
    if (state.title) {
      let h6 = this.rootElement.querySelector('h6');
      h6.textContent = state.title;
    }
    if (state.ref) {
      this.ref = state.ref;
    }
    this.getDropdownItems();
    if (callback) callback();
  }

  connectedCallback() {

    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('li')[0];
    this.itemsTarget = this.rootElement.querySelector('div');
    this.a_tag = this.rootElement.querySelector('a');
    this.counter = this.rootElement.querySelector('span');
    this.ewd_message_type = 'demo'

    let _this = this;

    this.handleItemsUpdate = function(responseObj) {
      console.log(responseObj);
      console.log('received ref: ' + responseObj.ref);
      console.log('this.ref = ' + _this.ref);
      if (responseObj.message.ref !== _this.ref) {
        // ignore these messages from the back end - they are for another instance of this component
        return;
      }
      // now dynamically load dropdown item components using the array of returned items
      // first remove any that currently exist
      let items = [..._this.rootElement.getElementsByTagName('component-topbar-navbar-dropdown-item')];
      items.forEach(function(item) {
        item.parentNode.removeChild(item);
      });
      items = responseObj.message.items;
      _this.counter.textContent = items.length;
      items.forEach(function(item, ix) {
        items[ix].state.ref = _this.ref;
      });
      _this.webComponents.loadGroup(items, _this.itemsTarget, _this.options);
    };

    //EWD.on('getDropdownItems', this.handleItemsUpdate);

    this.getDropdownItems = function() {
      /*
      EWD.send({
        type: 'getDropdownItems',
        ref: _this.ref
      });
      */
    }
  }

  disconnectedCallback() {
    console.log('*** alerts component was removed!');
    EWD.off('getDropdownItems', this.handleItemsUpdate);
  }
}

window.customElements.define(componentName, component_topbar_navbar_dropdown);

}

