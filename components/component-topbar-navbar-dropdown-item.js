export function load() {

let counter = -1;
let componentName = 'component-topbar-navbar-dropdown-item';
let id_prefix = componentName + '-';

class component_topbar_navbar_dropdown_item extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<a class="dropdown-item d-flex align-items-center" href="#">
  <div class="mr-3">
    <div class="icon-circle bg-primary">
      <i class="fas fa-exclamation-circle text-white"></i>
    </div>
  </div>
  <div>
    <div class="small text-gray-500">Undefined Heading</div>
    <span class="font-weight-bold">Undefined Text</span>
  </div>
</a>
    `;

    this.html = `${html}`;

  }

  setState(params, callback) {
    if (params.heading) {
      let headingDiv = this.rootElement.getElementsByClassName('small text-gray-500')[0];
      headingDiv.textContent =  params.heading;
    }
    if (params.text) {
      let span = this.rootElement.querySelector('span');
      span.textContent =  params.text;
    }
    if (params.icon) {
      let i = this.rootElement.querySelector('i');
      let oldIcon = i.classList.item(1);
      i.classList.remove(oldIcon);
      i.classList.add('fa-' + params.icon);
    }
    if (params.colour) {
      let div = this.rootElement.getElementsByClassName('mr-3')[0];
      let colourDiv = div.querySelector('div');
      let oldColour = colourDiv.classList.item(1);
      colourDiv.classList.remove(oldColour);
      colourDiv.classList.add('bg-' + params.colour);
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
    this.getDropdownItemDetail = function() {
      EWD.send({
        type: 'getDropdownItemDetail',
        ref: _this.ref,
        itemId: _this.itemId
      }, function(responseObj) {
        console.log(responseObj);
      });
    };
    this.aTag.addEventListener('click', this.getDropdownItemDetail);
  }

  disconnectedCallback() {
    console.log('*** dropdown item component was removed!');
    this.aTag.removeEventListener('click', this.getDropdownItemDetail);
  }
}

window.customElements.define(componentName, component_topbar_navbar_dropdown_item);

}

