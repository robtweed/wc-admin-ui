export function load() {

let counter = -1;
let id_prefix = 'wc-sidebar-brand-';

class component_sidebar_brand extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
  <!-- Sidebar - Brand -->
  <a id="${id}" class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
    <div class="sidebar-brand-icon">
      <i class="fas fa-exclamation-circle"></i>
    </div>
    <div class="sidebar-brand-text mx-3">Undefined Brand</div>
  </a>
  <!-- End of Sidebar - Brand -->
    `;

    this.html = `${html}`;
  }

  setState(params, callback) {
    let a = this.rootElement;
    let childDivs =  a.getElementsByTagName('div');
    let idiv = childDivs[0];
    let i = idiv.getElementsByTagName('i')[0];
    let titlediv = childDivs[1];
    if (params.title) titlediv.textContent = params.title;
    if (params.icon) {
      let oldClass = i.classList.item(1);
      i.classList.remove(oldClass);
      i.classList.add('fa-' + params.icon);
    }
    if (params.icon_style) {
      let oldStyle = idiv.classList.item(1);
      if (oldStyle) idiv.classList.remove(oldStyle);
      idiv.classList.add(params.icon_style);
    }
    if (params.remove_icon_style) {
      let style = idiv.classList.item(1);
      if (style) idiv.classList.remove(style);
    }
    if (params.contentPage) {
      this.pageSelect = function() {
        console.log('switch to page ' + params.contentPage);
        var root = document.getElementsByTagName('component-root')[0];
        root.switchToPage(params.contentPage);
      };
      this.rootElement.addEventListener('click', this.pageSelect);
    }
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('a')[0];
    this.style = 'display: inline';
    //console.log(this.rootElement);
  }

  disconnectedCallback() {
    console.log('brand removed!');
    if (this.pageSelect) this.rootElement.addEventListener('click', this.pageSelect);
  }
}

  customElements.define('component-sidebar-brand', component_sidebar_brand);
}


