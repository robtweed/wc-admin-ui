export function load() {

let counter = -1;
let componentName = 'component-topbar-search';
let id_prefix = componentName + '-';

class component_topbar_search extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<!-- Topbar Search -->
<form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
  <div class="input-group">
    <input id="bs-admin-search-field" type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
    <div class="input-group-append">
      <button id="bs-admin-searchBtn" class="btn btn-primary" type="button">
        <i class="fas fa-search fa-sm"></i>
      </button>
    </div>
  </div>
</form>
<!-- End Topbar Search -->
    `;

    this.html = `${html}`;

  }

  setState(params, callback) {
    if (params.placeholder) {
      this.searchField.setAttribute('placeholder', params.placeholder);
    }
    if (callback) callback();
  }

  connectedCallback() {

    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('form')[0];
    this.searchBtn = this.rootElement.querySelector('#bs-admin-searchBtn');
    this.searchField = this.rootElement.querySelector('#bs-admin-search-field');

    let _this = this;
    this.search = function() {
      EWD.send({
        type: 'bs-admin-search',
        value: _this.searchField.value
      }, function(responseObj) {
        console.log(responseObj);
      });
    };
    this.searchBtn.addEventListener('click', this.search);
  }

  disconnectedCallback() {
    console.log('*** search component was removed!');
    this.searchBtn.removeEventListener('click', this.search);
  }
}

window.customElements.define(componentName, component_topbar_search);

}

