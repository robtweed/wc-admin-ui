export function load() {

let counter = -1;
let componentName = 'component-topbar-navbar-menu-item';
let id_prefix = componentName + '-';

class component_topbar_navbar_menu_item extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<a class="dropdown-item" href="#">
  <i class="fas fa-exclamation-circle fa-sm fa-fw mr-2 text-gray-600"></i>
  <span>Undefined Option Text</span>
</a>
    `;

    this.html = `${html}`;

  }

  setState(params, callback) {
    if (params.title) {
      let span = this.rootElement.querySelector('span');
      span.textContent =  params.title;
    }
    if (params.use_modal) {
      this.rootElement.setAttribute('data-toggle', 'modal');
      this.rootElement.setAttribute('data-target', '#' + params.use_modal);
      this.aTag.removeEventListener('click', this.getMenuItemDetail);
    }
    if (params.icon) {
      let i = this.aTag.querySelector('i');
      let oldIcon = i.classList.item(1);
      i.classList.remove(oldIcon);
      i.classList.add('fa-' + params.icon);
    }
    if (params.ref) this.ref = params.ref;
    if (params.itemId) this.itemId = params.itemId;
    if (callback) callback();
  }

  connectedCallback() {

    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('a')[0];
    this.aTag = this.rootElement;
    this.ref = false;

    let _this = this;
    this.getMenuItemDetail = function() {
      /*
      EWD.send({
        type: 'getMenuItemDetail',
        ref: _this.ref,
        itemId: _this.itemId
      }, function(responseObj) {
        console.log(responseObj);
      });
      */
    };
    this.aTag.addEventListener('click', this.getMenuItemDetail);
  }

  disconnectedCallback() {
    console.log('*** dropdown item component was removed!');
    this.aTag.removeEventListener('click', this.getMenuItemDetail);
  }
}

window.customElements.define(componentName, component_topbar_navbar_menu_item);

}

