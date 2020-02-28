export function load() {

let counter = -1;
let componentName = 'component-sidebar-nav-item';
let id_prefix = componentName + '-';

class component_sidebar_nav_item extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<!-- Nav Item -->
<li id="${id}" class="nav-item">
  <a class="nav-link" href="#">
    <i class="fas fa-fw fa-exclamation-circle"></i>
    <span>Undefined Title</span>
  </a>
</li>
<!-- End of Nav Item -->
    `;

    this.html = `${html}`;

  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('li')[0];
    this.style = 'height: 56px';
    let li = this.rootElement;
    let a = li.getElementsByTagName('a')[0];
    this.toggleActive = function() {
      var activeLink = document.getElementsByClassName('nav-item active')[0];
      if (activeLink) activeLink.classList.remove('active');
      if (!li.classList.contains('active')) {
        li.classList.add('active');
      }
    }
    a.addEventListener('click', this.toggleActive);
  }

  setState(state, callback) {
    let li = this.rootElement;
    let a = li.getElementsByTagName('a')[0];
    let i = a.getElementsByTagName('i')[0];
    let span = a.getElementsByTagName('span')[0];

    if (state.title) span.textContent = state.title;
    if (state.icon) {
      let oldIcon = i.classList.item(2);
      i.classList.remove(oldIcon);
      i.classList.add('fa-' + state.icon);
    }
    if (state.active) {
      if (!li.classList.contains('active')) {
        li.classList.add('active');
      }
    }
    else {
      if (li.classList.contains('active')) {
        li.classList.remove('active');
      }
    }
    if (state.contentPage) {
      this.pageSelect = function() {
        console.log('switch to page ' + state.contentPage);
        var root = document.getElementsByTagName('component-root')[0];
        root.switchToPage(state.contentPage);
      };
      this.rootElement.addEventListener('click', this.pageSelect);
    }
    if (callback) callback();
  }

  disconnectedCallback() {
    console.log('*** nav item single was removed!');
    a.removeEventListener('click', this.toggleActive);
    if (this.pageSelect) this.rootElement.addEventListener('click', this.pageSelect);
  }
}

window.customElements.define(componentName, component_sidebar_nav_item);

}

